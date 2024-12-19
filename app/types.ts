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
  isAdmin: boolean;
  orgName: string;
  orgLogo: string;
  email: string;
}

export interface Member {
  email: string;
  fullName: string;
  id: string;
  role: string;
}

export interface Prompt {
  id: string;
  prompt: string;
}

export interface Organization {
  id: string;
  name: string;
  imageUrl: string;
}

export interface GuardrailsConfig {
  id: string;
  active: boolean;
  name: string;
  guardrailDescription: string;
  passCriteria: string;
  failCriteria: string;
  examples: string;
}
