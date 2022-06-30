import React, { useState } from 'react';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import { Button, Grid, Typography } from '@mui/material';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';

interface Props {
  signInClicked: () => void;
}

export const SignIn = (props: Props) => {
  const [signInHover, setSignInHover] = useState<boolean>(false);
  const { isDesktop } = useMediaQuery();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-evenly"
      sx={{
        minHeight: '100vh',
      }}
    >
      <Grid
        item
        xs="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        style={{ width: isDesktop ? '33vw' : '80vw' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img alt="ISA Logo" src="/images/logo-wide.svg" width={'100%'} />
        </div>
        {/* <Typography
          sx={{
            marginTop: 4,
            textAlign: 'center',
            color: theme => theme.palette.grey[800],
            fontWeight: theme => theme.typography.fontWeightBold,
          }}
          variant="h4"
        >
          ISA USER PROFILE
        </Typography> */}
        <Typography
          sx={{
            marginTop: 4,
            textAlign: 'center',
            // maxWidth: '50%',
          }}
          variant="subtitle1"
        >
          <b>Create</b> and <b>manage</b> your ISA profile & information to
          access applications, forms, anything that requires user sign in.
        </Typography>
      </Grid>
      <Grid item xs="auto" style={{ minHeight: '50px' }}>
        <Button
          onClick={props.signInClicked}
          color="primary"
          variant="contained"
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
