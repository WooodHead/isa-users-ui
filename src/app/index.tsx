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
import { UserOrganizationsPage } from './pages/User/UserOrganizations/Loadable';
import { OrganizationProfilePage } from 'app/pages/Organization/Profile/Loadable';
import { OrganizationMembersPage } from 'app/pages/Organization/Members/Loadable';

import { userApi } from 'app/api/user-api';
import { showErrorNotification } from 'utils';
import { organizationApi } from 'app/api/organization-api';
import { useOrganizationSlice } from 'app/slices/organization';
import { UserCertificates } from 'app/pages/User/UserCertificates/Loadable';
import { OrganizationCertificates } from 'app/pages/Organization/OrganizationCertificates/Loadable';

export function App() {
  useAppSlice();
  useUserSlice();
  useOrganizationSlice();

  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const authState = useSelector(selectAuthState);
  const currentUserInfo = useSelector(selectCurrentUserInfo);
  const snackbarNotification = useSelector(selectSnackbarNotification);

  const isIndividual = currentUserInfo?.identityType === 'individual';
  const isOrganization = currentUserInfo?.identityType === 'organization';

  userApi.useGetUserDetailsQuery(undefined, { skip: !isIndividual });
  organizationApi.useGetOrganizationDetailsQuery(undefined, {
    skip: !isOrganization,
  });

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
      .catch(() => dispatch(appActions.updateAuthState(AuthState.SigningOut)));
  }, [dispatch]);

  useEffect(() => {
    if (authState === AuthState.SignedIn) {
      Auth.currentUserInfo()
        .then(data => {
          const identityType: IdentityType =
            data.attributes['custom:identityType'] || 'individual';
          dispatch(appActions.updateIdentityType(identityType));
          dispatch(appActions.updateCognitoAttributes(data.attributes));
        })
        .catch(err => {
          dispatch(appActions.updateAuthState(AuthState.SigningOut));
        });
    } else if (authState === AuthState.SigningOut) {
      Auth.signOut();
    }
  }, [authState]);

  const extractCurrentPathAndSearch = () => {
    if (
      window.location.pathname &&
      window.location.pathname !== '' &&
      window.location.pathname !== '/'
    ) {
      return window.location.pathname + window.location.search;
    }
    return undefined;
  };

  const signInClicked = () => {
    dispatch(appActions.updateAuthState(AuthState.SigningIn));
    Auth.federatedSignIn();
  };

  const onSnackbarClose = () => {
    dispatch(appActions.updateSnackbarNotification(null));
  };

  const MainApp = () => {
    return (
      <Switch>
        {isIndividual && (
          <Route path="/user/profile" component={UserProfilePage} />
        )}
        {isIndividual && (
          <Route path="/user/organizations" component={UserOrganizationsPage} />
        )}

        {isIndividual && (
          <Route path="/user/certificates" component={UserCertificates} />
        )}

        {isOrganization && (
          <Route
            path="/organization/profile"
            component={OrganizationProfilePage}
          />
        )}

        {isOrganization && (
          <Route
            path="/organization/members"
            component={OrganizationMembersPage}
          />
        )}

        {isOrganization && (
          <Route
            path="/organization/certificates"
            component={OrganizationCertificates}
          />
        )}

        <Route path="*">
          {isIndividual ? (
            <Redirect to="/user/profile" />
          ) : (
            <Redirect to="/organization/profile" />
          )}
        </Route>
      </Switch>
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
        <meta name="description" content="ISA Account" />
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
