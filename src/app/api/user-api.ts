import type { GetClubsOfUserResponse, GetUserAPIResponse } from './types';
import { baseApi } from 'store/rtk-query';
import { showSuccessNotification } from 'utils';

export const userApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ['userDetails', 'userClubs'],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getUserDetails: builder.query<GetUserAPIResponse, void>({
        query: () => ({ url: `user/details` }),
        providesTags: ['userDetails'],
      }),

      updateUserDetails: builder.mutation<
        GetUserAPIResponse,
        Partial<GetUserAPIResponse>
      >({
        query: body => ({
          url: `user/details`,
          method: 'PUT',
          body: body,
        }),
        invalidatesTags: ['userDetails'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled;
          dispatch(showSuccessNotification('Saved Changes'));
        },
      }),
      getClubsOfUser: builder.query<GetClubsOfUserResponse['items'], void>({
        query: () => ({ url: `user/clubs` }),
        providesTags: ['userClubs'],
        transformResponse(response: GetClubsOfUserResponse) {
          return response.items;
        },
      }),
      leaveClub: builder.mutation<void, string>({
        query: id => ({
          url: `user/club/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['userClubs'],
      }),
      joinClub: builder.mutation<void, string>({
        query: id => ({
          url: `user/club/${id}/join`,
          method: 'POST',
        }),
        invalidatesTags: ['userClubs'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled;
          dispatch(
            showSuccessNotification(
              'Email has been sent to the club for confirmation',
            ),
          );
        },
      }),
    }),
  });
