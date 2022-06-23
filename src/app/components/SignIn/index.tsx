import React, { useState } from 'react';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import { Button, Grid, Typography } from '@mui/material';

interface Props {
  signInClicked: () => void;
}

export const SignIn = (props: Props) => {
  const [signInHover, setSignInHover] = useState<boolean>(false);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-evenly"
      style={{ minHeight: '100vh' }}
    >
      <Grid
        item
        xs="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img alt="Logo" src="/images/logo-long.png" />
        </div>
        <Typography
          sx={{
            marginTop: theme => theme.spacing(2),
            textAlign: 'center',
          }}
          variant="h5"
        >
          User Management System
        </Typography>
        <Typography
          sx={{
            marginTop: theme => theme.spacing(1),
            textAlign: 'center',
            maxWidth: '50%',
          }}
          variant="subtitle1"
        >
          ...
        </Typography>
      </Grid>
      <Grid item xs="auto" style={{ minHeight: '50px' }}>
        <Button
          onClick={props.signInClicked}
          color="primary"
          variant="outlined"
          size="large"
          startIcon={signInHover ? <LockOpen /> : <Lock />}
          onMouseEnter={() => setSignInHover(true)}
          onMouseLeave={() => setSignInHover(false)}
        >
          Sign In / Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};
