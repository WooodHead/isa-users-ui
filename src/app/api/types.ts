export interface GetUserAPIResponse {
  email: string;
  name: string;
  surname: string;
  gender?: 'm' | 'f' | 'o';
  birthDate?: string;
  phoneNumber?: string;
  city?: string;
  country?: string;
  emergencyContact?: string;
  profilePictureUrl?: string;
}

export interface GetClubAPIResponse {
  email: string;
  name: string;
  profilePictureUrl?: string;
  city?: string;
  country?: string;
  memberType?: 'active' | 'observer' | 'partner';
  contactPhone?: string;
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

export interface GetAllClubsAPIResponse {
  items: {
    id: string;
    name: string;
    email: string;
    profilePictureUrl: string;
  }[];
}

export interface GetUsersOfClubResponse {
  items: {
    id: string;
    email: string;
    name: string;
    surname: string;
    joinedAt: string;
    isPendingApproval?: boolean;
    profilePictureUrl?: string;
  }[];
}
