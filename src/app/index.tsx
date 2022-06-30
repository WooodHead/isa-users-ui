import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Auth, Hub, Amplify } from 'aws-amplify';
import { CircularProgress } from '@mui/material';

import configJson from 'config.json';
import { useTranslation } from 'react-i18next';
import { MainLayout } from 'app/components/MainLayout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appActions, useAppSlice } from 'app/slices/app';
import {
  selectAuthState,
  selectSnackbarNotification,
} from 'app/slices/app/selectors';
import { AuthState } from 'app/slices/app/types';
import { SignIn } from 'app/components/SignIn';
import { useUserSlice } from 'app/slices/user';
import { userApi } from 'app/slices/user/api';
import NotificationSnackbar from 'app/components/NotificationSnackbar';

import { ProfilePage } from './pages/Profile/Loadable';
import { ClubsPage } from './pages/Clubs/Loadable';

export function App() {
  useAppSlice();
  useUserSlice();

  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const authState = useSelector(selectAuthState);
  const snackbarNotification = useSelector(selectSnackbarNotification);

  const { data, isLoading } = userApi.useGetUserDetailsQuery(undefined, {
    skip: authState !== AuthState.SignedIn,
  });

  useEffect(() => {
    Amplify.configure(configJson.AWS.Amplify);
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
      .then(async () => {
        dispatch(appActions.updateAuthState(AuthState.SignedIn));
      })
      .catch(() => dispatch(appActions.updateAuthState(AuthState.SignedOut)));
  }, [dispatch]);

  useEffect(() => {
    if (authState === AuthState.SignedOut) {
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

  if (authState === AuthState.Loading || isLoading) {
    return (
      <CircularProgress
        size="4rem"
        style={{ position: 'fixed', top: '45%', left: '45%' }}
      />
    );
  }
  if (authState !== AuthState.SignedIn) {
    return <SignIn signInClicked={signInClicked} />;
  }
  return (
    <BrowserRouter>
      <Helmet htmlAttributes={{ lang: i18n.language }}>
        <meta name="description" content="ISA Users" />
      </Helmet>
      <MainLayout>
        <Switch>
          <Route path="/clubs" component={ClubsPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="*">
            <Redirect to="/profile" />
          </Route>
        </Switch>
      </MainLayout>
      <NotificationSnackbar
        snackbarNotification={snackbarNotification}
        onClose={onSnackbarClose}
      />
    </BrowserRouter>
  );
}
