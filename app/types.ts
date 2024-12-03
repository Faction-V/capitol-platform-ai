export interface Key {
  id: string;
  apiKey: string;
  name: string;
  domain: string;
  organizationId: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  isOwner: boolean;
}

export interface Member {
  email: string;
  fullName: string;
  id: string;
  role: string;
}
