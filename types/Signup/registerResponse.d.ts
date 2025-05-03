export interface RegisterResponse {
  id: number;
  identification: number;
  name: string;
  apellido: string;
  email: string;
  passwordHash: string;
  createdDate: string;
  lastAccesDate: string;
}
