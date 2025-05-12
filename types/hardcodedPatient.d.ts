import { Note, Material } from '@/types';

export type ModalityType = 'Presencial' | 'Virtual' | 'Híbrido' | undefined;

export type RangoEtario = 'Niño' | 'Adolescente' | 'Adulto';

export type DuracionSesion = '30 min' | '45 min' | '50 min' | '60 min' | undefined;

export type SexType =
  | 'Masculino'
  | 'Femenino'
  | 'Transgénero'
  | 'No binario'
  | 'Bigénero'
  | 'Intersexual'
  | 'Otro'
  | undefined;

export interface HardcodedPatient {
  id: number;
  name: string;
  surname: string;
  birthdate: string;
  nationality: string;
  typeOfIdentification: string;
  identification: string;
  sex: SexType;
  email: string;
  phone: string;
  admissionDate: string;
  age: number;
  rangoEtario: RangoEtario;
  lastSession?: string;
  notes: Note[];
  materials: Material[];
  motivosConsulta?: {
    motivoPrincipal?: string;
    sintomasActuales?: string;
    eventosRecientesRelevantes?: string;
    diagnosticoPrevio?: string;
  };
  historiaClinica?: {
    observaciones?: string;
    frasesRecurrentes?: string;
    actosFallidos?: string;
    derivacionesRealizadas?: string;
    evolucionPaciente?: string;
  };
  seguimiento?: {
    diaYHorario?: string;
    modalidad?: ModalityType;
    duracionSesion?: DuracionSesion;
    frecuencia?: string;
    medioContactoPreferido?: string;
  };
  filed: boolean;
}
