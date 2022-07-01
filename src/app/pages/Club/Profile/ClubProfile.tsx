import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { InputText } from 'app/components/InputField/InputText';
import { InputSelect } from 'app/components/InputField/InputSelect';
import CountrySelect from 'app/components/InputField/CountrySelect';
import { InputDate } from 'app/components/InputField/InputDate';
import { selectUserInfo } from 'app/slices/user/selectors';
import { showErrorNotification } from 'utils';
import { CircularProgress } from '@mui/material';
import { selectClubInfo } from 'app/slices/club/selectors';
import { clubApi } from 'app/api/club-api';
import { useProfileForm } from 'app/pages/Club/Profile/useProfileForm';

export function ClubProfile() {
  const dispatch = useDispatch();

  const [errorMarkedField, setErrorMarkedField] =
    useState<{ field: string; message: string }>();

  const userInfo = useSelector(selectClubInfo);
  const form = useProfileForm();
  const [updateClub, { isLoading: isSaving }] =
    clubApi.useUpdateClubDetailsMutation();

  const handleSubmit = event => {
    event.preventDefault();

    const result = form.validate();
    if (!result.success) {
      const error = result.errors![0];
      setErrorMarkedField({ field: error.field, message: error.message });
      const message = `Invalid Field: "${error.field}". Reason: ${error.message}`;
      dispatch(showErrorNotification(message));
    } else {
      setErrorMarkedField(undefined);
      updateClub(result.data!);
    }
  };

  return (
    <Card>
      <CardHeader title="Club Profile" />
      {/* <Divider /> */}
      <CardContent>
        <Grid
          component={'form'}
          container
          spacing={2}
          columns={{ xs: 6, lg: 12 }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid item xs={6} lg={6}>
            <InputText
              label="Name"
              required
              error={errorMarkedField?.field === 'name'}
              helperText={errorMarkedField?.message}
              defaultValue={userInfo!.name}
              onChange={v => {
                form.setName(v);
              }}
            />
          </Grid>

          <Grid item xs={6} lg={6}>
            <InputText
              label="Contact Phone"
              error={errorMarkedField?.field === 'contactPhone'}
              helperText={errorMarkedField?.message}
              defaultValue={userInfo!.contactPhone}
              onChange={v => {
                form.setContactPhone(v);
              }}
            />
          </Grid>
          <Grid item xs={6} lg={6}>
            <InputText
              label="City"
              error={errorMarkedField?.field === 'city'}
              helperText={errorMarkedField?.message}
              defaultValue={userInfo!.city}
              onChange={v => {
                form.setCity(v);
              }}
            />
          </Grid>
          <Grid item xs={6} lg={6}>
            <CountrySelect
              defaultValue={userInfo!.country}
              onChange={v => {
                form.setCountry(v);
              }}
            />
          </Grid>
          <Grid item xs={6} lg={6}>
            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              sx={{ margin: 1 }}
              loading={isSaving}
            >
              Save Changes
            </LoadingButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
