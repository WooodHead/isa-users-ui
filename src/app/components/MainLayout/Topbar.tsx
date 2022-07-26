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
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import { selectAuthState } from 'app/slices/app/selectors';

interface Props {
  onSidebarOpen: () => void;
}

export const Topbar = (props: Props) => {
  useAppSlice();

  const { onSidebarOpen } = props;

  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);

  return (
    <AppBar sx={{ flexGrow: 1, display: { lg: 'none' } }}>
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
          <Link href="https://www.slacklineinternational.org" target="_blank">
            <img alt="ISA Logo" src="/images/logo-contrast.svg" height="32px" />
          </Link>

          {/* <Typography variant="subtitle1" sx={{ m: 2 }}>
             Users
          </Typography> */}
        </Box>
        {authState === AuthState.SignedIn && (
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onSidebarOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        )}
      </Toolbar>
    </AppBar>
  );
};
