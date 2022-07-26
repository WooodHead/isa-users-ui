import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { useHistory } from 'react-router-dom';
import { Box, useTheme } from '@mui/system';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import { AuthState } from 'app/slices/app/types';
import { selectAuthState, selectCurrentUserInfo } from 'app/slices/app/selectors';

export const MainLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const currentUserInfo = useSelector(selectCurrentUserInfo);

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
        paddingTop: isDesktop ? '0' : '64px',
        height: '100%',
      }}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      {currentUserInfo?.email ? (
        <>
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
        </>
      ) : (
        <Box
          component={'main'}
          sx={{
            height: 'calc(100vh - 64px)',
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
};
