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

interface Props {
  onSidebarOpen: () => void;
}

export const Topbar = (props: Props) => {
  useAppSlice();

  const { onSidebarOpen } = props;

  const dispatch = useDispatch();

  return (
    <AppBar sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Box
          sx={{
            ml: 2,
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" sx={{ mr: 2 }}>
            ISA Users
          </Typography>
          <img alt="ISA" src="/images/logos/logo_white.svg" />
        </Box>
        <Tooltip title="Logout" leaveDelay={250} arrow={true}>
          <IconButton
            sx={{ marginLeft: theme => theme.spacing(1) }}
            color="inherit"
            onClick={() =>
              dispatch(appActions.updateAuthState(AuthState.SigningOut))
            }
          >
            <InputIcon />
          </IconButton>
        </Tooltip>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
