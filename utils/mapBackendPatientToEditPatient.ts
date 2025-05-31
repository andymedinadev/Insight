import { parseISO, format } from 'date-fns';

import { BackendEditPatient, BackendPatient } from '@/types';

export function mapBackendPatientToEditPatient(patient: BackendPatient): BackendEditPatient {
  return {
    ...patient,
    birthdate: format(parseISO(patient.birthdate), 'yyyy-MM-dd'),
    admissionDate: format(parseISO(patient.admissionDate), 'yyyy-MM-dd'),
    principalMotive: patient.principalMotive ?? undefined,
    actualSymptoms: patient.actualSymptoms ?? undefined,
    recentEvents: patient.recentEvents ?? undefined,
    previousDiagnosis: patient.previousDiagnosis ?? undefined,
    profesionalObservations: patient.profesionalObservations ?? undefined,
    keyWords: patient.keyWords ?? undefined,
    failedActs: patient.failedActs ?? undefined,
    interconsulation: patient.interconsulation ?? undefined,
    patientEvolution: patient.patientEvolution ?? undefined,
    sessionDay: patient.sessionDay ?? undefined,
    modality: patient.modality ?? undefined,
    sessionDuration: patient.sessionDuration ?? undefined,
    sessionFrequency: patient.sessionFrequency ?? undefined,
    preferedContact: patient.preferedContact ?? undefined,
  };
}
