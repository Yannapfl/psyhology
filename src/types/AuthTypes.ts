export interface SignInRequest {
  email: string;
  password: string;
  role_id: number;
}

export interface SignInResponse {
  access_token: string;
  refresh_token: string;
}


export interface User {
  email: string;
  role_id: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (data: SignInRequest) => Promise<void>;
  signOut: () => void;
}
