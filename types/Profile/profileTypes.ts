export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone?: string;
  specialty?: string;
  avatarUrl?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  avatarUrl: string;
}
