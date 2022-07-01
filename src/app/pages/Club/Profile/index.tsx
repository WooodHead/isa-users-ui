import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { ClubProfile } from 'app/pages/Club/Profile/ClubProfile';

export function ClubProfilePage() {
  const dispatch = useDispatch();

  return (
    <Stack spacing={2} margin={4}>
      <ClubProfile />
    </Stack>
  );
}
