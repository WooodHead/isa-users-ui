import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@mui/material';

import { selectCurrentUserInfo } from 'app/slices/app/selectors';
import { InputText } from 'app/components/InputField/InputText';
import { Auth } from 'aws-amplify';
import { showInfoNotification, showErrorNotification } from 'utils';
import { appActions } from 'app/slices/app';

interface Props {}
export function WarningInfo(props: Props) {
  const dispatch = useDispatch();

  const [verificationCode, setVerificationCode] = React.useState('');
  const currentUserInfo = useSelector(selectCurrentUserInfo);

  const resendVerificationEmail = async () => {
    if (verificationCode) {
      try {
        await Auth.verifyCurrentUserAttributeSubmit('email', verificationCode);
        dispatch(showInfoNotification('Email verified'));
        dispatch(
          appActions.updateCognitoAttributes({
            email_verified: true,
            sub: currentUserInfo!.cognitoAttributes!.sub,
          }),
        );
      } catch (err) {
        console.log(err);
        dispatch(showErrorNotification('Cannot verify email'));
      }
    } else {
      try {
        await Auth.verifyCurrentUserAttribute('email');
        dispatch(showInfoNotification('Verification email sent'));
      } catch (err) {
        console.log(err);
        dispatch(showErrorNotification('Cannot send verification email'));
      }
    }
  };
  if (currentUserInfo?.cognitoAttributes?.email_verified) {
    return null;
  }

  return (
    <Card>
      <CardHeader title="Actions Required" />
      <CardContent>
        <Alert
          severity="warning"
          action={
            <Grid container spacing={1}>
              <Grid item xs={6} lg={6}>
                <InputText
                  label="Verification Code"
                  placeholderText="Enter verification code"
                  required
                  fullWidth={false}
                  onChange={v => {
                    setVerificationCode(v);
                  }}
                  size="small"
                />
              </Grid>
              <Grid item xs={6} lg={6}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={resendVerificationEmail}
                >
                  {verificationCode
                    ? 'Submit Verification Code'
                    : 'Resend Verification Email'}
                </Button>
              </Grid>
            </Grid>
          }
        >
          {/* <AlertTitle>Action Required</AlertTitle> */}
          You MUST verify your email address before your account is suspended!
        </Alert>
      </CardContent>
    </Card>
  );
}
