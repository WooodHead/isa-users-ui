/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const ClubMembersPage = lazyLoad(
  () => import('./index'),
  module => module.ClubMembersPage,
);
