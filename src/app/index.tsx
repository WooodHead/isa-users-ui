import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Auth, Hub, Amplify } from 'aws-amplify';
import { CircularProgress } from '@mui/material';

import configJson from 'config.json';
import configLocalJson from 'config_local.json';

import { useTranslation } from 'react-i18next';
import { MainLayout } from 'app/components/MainLayout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appActions, useAppSlice } from 'app/slices/app';
import {
  selectAuthState,
  selectCurrentUserInfo,
  selectSnackbarNotification,
} from 'app/slices/app/selectors';
import { AuthState } from 'app/slices/app/types';
import { SignIn } from 'app/pages/SignIn';
import { useUserSlice } from 'app/slices/user';
import NotificationSnackbar from 'app/components/NotificationSnackbar';
import GlobalStyles from '@mui/material/GlobalStyles';

import { UserProfilePage } from './pages/User/Profile/Loadable';
import { UserClubsPage } from './pages/User/UserClubs/Loadable';
import { ClubProfilePage } from 'app/pages/Club/Profile/Loadable';
import { ClubMembersPage } from 'app/pages/Club/Members/Loadable';

import { userApi } from 'app/api/user-api';
import { showErrorNotification } from 'utils';
import { clubApi } from 'app/api/club-api';
import { useClubSlice } from 'app/slices/club';

export function App() {
  useAppSlice();
  useUserSlice();
  useClubSlice();

  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const authState = useSelector(selectAuthState);
  const currentUserInfo = useSelector(selectCurrentUserInfo);
  const snackbarNotification = useSelector(selectSnackbarNotification);

  const isIndividual = currentUserInfo?.identityType === 'individual';
  const isClub = currentUserInfo?.identityType === 'club';

  userApi.useGetUserDetailsQuery(undefined, { skip: !isIndividual });
  clubApi.useGetClubDetailsQuery(undefined, { skip: !isClub });

  useEffect(() => {
    const amplifyConfig =
      process.env.NODE_ENV === 'development'
        ? configLocalJson.AWS.Amplify
        : configJson.AWS.Amplify;

    Amplify.configure(amplifyConfig);
    Hub.listen('auth', async ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          dispatch(appActions.updateAuthState(AuthState.SignedIn));
          break;
        case 'signOut':
          dispatch(appActions.updateAuthState(AuthState.SignedOut));
          break;

        default:
          break;
      }
    });
    Auth.currentAuthenticatedUser()
      .then(async data => {
        dispatch(appActions.updateAuthState(AuthState.SignedIn));
      })
      .catch(() => dispatch(appActions.updateAuthState(AuthState.SignedOut)));
  }, [dispatch]);

  useEffect(() => {
    if (authState === AuthState.SignedIn) {
      Auth.currentUserInfo()
        .then(data => {
          const identityType = data.attributes['custom:identityType'];
          if (!identityType) {
            dispatch(
              showErrorNotification(
                'Something went wrong with your account. Please contact to ISA ',
              ),
            );
          } else {
            dispatch(appActions.updateIdentityType(identityType));
          }
        })
        .catch(err =>
          dispatch(appActions.updateAuthState(AuthState.SignedOut)),
        );
    } else if (authState === AuthState.SigningOut) {
      Auth.signOut();
    }
  }, [authState]);

  const signInClicked = () => {
    dispatch(appActions.updateAuthState(AuthState.SigningIn));
    Auth.federatedSignIn();
  };

  const onSnackbarClose = () => {
    dispatch(appActions.updateSnackbarNotification(null));
  };

  const MainApp = () => {
    return (
      <BrowserRouter>
        <Switch>
          {isIndividual && (
            <Route path="/user/profile" component={UserProfilePage} />
          )}
          {isIndividual && (
            <Route path="/user/clubs" component={UserClubsPage} />
          )}

          {isClub && <Route path="/club/profile" component={ClubProfilePage} />}

          {isClub && <Route path="/club/members" component={ClubMembersPage} />}
          <Route path="*">
            {isIndividual ? (
              <Redirect to="/user/profile" />
            ) : (
              <Redirect to="/club/profile" />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  };

  const isLoading =
    authState === AuthState.Loading ||
    authState === AuthState.SigningIn ||
    authState === AuthState.SigningOut ||
    (authState === AuthState.SignedIn && !currentUserInfo?.email);

  return (
    <BrowserRouter>
      <Helmet htmlAttributes={{ lang: i18n.language }}>
        <meta name="description" content="ISA Users" />
      </Helmet>
      <GlobalStyles styles={{ body: { fontFamily: 'Inter' } }} />
      <MainLayout>
        {isLoading ? (
          <CircularProgress
            size="4rem"
            style={{ position: 'fixed', top: '45%', left: '45%' }}
          />
        ) : authState !== AuthState.SignedIn ? (
          <SignIn signInClicked={signInClicked} />
        ) : (
          <MainApp />
        )}
      </MainLayout>
      <NotificationSnackbar
        snackbarNotification={snackbarNotification}
        onClose={onSnackbarClose}
      />
    </BrowserRouter>
  );
}
