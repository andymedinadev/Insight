import { EditPatient, HardcodedPatient } from '@/types';

export function hardcodedToEditPatient(patient: HardcodedPatient): EditPatient {
  const {
    id,
    name,
    surname,
    birthdate,
    nationality,
    typeOfIdentification,
    identification,
    sex,
    email,
    phone,
    admissionDate,
    motivosConsulta,
    historiaClinica,
    seguimiento,
  } = patient;

  return {
    id,
    name,
    surname,
    birthdate,
    nationality,
    typeOfIdentification,
    identification,
    sex,
    email,
    phone,
    admissionDate,
    motivosConsulta,
    historiaClinica,
    seguimiento,
  };
}
