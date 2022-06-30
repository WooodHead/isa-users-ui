/* --- STATE --- */
export interface UserState {
  userInfo?: GetUserAPIResponse;
}

export interface GetUserAPIResponse {
  email: string;
  name: string;
  surname: string;
  identityType: 'individual' | 'club';
  gender?: 'm' | 'f' | 'o';
  birthDate?: string;
  phoneNumber?: string;
  city?: string;
  country?: string;
  emergencyContact?: string;
}

export interface GetClubsOfUserResponse {
  items: {
    clubId: string;
    email: string;
    name: string;
    isPendingApproval?: boolean;
    joinedAt: string;
    profilePictureUrl?: string;
    city?: string;
    country?: string;
    memberType?: 'active' | 'observer' | 'partner';
    contactPhone?: string;
  }[];
}
