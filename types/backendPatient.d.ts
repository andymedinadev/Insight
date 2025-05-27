export interface BackendPatient {
  id: number;
  name: string;
  surname: string;
  birthdate: string;
  typeOfIdentification: string;
  identification: string;
  sex: string;
  email: string;
  phone: string;
  age: number;
  admissionDate: string;
  rangoEtario: string;
  nationality: string;
  principalMotive: string | null;
  actualSymptoms: string | null;
  recentEvents: string | null;
  previousDiagnosis: string | null;
  profesionalObservations: string | null;
  keyWords: string | null;
  failedActs: string | null;
  interconsulation: string | null;
  patientEvolution: string | null;
  sessionDay: string | null;
  modality: string | null;
  sessionDuration: string | null;
  sessionFrequency: string | null;
  preferedContact: string | null;
}
