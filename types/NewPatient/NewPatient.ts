export default interface NewPatient {
  name: string;
  lastname: string;
  age: string;
  birthdate: string;
  gender: string;
  email: string;
  phone: string;
  date: string;
  
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
  careModality?: string;
  time?: string;
  contact?: string;
}
  