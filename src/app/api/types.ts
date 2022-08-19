export interface GetUserAPIResponse {
  cognitoSub: string;
  userId: string;
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

export interface GetOrganizationAPIResponse {
  cognitoSub: string;
  organizationId: string;
  email: string;
  name: string;
  profilePictureUrl?: string;
  city?: string;
  country?: string;
  memberType?: 'active' | 'observer' | 'partner';
  contactPhone?: string;
}

export interface GetOrganizationsOfUserResponse {
  items: {
    organizationId: string;
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

export interface GetAllOrganizationsAPIResponse {
  items: {
    organizationId: string;
    name: string;
    email: string;
    profilePictureUrl?: string;
  }[];
}

export interface GetUsersOfOrganizationResponse {
  items: {
    userId: string;
    email: string;
    name: string;
    surname: string;
    joinedAt: string;
    isPendingApproval?: boolean;
    profilePictureUrl?: string;
  }[];
}

export interface GetAllCertificatesAPIResponse {
  items: {
    range: string;
    headers?: string[];
    values: string[][];
  }[];
}
