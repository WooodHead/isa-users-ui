import React from 'react';

import {
  Box,
  Grid,
  Hidden,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import { appActions, useAppSlice } from 'app/slices/app';
import { AuthState } from 'app/slices/app/types';
import InputIcon from '@mui/icons-material/Input';
import { useDispatch } from 'react-redux';

export const Footer = () => {
  useAppSlice();

  const dispatch = useDispatch();
  const { isDesktop } = useMediaQuery();

  return (
    <Grid container spacing={1} sx={{}}>
      <Grid item xs={6}>
        <IconButton
          sx={{ borderRadius: 0, padding: 0 }}
          color="inherit"
          onClick={() =>
            dispatch(appActions.updateAuthState(AuthState.SigningOut))
          }
        >
          <InputIcon />
          <Typography sx={{ marginLeft: 1 }}>Logout</Typography>
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption">
          Copyright © 2022 International Slackline Federation. All rights
          reserved.
        </Typography>
      </Grid>
    </Grid>
  );
};
