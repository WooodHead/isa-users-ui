import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import { MyOrganizations } from 'app/pages/User/UserOrganizations/MyOrganizations';
import { AllOrganizations } from 'app/pages/User/UserOrganizations/AllOrganizations';
import { Stack } from '@mui/material';

export function UserOrganizationsPage() {
  const dispatch = useDispatch();

  return (
    <Stack spacing={2} margin={4}>
      <MyOrganizations />
      <AllOrganizations />
    </Stack>
  );
}
