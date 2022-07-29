/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const CertificatesPage = lazyLoad(
  () => import('./index'),
  module => module.CertificatesPage,
);
