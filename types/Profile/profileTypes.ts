export interface User {
  name: string;
  lastName: string; 
  surname: string;
  email: string;
  phone: string;
  specialty: string;
  avatarUrl: string;
}

export interface UpdateProfilePayload {
  name?: string;
  lastName?: string; 
  email?: string;
  phone?: string;
  specialty?: string;
  avatarUrl?: string;
  password?: string;
  identification?: number;
}
