import { calcularEdad, getRangoEtario } from '@/utils';
import { NewPatient, HardcodedPatient } from '@/types';

export function newPatientToHardcoded(patient: NewPatient): HardcodedPatient {
  const age = calcularEdad(patient.birthdate);
  const rangoEtario = getRangoEtario(age);

  const hardcodedPatient: HardcodedPatient = {
    ...patient,
    age,
    rangoEtario,
    lastSession: 'Sin sesiones',
    notes: [],
    materials: [],
    filed: false,
  };

  return hardcodedPatient;
}
