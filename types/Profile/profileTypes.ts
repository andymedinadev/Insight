// profileTypes.ts

export interface User {
  name: string;
  lastName: string; // Aquí agregamos el apellido
  email: string;
  phone: string;
  specialty: string;
  avatarUrl: string;
}

export interface UpdateProfilePayload {
  name?: string;
  lastName?: string; // Asegúrate de incluir el apellido en el Payload
  email?: string;
  phone?: string;
  specialty?: string;
  avatarUrl?: string;
  password?: string;
  identification?: number;
}
