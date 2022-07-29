import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import {
  Avatar,
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
  useTheme,
} from '@mui/material';

import { CircularProgress } from '@mui/material';
import { ButtonWithConfirmation } from 'app/components/ButtonWithConfirmation';
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
import { clubApi } from 'app/api/club-api';
import { userApi } from 'app/api/user-api';

export function AllClubs() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { isDesktop } = useMediaQuery();

  // const userInfo = useSelector(selectUserInfo);
  const { data: allClubs, isLoading: isClubsLoading } =
    clubApi.useGetAllClubsQuery(undefined, {});

  const { data: myClubs } = userApi.useGetClubsOfUserQuery();

  const [joinClub] = userApi.useJoinClubMutation();

  const requestClicked = (clubId: string) => {
    joinClub(clubId);
  };

  return (
    <Card>
      <CardHeader title="Clubs List (Members of ISA)" />
      <CardContent>
        {isClubsLoading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead sx={{ backgroundColor: colors.grey[100] }}>
              <TableRow>
                <TableCell style={{ width: isDesktop ? '80%' : '50%' }}>
                  Club
                </TableCell>
                <TableCell
                  style={{
                    width: isDesktop ? '30%' : '50%',
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allClubs?.map((club, keyIndex) => (
                <TableRow key={club.clubId}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        alt="Club Picture"
                        src={club?.profilePictureUrl || ''}
                        sx={{ mr: 1 }}
                      >
                        {club.name.substring(0, 1)}
                      </Avatar>
                      {club.name}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <ButtonWithConfirmation
                      buttonText="Request to join"
                      title={'We will notify the club via email'}
                      confirmationText={'Send Request'}
                      rejectionText={'Cancel'}
                      size="small"
                      onConfirmation={() => {
                        requestClicked(club.clubId);
                      }}
                      disabled={myClubs?.some(
                        myClub => myClub.clubId === club.clubId,
                      )}
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
