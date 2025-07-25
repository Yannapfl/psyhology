export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}


export interface User {
  email: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (data: SignInRequest) => Promise<void>;
  signOut: () => void;
}
