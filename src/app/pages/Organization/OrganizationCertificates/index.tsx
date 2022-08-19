import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import { MyCertificates } from 'app/pages/User/UserCertificates/MyCertificates';
import { Stack } from '@mui/material';

export function OrganizationCertificates() {
  const dispatch = useDispatch();

  return (
    <Stack spacing={2} margin={4}>
      <MyCertificates />
    </Stack>
  );
}
