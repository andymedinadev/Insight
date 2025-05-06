export interface PatientProfileData {
  fullName: string;
  age: number;
  birthdate: string;
  sex: 'Masculino' | 'Femenino' | 'Otros';
  email: string;
  phone: string;
  modality: string;
  admissionDate: string;
}
