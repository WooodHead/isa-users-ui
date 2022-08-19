import type { GetAllCertificatesAPIResponse } from './types';
import { baseApi } from 'store/rtk-query';

export const certificateApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ['certicates'],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getAllCertificates: builder.query<
        GetAllCertificatesAPIResponse['items'],
        void
      >({
        query: () => ({ url: `certificate/all` }),
        transformResponse(response: GetAllCertificatesAPIResponse) {
          return response.items;
        },
      }),
    }),
  });
