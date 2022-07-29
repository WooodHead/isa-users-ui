export interface AppState {
  authState?: AuthState;
  snackbarNotification: SnackbarNotification;
  userIdentityType?: IdentityType;
  isaId?: string;
}
export type SnackbarNotification = {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
} | null;

export const enum AuthState {
  Loading = 'loading',
  SigningOut = 'signingOut',
  SignedOut = 'signedOut',
  SigningIn = 'signingIn',
  SignedIn = 'signedIn',
}
