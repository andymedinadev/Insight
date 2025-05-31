import { parse, formatISO } from 'date-fns';

import { BackendEditPatient, BackendPatient } from '@/types';

export function mapEditPatientToBackendPatient(editPatient: BackendEditPatient): BackendPatient {
  return {
    ...editPatient,
    birthdate: formatISO(parse(editPatient.birthdate, 'yyyy-MM-dd', new Date())),
    admissionDate: formatISO(parse(editPatient.admissionDate, 'yyyy-MM-dd', new Date())),
    principalMotive: editPatient.principalMotive ?? null,
    actualSymptoms: editPatient.actualSymptoms ?? null,
    recentEvents: editPatient.recentEvents ?? null,
    previousDiagnosis: editPatient.previousDiagnosis ?? null,
    profesionalObservations: editPatient.profesionalObservations ?? null,
    keyWords: editPatient.keyWords ?? null,
    failedActs: editPatient.failedActs ?? null,
    interconsulation: editPatient.interconsulation ?? null,
    patientEvolution: editPatient.patientEvolution ?? null,
    sessionDay: editPatient.sessionDay ?? null,
    modality: editPatient.modality ?? null,
    sessionDuration: editPatient.sessionDuration ?? null,
    sessionFrequency: editPatient.sessionFrequency ?? null,
    preferedContact: editPatient.preferedContact ?? null,
  };
}
