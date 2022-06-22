import { Avatar, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Profile = () => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'fit-content',
        marginBottom: 1,
      }}
    >
      <Avatar
        sx={{ width: '60px', height: '60px', marginBottom: 1 }}
        alt="Person"
        src={'/images/avatars/admin.jpg'}
      />
      <Typography variant="h5">{'User Name'}</Typography>
    </Box>
  );
};
