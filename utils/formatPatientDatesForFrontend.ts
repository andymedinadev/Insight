import { format, parseISO } from 'date-fns';

import { BackendPatient } from '@/types';

export function formatPatientDatesForFrontend(patient: BackendPatient) {
  return {
    ...patient,
    birthdate: format(parseISO(patient.birthdate), 'dd/MM/yyyy'),
    admissionDate: format(parseISO(patient.admissionDate), 'dd/MM/yyyy'),
  };
}
