import { useInjectReducer } from 'store/injectors';
import { createSlice } from 'utils/redux/toolkit';
import { ClubsPageState } from './types';

export const initialState: ClubsPageState = {};

const slice = createSlice({
  name: 'clubsPage',
  initialState,
  reducers: {},
});

export const { actions: clubPageActions } = slice;

export const useClubsPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
