import React, { useState } from 'react';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import CheckIcon from '@mui/icons-material/Check';

interface Props {
  signInClicked: () => void;
}

export const SignIn = (props: Props) => {
  const [signInHover, setSignInHover] = useState<boolean>(false);
  const { isDesktop } = useMediaQuery();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
      sx={{
        minHeight: '100%',
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        spacing={6}
        width={isDesktop ? '33vw' : '80vw'}
      >
        <Box
          component={'img'}
          alt="ISA Logo"
          src="/images/logo-wide.svg"
          width={'100%'}
        ></Box>
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
        <Stack
          spacing={2}
          sx={{
            mt: 4,
            '& b': {
              color: theme => theme.palette.primary.main,
            },
          }}
        >
          <Box display="flex" alignItems="center">
            <CheckIcon color="primary" sx={{ fontSize: '1.8rem' }} />
            <Typography variant="subtitle2" sx={{ ml: 1 }}>
              <b>Create</b> & <b>Manage</b> your ISA profile with your basic
              information.
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <CheckIcon color="primary" sx={{ fontSize: '1.8rem' }} />
            <Typography variant="subtitle2" sx={{ ml: 1 }}>
              <b>Access</b> the slackline applications, forms and services using
              a single ISA account.
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <CheckIcon color="primary" sx={{ fontSize: '1.8rem' }} />
            <Typography variant="subtitle2" sx={{ ml: 1 }}>
              Keep your information <b>private</b> without sharing with any
              third-parties.
            </Typography>
          </Box>
        </Stack>
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
      </Stack>
    </Box>
  );
};
