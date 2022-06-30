import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import { MyProfile } from 'app/pages/Profile/MyProfile';
import { Stack } from '@mui/material';

export function ProfilePage() {
  const dispatch = useDispatch();

  return (
    <Stack spacing={2} margin={4}>
      <MyProfile />
    </Stack>
  );
}
