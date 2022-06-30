/* --- STATE --- */
export interface ClubsPageState {}

export interface GetAllClubsAPIResponse {
  items: {
    id: string;
    name: string;
    email: string;
    profilePictureUrl: string;
  }[];
}
