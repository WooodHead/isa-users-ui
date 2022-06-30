import React from 'react';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InputIcon from '@mui/icons-material/Input';
import { useAppSlice, appActions } from 'app/slices/app';
import { AuthState } from 'app/slices/app/types';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';

interface Props {
  onSidebarOpen: () => void;
}

export const Topbar = (props: Props) => {
  useAppSlice();

  const { onSidebarOpen } = props;

  const dispatch = useDispatch();
  const { isDesktop } = useMediaQuery();

  return (
    <AppBar sx={{ flexGrow: 1 }}>
      <Toolbar sx={{ height: '64px' }}>
        <Box
          sx={{
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            alignItems: 'center',
          }}
        >
          <img
            alt="ISA Logo"
            src="/images/logo-contrast.svg"
            height={isDesktop ? 48 : 30}
          />
          {/* <Typography variant="subtitle1" sx={{ m: 2 }}>
            Members <br />
            Portal
          </Typography> */}
        </Box>
        <IconButton
          sx={{ borderRadius: 0 }}
          color="inherit"
          onClick={() =>
            dispatch(appActions.updateAuthState(AuthState.SignedOut))
          }
        >
          <InputIcon />
          <Typography sx={{ marginLeft: 1 }}>Logout</Typography>
        </IconButton>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
