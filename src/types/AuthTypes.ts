export type RoleValue = 'client' | 'psychologist' | 'admin' | 'manager';

export type Role = RoleValue | null;

export interface SignInRequest {
  email: string;
  password: string;
  role?: RoleValue;
  remember?: boolean;
}

export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  user?: User;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;

  phone2call: string | null;
  phone2whatsapp: string | null;
  name4telegram: string | null;
  city: string | null;

  role: RoleValue;
  cohort_id: number | null;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isHydrated: boolean;
  signIn: (data: SignInRequest) => Promise<{ user: User; role: RoleValue }>;
  signOut: () => void;
}
