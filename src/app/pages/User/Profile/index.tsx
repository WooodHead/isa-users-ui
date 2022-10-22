import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import { MyProfile } from 'app/pages/User/Profile/MyProfile';
import { Alert, AlertTitle, Button, Grid, Stack } from '@mui/material';
import { selectCurrentUserInfo } from 'app/slices/app/selectors';
import { WarningInfo } from 'app/pages/User/Profile/WarningInfo';
import { Auth } from 'aws-amplify';
import { showErrorNotification, showInfoNotification } from 'utils';
import { InputText } from 'app/components/InputField/InputText';

export function UserProfilePage() {
  const dispatch = useDispatch();

  const currentUserInfo = useSelector(selectCurrentUserInfo);

  return (
    <Stack spacing={2} margin={4}>
      <WarningInfo />
      <MyProfile />
    </Stack>
  );
}
