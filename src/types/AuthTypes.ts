export interface SignInRequest {
  email: string;
  password: string;
  role: string,
}

export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export type Role = 'client' | 'psychologist' | 'admin' | 'manager' ;

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone2call: string;
  phone2whatsapp: string;
  name4telegram: string;
  city: string;
  role: Role;
  cohort_id: number;
}


export interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (data: SignInRequest) => Promise<void>;
  signOut: () => void;
}
