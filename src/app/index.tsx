import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Auth, Hub, Amplify } from 'aws-amplify';
import { CircularProgress } from '@mui/material';

import configJson from 'config.json';
import { HomePage } from './pages/HomePage/Loadable';
import { useTranslation } from 'react-i18next';
import { MainLayout } from 'app/components/MainLayout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appActions, useAppSlice } from 'app/slices/app';
import { selectAuthState } from 'app/slices/app/selectors';
import { AuthState } from 'app/slices/app/types';
import { SignIn } from 'app/components/SignIn';

export function App() {
  useAppSlice();

  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const authState = useSelector(selectAuthState);

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

  if (authState === AuthState.Loading) {
    return (
      <CircularProgress
        size="4rem"
        style={{ position: 'fixed', top: '50%', left: '50%' }}
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
      <Switch>
        <>
          <MainLayout>
            <Route component={HomePage} />
          </MainLayout>
        </>
      </Switch>
    </BrowserRouter>
  );
}
