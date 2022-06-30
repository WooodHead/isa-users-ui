import { Avatar, Box, Typography } from '@mui/material';
import { selectUserInfo } from 'app/slices/user/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Profile = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector(selectUserInfo);

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
        sx={{
          width: '60px',
          height: '60px',
          marginBottom: 1,
          // backgroundColor: theme => theme.palette.primary.light,
        }}
        alt="Person"
        src={''}
      >
        {userInfo?.name.substring(0, 1)} {userInfo?.surname.substring(0, 1)}
      </Avatar>
      <Typography variant="h5">
        {userInfo?.name + ' ' + userInfo?.surname}
      </Typography>
    </Box>
  );
};
