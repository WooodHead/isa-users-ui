/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const ClubsPage = lazyLoad(
  () => import('./index'),
  module => module.ClubsPage,
);
