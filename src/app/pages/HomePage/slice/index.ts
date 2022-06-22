import { PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux/injectors';
import { createSlice } from 'utils/redux/toolkit';
import { HomepageState } from './types';

export const initialState: HomepageState = {
  name: 'temp',
};

const slice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {
      state.name = '2';
    },
  },
});

export const { actions: homepageActions } = slice;

export const useHomepageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
