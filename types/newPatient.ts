export default interface NewPatient {
  id?: number;
  name: string;
  surname: string;
  birthdate: string;
  sex: string;
  email: string;
  phone: string;
  admissionDate?: string;

  // Motivo de consulta
  reason?: string;
  symptoms?: string;
  events?: string;
  diagnosis?: string;

  // Historia clínica
  observations?: string;
  keywords?: string;
  failedActs?: string;
  interconsultations?: string;
  evolution?: string;

  // Organización y seguimiento
  meetingTime?: string;
  frequency?: string;
  modality?: string;
  time?: string;
  contact?: string;
}
