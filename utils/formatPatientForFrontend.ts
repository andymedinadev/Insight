import { format, parseISO } from 'date-fns';

import { sessionOptions, modalityOptions, sexOptions } from '@/constants';
import { BackendPatient, FrontendPatient } from '@/types';

function formatValue(label?: string, raw?: string | number | null): string {
  return label ?? (raw != null ? String(raw) : '(vacío)');
}

export function formatPatientForFrontend(patient: BackendPatient): FrontendPatient {
  const session = sessionOptions.find((opt) => opt.value === patient.sessionDuration);
  const modality = modalityOptions.find((opt) => opt.value === patient.modality);
  const sex = sexOptions.find((opt) => opt.value === patient.sex);

  return {
    ...patient,
    birthdate: format(parseISO(patient.birthdate), 'dd/MM/yyyy'),
    admissionDate: format(parseISO(patient.admissionDate), 'dd/MM/yyyy'),
    sessionDuration: formatValue(session?.label, patient.sessionDuration),
    modality: formatValue(modality?.label, patient.modality),
    sex: formatValue(sex?.label, patient.sex),
  };
}
