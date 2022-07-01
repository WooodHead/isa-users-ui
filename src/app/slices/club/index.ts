import { PayloadAction } from '@reduxjs/toolkit';
import { clubApi } from 'app/api/club-api';
import { useInjectReducer } from 'store/injectors';
import { createSlice } from 'utils/redux/toolkit';
import { ClubState } from './types';

export const initialState: ClubState = {};

const slice = createSlice({
  name: 'club',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      clubApi.endpoints.getClubDetails.matchFulfilled,
      (state, { payload }) => {
        state.clubInfo = payload;
      },
    );
  },
});

export const { actions: clubActions } = slice;

export const useClubSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
