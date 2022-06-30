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
import { useProfileForm } from 'app/pages/Profile/useProfileForm';
import { selectUserInfo } from 'app/slices/user/selectors';
import { showErrorNotification } from 'utils';
import { userApi } from 'app/slices/user/api';
import { CircularProgress } from '@mui/material';

export function MyProfile() {
  const dispatch = useDispatch();

  const [errorMarkedField, setErrorMarkedField] =
    useState<{ field: string; message: string }>();

  const userInfo = useSelector(selectUserInfo);
  const form = useProfileForm();
  const [updateUser, { isLoading: isSaving }] =
    userApi.useUpdateUserDetailsMutation();

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
      updateUser(result.data!);
    }
  };

  return (
    <Card>
      <CardHeader title="My Profile" />
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
              label="Surname"
              required
              error={errorMarkedField?.field === 'surname'}
              helperText={errorMarkedField?.message}
              defaultValue={userInfo!.surname}
              onChange={v => {
                form.setSurname(v);
              }}
            />
          </Grid>
          <Grid item xs={6} lg={6}>
            <InputSelect
              label="Gender"
              required
              options={[
                { label: 'Male', value: 'm' },
                { label: 'Female', value: 'f' },
                { label: 'Non-Binary/Other', value: 'o' },
              ]}
              error={errorMarkedField?.field === 'gender'}
              helperText={errorMarkedField?.message}
              defaultValue={userInfo!.gender}
              onChange={v => {
                form.setGender(v as any);
              }}
            />
          </Grid>
          <Grid item xs={6} lg={6}>
            <InputDate
              label="Birth Date"
              error={errorMarkedField?.field === 'birthDate'}
              helperText={errorMarkedField?.message}
              defaultValue={userInfo!.birthDate}
              onChange={v => {
                form.setBirthDate(v);
              }}
            />
          </Grid>
          <Grid item xs={6} lg={6}>
            <InputText
              label="Phone Number"
              error={errorMarkedField?.field === 'phoneNumber'}
              helperText={errorMarkedField?.message}
              defaultValue={userInfo!.phoneNumber}
              onChange={v => {
                form.setPhoneNumber(v);
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
            <InputText
              label="Emergency Contact Number"
              error={errorMarkedField?.field === 'emergencyContact'}
              helperText={errorMarkedField?.message}
              defaultValue={userInfo!.emergencyContact}
              onChange={v => {
                form.setEmergencyContact(v);
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
