import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import { Stack } from '@mui/material';
import { MyCertificates } from 'app/components/MyCertificates';

export function OrganizationCertificates() {
  const dispatch = useDispatch();

  return (
    <Stack spacing={2} margin={4}>
      <MyCertificates />
    </Stack>
  );
}
