import { DuracionSesion, Material, ModalityType, Note, RangoEtario, SexType } from '@/types';

export interface EditPatient {
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
  age?: number;
  rangoEtario?: RangoEtario;
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
  filed?: boolean;
}
