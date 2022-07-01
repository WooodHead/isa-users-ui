import * as React from 'react';
import { Profile } from './Profile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  useTheme,
} from '@mui/material';
import { Footer } from 'app/components/MainLayout/Footer';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'app/slices/user/selectors';
import { selectUserIdentityType } from 'app/slices/app/selectors';

interface Props {
  onClose: () => void;
  open: boolean;
  variant: 'persistent' | 'temporary';
}

export const Sidebar = (props: Props) => {
  const { open, variant, onClose } = props;
  const identityType = useSelector(selectUserIdentityType);

  const theme = useTheme();

  const pages = [
    {
      title: 'Profile',
      href: '/user/profile',
      disabled: false,
      show: identityType === 'individual',
      icon: <AccountCircleIcon />,
    },
    {
      title: 'Clubs',
      href: '/user/clubs',
      show: identityType === 'individual',
      icon: <WorkspacesIcon />,
    },
    {
      title: 'Profile',
      href: '/club/profile',
      disabled: false,
      show: identityType === 'club',
      icon: <AccountCircleIcon />,
    },
    {
      title: 'Members',
      href: '/club/members',
      show: identityType === 'club',
      icon: <WorkspacesIcon />,
    },
  ];

  return (
    <Drawer
      sx={{
        width: '240px',
        [theme.breakpoints.up('lg')]: {
          height: 'calc(100% - 64px)',
        },
      }}
      anchor="left"
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 240,
          height: '100%',
          marginTop: '64px',
          padding: theme.spacing(2),
        }}
      >
        <Profile />
        <Divider />
        <List>
          {pages.map(
            page =>
              page.show && (
                <ListItem
                  disableGutters
                  key={page.title}
                  sx={{ display: 'flex', paddingTop: 0, paddingBottom: 0 }}
                >
                  <Button
                    sx={{
                      display: 'flex',
                      flexGrow: 1,
                      padding: '10px 8px',
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      width: '100%',
                      color: theme.palette.grey[800],
                      fontWeight: theme.typography.fontWeightMedium,
                      '&:active': {
                        color: theme.palette.primary.main,
                      },
                    }}
                    variant="text"
                    component={NavLink}
                    disabled={Boolean(page.disabled)}
                    to={page.href}
                  >
                    <Box
                      sx={{
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: theme.spacing(1),
                      }}
                    >
                      {page.icon}
                    </Box>
                    {page.title}
                  </Button>
                </ListItem>
              ),
          )}
        </List>
        <Box sx={{ mt: 'auto' }}>
          <Footer />
        </Box>
      </Box>
    </Drawer>
  );
};
