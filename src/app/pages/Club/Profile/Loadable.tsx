/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const ClubProfilePage = lazyLoad(
  () => import('./index'),
  module => module.ClubProfilePage,
);
