import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { selectCurrentUserInfo } from 'app/slices/app/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

import { Storage } from 'aws-amplify';
import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification,
} from 'utils';
import { userApi } from 'app/api/user-api';
import { clubApi } from 'app/api/club-api';

export const Profile = () => {
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);

  const userInfo = useSelector(selectCurrentUserInfo);

  const dispatch = useDispatch();

  const name: string = userInfo?.name ?? '';
  const surname: string = (userInfo || {})['surname'] || '';

  const [updateUser, { isLoading: isUpdatingUser }] =
    userApi.useUpdateUserDetailsMutation();

  const [updateClub, { isLoading: isUpdatingClub }] =
    clubApi.useUpdateClubDetailsMutation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fileSizeLimitKb = () => {
    if (userInfo?.identityType === 'club') {
      return 20;
    } else {
      return 500;
    }
  };

  const generateS3Key = (ext: string) => {
    const folder = userInfo!.isaId;
    return `${folder}/profilePicture_${new Date().toISOString()}.${ext}`;
  };

  const updateProfilePictureUrl = (s3Key: string | null) => {
    const imageUrl =
      s3Key === null
        ? 'undefined'
        : `http://isa-users-images.s3-website.eu-central-1.amazonaws.com/public/${s3Key}`;
    if (userInfo?.identityType === 'individual') {
      updateUser({ profilePictureUrl: imageUrl });
    } else if (userInfo?.identityType === 'club') {
      updateClub({ profilePictureUrl: imageUrl });
    }
    setIsUpdatingImage(false);
  };

  const uploadProfilePicture = async (file: File) => {
    console.log(file.size);
    if (file.size > fileSizeLimitKb() * 1000) {
      dispatch(
        showErrorNotification(`Max file size is ${fileSizeLimitKb()}KB`),
      );
      return;
    }
    const fileNameArray = file.name.split('.');
    const fileExtension = fileNameArray[fileNameArray.length - 1];
    const allowedFileTypes = ['jpg', 'png'];
    if (!allowedFileTypes.includes(fileExtension)) {
      dispatch(showErrorNotification('Only jpg and png are allowed.'));
      return;
    }
    try {
      setIsUpdatingImage(true);
      const key = generateS3Key(fileExtension);
      await Storage.put(key, file, {
        contentType: 'image/jpg',
      });
      updateProfilePictureUrl(key);
    } catch (error) {
      dispatch(showErrorNotification('Could not upload file'));
    }
  };

  const handleUploadClick = async event => {
    var file = event.target.files[0];
    await uploadProfilePicture(file);
  };

  const removeClicked = () => {
    updateProfilePictureUrl(null);
  };

  return (
    <Stack direction={'row'} spacing={0}>
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleUploadClick}
        style={{ display: 'none' }}
      />
      <IconButton
        onClick={handleClick}
        aria-controls={open ? 'profile-picture-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {isUpdatingImage || isUpdatingUser || isUpdatingClub ? (
          <CircularProgress />
        ) : (
          <Avatar
            sx={{
              width: '60px',
              height: '60px',
              borderStyle: 'solid',
              borderColor: theme => theme.palette.primary.contrastText,
            }}
            alt="Profile Picture"
            src={userInfo?.profilePictureUrl || ''}
          >
            {name.substring(0, 1)} {surname?.substring(0, 1)}
          </Avatar>
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="profile-picture-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <AddPhotoAlternateIcon fontSize="small" />
          </ListItemIcon>
          <label htmlFor="contained-button-file">Upload Profile Picture</label>
        </MenuItem>
        <MenuItem onClick={removeClicked}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Remove Profile Picture
        </MenuItem>
      </Menu>
      <Stack spacing={0} justifyContent={'center'} alignItems={'baseline'}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="h5">{surname}</Typography>
      </Stack>
    </Stack>
  );
};
