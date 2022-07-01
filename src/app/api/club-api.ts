import type {
  GetAllClubsAPIResponse,
  GetClubAPIResponse,
  GetUsersOfClubResponse,
} from './types';
import { baseApi } from 'store/rtk-query';
import { showSuccessNotification } from 'utils';

export const clubApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ['clubDetails', 'clubUsers'],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getAllClubs: builder.query<GetAllClubsAPIResponse['items'], void>({
        query: () => ({ url: `club/all` }),
        transformResponse(response: GetAllClubsAPIResponse) {
          return response.items;
        },
      }),
      getClubDetails: builder.query<GetClubAPIResponse, void>({
        query: () => ({ url: `club/details` }),
        providesTags: ['clubDetails'],
      }),

      updateClubDetails: builder.mutation<
        GetClubAPIResponse,
        Partial<GetClubAPIResponse>
      >({
        query: body => ({
          url: `club/details`,
          method: 'PUT',
          body: body,
        }),
        invalidatesTags: ['clubDetails'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled;
          dispatch(showSuccessNotification('Saved Changes'));
        },
      }),

      getUsersOfClub: builder.query<GetUsersOfClubResponse['items'], void>({
        query: id => ({ url: `club/users` }),
        providesTags: ['clubUsers'],
        transformResponse(response: GetUsersOfClubResponse) {
          return response.items;
        },
      }),
      approveUser: builder.mutation<void, string>({
        query: id => ({
          url: `club/user/${id}/approve`,
          method: 'POST',
        }),
        invalidatesTags: ['clubUsers'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled;
          dispatch(showSuccessNotification('Approved Member!'));
        },
      }),
      removeUser: builder.mutation<void, string>({
        query: id => ({
          url: `club/user/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['clubUsers'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled;
          dispatch(showSuccessNotification('Removed Member!'));
        },
      }),
    }),
  });
