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
import { userApi } from 'app/api/user-api';

export function MyClubs() {
  const dispatch = useDispatch();

  const { data: clubs, isLoading: isClubsLoading } =
    userApi.useGetClubsOfUserQuery();
  const [leaveClub, { isLoading: isLeavingClub }] =
    userApi.useLeaveClubMutation();

  const leaveClubClicked = (clubId: string) => {
    leaveClub(clubId);
  };

  let c = [] as any;
  return (
    <Card>
      <CardHeader title="My Certificates" />
      <CardContent>
        {isClubsLoading || isLeavingClub ? (
          <CircularProgress />
        ) : c?.length === 0 ? (
          <Typography>You have no certificates</Typography>
        ) : (
          <Table>
            <TableHead sx={{ backgroundColor: colors.grey[100] }}>
              <TableRow>
                <TableCell style={{ width: '60%' }}>Club</TableCell>
                <TableCell style={{ width: '20%' }}>Status</TableCell>
                <TableCell style={{ width: '20%' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {c?.map((club, keyIndex) => (
                <TableRow key={club.clubId}>
                  <TableCell>{club.name}</TableCell>
                  <TableCell>
                    <ButtonWithConfirmation
                      icon={<DeleteIcon />}
                      buttonText="Leave"
                      title={'Do you really want to leave this club?'}
                      confirmationText={'Leave'}
                      rejectionText={'Cancel'}
                      onConfirmation={() => {
                        leaveClubClicked(club.clubId);
                      }}
                      // size="small"
                      variant="outlined"
                    />
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
