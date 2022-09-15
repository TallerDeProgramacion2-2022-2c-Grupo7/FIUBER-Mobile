import { store } from '../redux';

export interface AuthState {
  logedIn: boolean;
  user: any;
  error?: string;
}

export interface ReduxState {
  auth: AuthState;
}

export interface AuthLoginParams {
  email: string;
  password: string;
  onError: (error: string) => void;
}

export type AppDispatch = typeof store.dispatch;
