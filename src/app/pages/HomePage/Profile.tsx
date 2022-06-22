import { useHomepageSlice } from 'app/pages/HomePage/slice';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import { Card, CardContent, CardHeader, Divider } from '@mui/material';

export function Profile() {
  const dispatch = useDispatch();

  const { actions } = useHomepageSlice();

  useEffect(() => {
    dispatch(actions.someAction(1));
  });
  return (
    <>
      <Card>
        <CardHeader title="My Profile" />
        {/* <Divider /> */}
        <CardContent>xxx</CardContent>
      </Card>
    </>
  );
}
