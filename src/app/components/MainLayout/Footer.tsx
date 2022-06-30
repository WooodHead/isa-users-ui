import React from 'react';

import { Box, Grid, useTheme } from '@mui/material';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';

export const Footer = () => {
  const theme = useTheme();

  const { isDesktop } = useMediaQuery();
  return (
    <Grid container sx={{}}>
      <Grid item>
        {/* <img
          alt="ISA Logo"
          src="/images/logo-regular.svg"
          height={isDesktop ? 64 : 30}
        /> */}
      </Grid>
    </Grid>
  );
};
