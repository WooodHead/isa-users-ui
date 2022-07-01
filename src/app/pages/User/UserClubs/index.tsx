import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import { MyClubs } from 'app/pages/User/UserClubs/MyClubs';
import { AllClubs } from 'app/pages/User/UserClubs/AllClubs';
import { Stack } from '@mui/material';

export function UserClubsPage() {
  const dispatch = useDispatch();

  return (
    <Stack spacing={2} margin={4}>
      <MyClubs />
      <AllClubs />
    </Stack>
  );
}
