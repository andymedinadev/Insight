import { Material } from './material';
import { Note } from './note';

export interface Patient {
  id: number;
  name: string;
  surname: string;
  birthdate: string;
  identification: number;
  sex: string;
  email?: string | null;
  phone?: string | null;
  modality: string;
  admissionDate: string;
  diagnosis?: string | null;
  institution?: string | null;
  age?: number;
  lastSession?: string;
  category?: string;
  notes?: Note[];
  materials?: Material[];
  filed?: boolean;
  isEnable: boolean;
}
