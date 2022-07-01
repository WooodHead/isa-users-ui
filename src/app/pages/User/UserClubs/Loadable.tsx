/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const UserClubsPage = lazyLoad(
  () => import('./index'),
  module => module.UserClubsPage,
);
