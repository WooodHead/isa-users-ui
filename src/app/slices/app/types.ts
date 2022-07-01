export interface AppState {
  authState?: AuthState;
  snackbarNotification: SnackbarNotification;
  userIdentityType?: 'individual' | 'club';
}
export type SnackbarNotification = {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
} | null;

export const enum AuthState {
  Loading = 'loading',
  SignedOut = 'signedOut',
  SigningIn = 'signingIn',
  SignedIn = 'signedIn',
}
