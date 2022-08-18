import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/types';
import { initialState } from '.';

const selectSlice = (state?: RootState) => state?.app ?? initialState;
const selectUserSlice = (state?: RootState) => state?.user;
const selectOrganizationSlice = (state?: RootState) => state?.organization;

export const selectAuthState = createSelector(
  [selectSlice],
  state => state.authState,
);

export const selectSnackbarNotification = createSelector(
  [selectSlice],
  state => state.snackbarNotification,
);

export const selectCurrentUserInfo = createSelector(
  [selectSlice, selectUserSlice, selectOrganizationSlice],
  (appState, userState, organizationState) => {
    const info = { identityType: appState.userIdentityType };
    if (appState.userIdentityType === 'individual') {
      return {
        ...info,
        ...userState?.userInfo,
        isaId: userState?.userInfo?.userId,
      };
    }
    if (appState.userIdentityType === 'organization') {
      return {
        ...info,
        ...organizationState?.organizationInfo,
        isaId: userState?.userInfo?.userId,
      };
    }
  },
);
