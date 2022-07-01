import { Avatar, Box, Typography } from '@mui/material';
import { selectCurrentUserInfo } from 'app/slices/app/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Profile = () => {
  const userInfo = useSelector(selectCurrentUserInfo);

  const name: string = userInfo?.name ?? '';
  const surname: string = (userInfo || {})['surname'] || '';
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
        src={userInfo?.profilePictureUrl || ''}
      >
        {name.substring(0, 1)} {surname?.substring(0, 1)}
      </Avatar>
      <Typography variant="h5">{name + ' ' + surname}</Typography>
    </Box>
  );
};
