import React, { useState } from 'react';
import { appActions, useAppSlice } from '../../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState } from '../../slices/app/types';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { selectAuthState } from 'app/slices/app/selectors';
export const SignIn = () => {
  useAppSlice();

  const [signInHover, setSignInHover] = useState<boolean>(false);
  const authState = useSelector(selectAuthState);

  const dispatch = useDispatch();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-evenly"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs="auto">
        <div style={{ display: 'flex', justifyContent: 'center' }}></div>
        <Typography
          sx={{ marginTop: theme => theme.spacing(1), textAlign: 'center' }}
          variant="h4"
        >
          International Slackline Association Users
        </Typography>
      </Grid>
      <Grid item xs="auto" style={{ minHeight: '50px' }}>
        <Button
          onClick={() =>
            dispatch(appActions.updateAuthState(AuthState.SigningIn))
          }
          color="primary"
          variant="outlined"
          size="large"
          startIcon={signInHover ? <LockOpen /> : <Lock />}
          onMouseEnter={() => setSignInHover(true)}
          onMouseLeave={() => setSignInHover(false)}
        >
          Sign In
        </Button>
      </Grid>
    </Grid>
  );
};
