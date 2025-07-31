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


export interface User {
  email: string;
  role: string;
  cohort_id: number;
}

export type Role = 'client' | 'psychologist' | 'admin' | 'manager' ;


export interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (data: SignInRequest) => Promise<void>;
  signOut: () => void;
}
