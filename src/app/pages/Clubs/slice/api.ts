import type { GetAllClubsAPIResponse } from './types';
import { baseApi } from 'store/rtk-query';

export const clubsApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getAllClubs: builder.query<GetAllClubsAPIResponse['items'], void>({
        query: () => ({ url: `club/all` }),
        transformResponse(response: GetAllClubsAPIResponse) {
          return response.items;
        },
      }),
    }),
  });
