'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api from '@/utils/api';
import { PsychologistResponse } from '@/types/PsychologistResponse';

type PsyContextType = {
  psyInfo: PsychologistResponse | null | undefined;
  loading: boolean;
};

const PsyContext = createContext<PsyContextType>({
  psyInfo: undefined,
  loading: true,
});

export function PsyProvider({ children }: { children: ReactNode }) {
  const [psyInfo, setPsyInfo] = useState<PsychologistResponse | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPsyInfo = async () => {
      try {
        const response = await api.get("/v1/users/clients/psychologist/current");
        if (response.status === 204) {
          setPsyInfo(null);
        } else {
          setPsyInfo(response.data);
        }
      } catch (err) {
        console.error("Ошибка при загрузке психолога:", err);
        setPsyInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPsyInfo();
  }, []);

  return (
    <PsyContext.Provider value={{ psyInfo, loading }}>
      {children}
    </PsyContext.Provider>
  );
}

export const usePsy = () => useContext(PsyContext);
