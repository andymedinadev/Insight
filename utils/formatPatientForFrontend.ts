import { format, parseISO } from 'date-fns';

import { sessionOptions, modalityOptions, sexOptions } from '@/constants';
import { BackendPatient, FrontendPatient } from '@/types';

export function formatPatientForFrontend(patient: BackendPatient): FrontendPatient {
  const session = sessionOptions.find((opt) => opt.value === patient.sessionDuration);
  const modality = modalityOptions.find((opt) => opt.value === patient.modality);
  const sex = sexOptions.find((opt) => opt.value === patient.sex);

  return {
    ...patient,
    birthdate: format(parseISO(patient.birthdate), 'dd/MM/yyyy'),
    admissionDate: format(parseISO(patient.admissionDate), 'dd/MM/yyyy'),
    sessionDuration: session?.label ?? String(patient.sessionDuration),
    modality: modality?.label ?? String(patient.modality),
    sex: sex?.label ?? String(patient.sex),
  };
}
