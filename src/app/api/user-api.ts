import type { GetOrganizationsOfUserResponse, GetUserAPIResponse } from './types';
import { baseApi } from 'store/rtk-query';
import { showSuccessNotification } from 'utils';

export const userApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ['userDetails', 'userOrganizations'],
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
      getOrganizationsOfUser: builder.query<GetOrganizationsOfUserResponse['items'], void>({
        query: () => ({ url: `user/organizations` }),
        providesTags: ['userOrganizations'],
        transformResponse(response: GetOrganizationsOfUserResponse) {
          return response.items;
        },
      }),
      leaveOrganization: builder.mutation<void, string>({
        query: id => ({
          url: `user/organization/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['userOrganizations'],
      }),
      joinOrganization: builder.mutation<void, string>({
        query: id => ({
          url: `user/organization/${id}/join`,
          method: 'POST',
        }),
        invalidatesTags: ['userOrganizations'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled;
          dispatch(
            showSuccessNotification(
              'Email has been sent to the organization for confirmation',
            ),
          );
        },
      }),
    }),
  });
