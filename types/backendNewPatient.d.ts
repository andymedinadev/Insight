import type { SexType, ModalityType } from './index';

export interface BackendNewPatient {
  // ✅ Requeridos con validaciones
  userId: number;
  name: string; // máx 50, solo letras, espacios, tildes y ñ
  surname: string; // igual que name
  birthdate: string; // requerido, no puede ser en el futuro (validar en frontend)
  nationality: string; // máx 30, solo letras y espacios
  typeOfIdentification: string; // máx 50, solo letras y espacios
  identification: string; // máx 20, solo dígitos (validar /^\d+$/)
  sex: SexType; // enum
  email: string; // debe ser email válido
  phone: string; // debe ser número de teléfono válido (validación tipo E.164 en frontend si querés ser preciso)

  // ✅ Opcionales
  // Motivo de consulta
  principalMotive: string | null;
  actualSymptoms: string | null;
  recentEvents: string | null;
  previousDiagnosis: string | null;

  // Historia clínica
  profesionalObservations: string | null;
  keyWords: string | null;
  failedActs: string | null;
  interconsulation: string | null;
  patientEvolution: string | null;

  // Organización y seguimiento
  sessionDay: string | null;
  modality: ModalityType | null;
  sessionDuration: number | null;
  sessionFrequency: string | null;
  preferedContact: string | null;
}
