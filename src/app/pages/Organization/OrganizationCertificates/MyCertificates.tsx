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

export function MyCertificates() {
  const dispatch = useDispatch();

  const { data: organizations, isLoading: isOrganizationsLoading } =
    userApi.useGetOrganizationsOfUserQuery();
  const [leaveOrganization, { isLoading: isLeavingOrganization }] =
    userApi.useLeaveOrganizationMutation();

  const leaveOrganizationClicked = (organizationId: string) => {
    leaveOrganization(organizationId);
  };

  let c = [] as any;
  return (
    <Card>
      <CardHeader title="My Certificates" />
      <CardContent>
        {isOrganizationsLoading || isLeavingOrganization ? (
          <CircularProgress />
        ) : c?.length === 0 ? (
          <Typography>You have no certificates</Typography>
        ) : (
          <Table>
            <TableHead sx={{ backgroundColor: colors.grey[100] }}>
              <TableRow>
                <TableCell style={{ width: '60%' }}>Organization</TableCell>
                <TableCell style={{ width: '20%' }}>Status</TableCell>
                <TableCell style={{ width: '20%' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {c?.map((organization, keyIndex) => (
                <TableRow key={organization.organizationId}>
                  <TableCell>{organization.name}</TableCell>
                  <TableCell>
                    <ButtonWithConfirmation
                      icon={<DeleteIcon />}
                      buttonText="Leave"
                      title={'Do you really want to leave this organization?'}
                      confirmationText={'Leave'}
                      rejectionText={'Cancel'}
                      onConfirmation={() => {
                        leaveOrganizationClicked(organization.organizationId);
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
