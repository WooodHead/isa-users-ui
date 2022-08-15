import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Auth } from 'aws-amplify';
import { RootState } from 'store/types';
import { showErrorNotification } from 'utils';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://qvjz6zmwx1.execute-api.eu-central-1.amazonaws.com/prod/',
  prepareHeaders: async (headers, { getState }) => {
    const token = await Auth.currentSession().then(s =>
      s.getIdToken().getJwtToken(),
    );
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: () => ({}),
});

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => next => action => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      const message = `Error: ${
        action?.payload?.data?.message || action?.error?.message
      }`;
      api.dispatch(showErrorNotification(message));
    }

    return next(action);
  };
