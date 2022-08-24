import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { PrivacyPolicy } from 'app/pages/SignIn/PrivacyPolicy';
import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const PolicyDialog = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{
          textDecoration: 'underline',
          textDecorationColor: theme => theme.palette.text.secondary,
        }}
      >
        <Typography
          variant="subtitle2"
          color={theme => theme.palette.text.secondary}
        >
          {props.title}
        </Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography>{props.title}</Typography>
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    </>
  );
};
