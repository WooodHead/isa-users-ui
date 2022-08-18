import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { MyProfile } from 'app/pages/Organization/Profile/MyProfile';

export function OrganizationProfilePage() {
  const dispatch = useDispatch();

  return (
    <Stack spacing={2} margin={4}>
      <MyProfile />
    </Stack>
  );
}
