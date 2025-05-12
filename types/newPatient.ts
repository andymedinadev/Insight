export type ModalityType = 'Presencial' | 'Virtual' | 'Híbrido' | '';

export type DuracionSesion = '30 min' | '45 min' | '50 min' | '60 min' | '';

export type SexType =
  | 'Masculino'
  | 'Femenino'
  | 'Transgénero'
  | 'No binario'
  | 'Bigénero'
  | 'Intersexual'
  | 'Otro'
  | '';

export interface NewPatient {
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
}
