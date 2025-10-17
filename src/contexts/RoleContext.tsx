'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'client' | 'psychologist' | 'admin' | 'manager' | null;

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  isHydrated: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRoleState] = useState<Role>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {

    const saved = localStorage.getItem('role');
    if (saved === 'client' || saved === 'psychologist' || saved === 'admin' || saved === 'manager') {
      setRoleState(saved);
    } else {
      setRoleState(null);
    }
    setIsHydrated(true);
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (newRole) localStorage.setItem('role', newRole);
    else localStorage.removeItem('role');
  };

  return (
    <RoleContext.Provider value={{ role, setRole, isHydrated }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = (): RoleContextType => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within a RoleProvider');
  return ctx;
};
