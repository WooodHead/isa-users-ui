import { useHomepageSlice } from 'app/pages/HomePage/slice';
import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import { Profile } from 'app/pages/HomePage/Profile';

export function HomePage() {
  const dispatch = useDispatch();

  const { actions } = useHomepageSlice();

  useEffect(() => {
    dispatch(actions.someAction(1));
  });
  return (
    <>
      <Helmet>
        <title>ISA Users</title>
        <meta name="description" content="ISA Users" />
      </Helmet>
      <Box
        sx={{
          m: 4,
          p: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
        }}
      >
        <Profile />
      </Box>
    </>
  );
}
