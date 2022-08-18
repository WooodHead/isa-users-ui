import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { Members } from 'app/pages/Organization/Members/MyMembers';

export function OrganizationMembersPage() {
  const dispatch = useDispatch();

  return (
    <Stack spacing={2} margin={4}>
      <Members />
    </Stack>
  );
}
