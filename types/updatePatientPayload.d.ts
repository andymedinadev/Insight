export interface UpdatePatientPayload {
  name?: string;
  surname?: string;
  birthdate?: string;
  identification?: number;
  sex?: 'M' | 'F' | 'O';
  modality?: string;
  email?: string;
  phone?: string;
  diagnosis?: string;
  institution?: string;
}
