import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { useHistory } from 'react-router-dom';
import { Box, useTheme } from '@mui/system';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';

export const MainLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  const { isDesktop } = useMediaQuery();

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <Box
      sx={{
        paddingTop: '56px',
        height: '100%',
        [theme.breakpoints.up('sm')]: {
          paddingTop: '64px',
        },
      }}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <Box
        component={'main'}
        sx={{
          height: '100%',
          ml: isDesktop ? '240px' : '0',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
