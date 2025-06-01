import { BackendPatient } from '@/types';

export type FrontendPatient = Omit<
  BackendPatient,
  'birthdate' | 'admissionDate' | 'sessionDuration' | 'modality' | 'sex'
> & {
  birthdate: string;
  admissionDate: string;
  sessionDuration: string;
  modality: string;
  sex: string;
};
