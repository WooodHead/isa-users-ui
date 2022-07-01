import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.club || initialState;

export const selectClubInfo = createSelector(
  [selectSlice],
  state => state.clubInfo,
);
