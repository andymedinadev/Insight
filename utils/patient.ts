import { calcularEdad, calcularRangoEtario } from '@/utils';

import { BackendPatient } from '@/types';

export function normalizePatientAge(patient: BackendPatient): BackendPatient {
  const age = calcularEdad(patient.birthdate);
  return {
    ...patient,
    age,
    rangoEtario: calcularRangoEtario(age),
  };
}
