import React from 'react';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  onSidebarOpen: () => void;
}

export const Topbar = (props: Props) => {
  const { onSidebarOpen } = props;

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
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
