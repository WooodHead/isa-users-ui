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
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';

export const Footer = () => {
  useAppSlice();

  const dispatch = useDispatch();
  const { isDesktop } = useMediaQuery();

  return (
    <Grid container spacing={1} sx={{ fontSize: '0.1rem' }}>
      <Grid item xs={6}>
        <IconButton
          sx={{ borderRadius: 0, padding: 0 }}
          color="inherit"
          onClick={() =>
            dispatch(appActions.updateAuthState(AuthState.SigningOut))
          }
        >
          <InputIcon />
          <Typography sx={{ marginLeft: 0.5, fontSize: '0.8rem' }}>
            Logout
          </Typography>
        </IconButton>
      </Grid>
      <Grid item xs={6}>
        <IconButton
          sx={{ borderRadius: 0, padding: 0 }}
          color="inherit"
          href={`mailto:${'info@slacklineinternational.org'}?subject=${
            encodeURIComponent('ISA Account Contact') || ''
          }&body=${encodeURIComponent('') || ''}`}
        >
          <EmailIcon />
          <Typography sx={{ marginLeft: 0.5, fontSize: '0.8rem' }}>
            Contact
          </Typography>
        </IconButton>
      </Grid>
      <Grid item xs={6}>
        <IconButton sx={{ borderRadius: 0, padding: 0 }} color="inherit">
          <LinkIcon />
          <Typography sx={{ marginLeft: 0.5, fontSize: '0.8rem' }}>
            FAQ
          </Typography>
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption">
          Copyright © 2022 International Slackline Association. All rights
          reserved.
        </Typography>
      </Grid>
    </Grid>
  );
};
