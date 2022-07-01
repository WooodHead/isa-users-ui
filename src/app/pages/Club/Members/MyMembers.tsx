import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  colors,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { CircularProgress } from '@mui/material';
import { ButtonWithConfirmation } from 'app/components/ButtonWithConfirmation';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';

import { clubApi } from 'app/api/club-api';

export function Members() {
  const dispatch = useDispatch();

  const { data: users, isLoading: isUsersLoading } =
    clubApi.useGetUsersOfClubQuery();

  const [approveUser, { isLoading: isApprovingUser }] =
    clubApi.useApproveUserMutation();

  const [removeUser, { isLoading: isRemovingUser }] =
    clubApi.useRemoveUserMutation();

  const removeUserClicked = (userId: string) => {
    removeUser(userId);
  };

  const approveUserClicked = (userId: string) => {
    approveUser(userId);
  };

  const StatusCell = (props: { isPendingApproval?: boolean }) => {
    return (
      <Box
        display={'flex'}
        alignItems="center"
        sx={{
          color: props.isPendingApproval ? colors.red[500] : colors.green[500],
        }}
      >
        {props.isPendingApproval ? (
          <PauseCircleFilledIcon />
        ) : (
          <CheckCircleIcon />
        )}
        <Typography
          sx={{
            ml: 0.5,
          }}
        >
          {props.isPendingApproval ? 'Pending' : 'Approved'}
        </Typography>
      </Box>
    );
  };

  return (
    <Card>
      <CardHeader title="Members" />
      <CardContent>
        {isUsersLoading || isApprovingUser || isRemovingUser ? (
          <CircularProgress />
        ) : users?.length === 0 ? (
          <Typography>You have no members</Typography>
        ) : (
          <Table>
            <TableHead sx={{ backgroundColor: colors.grey[100] }}>
              <TableRow>
                <TableCell style={{ width: '20%' }}>Email</TableCell>
                <TableCell style={{ width: '50%' }}>Name</TableCell>
                <TableCell style={{ width: '15%' }}>Status</TableCell>
                <TableCell style={{ width: '15%' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.name} {user.surname}
                  </TableCell>
                  <TableCell>
                    <StatusCell
                      isPendingApproval={user.isPendingApproval}
                    ></StatusCell>
                  </TableCell>

                  <TableCell>
                    <ButtonWithConfirmation
                      icon={<DeleteIcon />}
                      title={'Do you want to remove this member?'}
                      confirmationText={'Remove'}
                      rejectionText={'Cancel'}
                      onConfirmation={() => {
                        removeUserClicked(user.id);
                      }}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                    {user.isPendingApproval && (
                      <ButtonWithConfirmation
                        icon={<CheckCircleIcon />}
                        title={'Do you want to approve this member?'}
                        confirmationText={'Approve'}
                        rejectionText={'Cancel'}
                        onConfirmation={() => {
                          approveUserClicked(user.id);
                        }}
                        size="small"
                        variant="outlined"
                        color={colors.green[500]}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
