import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import { MyClubs } from 'app/pages/Clubs/MyClubs';
import { AllClubs } from 'app/pages/Clubs/AllClubs';
import { Stack } from '@mui/material';

export function ClubsPage() {
  const dispatch = useDispatch();

  return (
    <Stack spacing={2} margin={4}>
      <MyClubs />
      <AllClubs />
    </Stack>
  );
}
