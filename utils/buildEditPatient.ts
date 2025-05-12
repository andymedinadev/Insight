import { NewPatient } from '@/types';

export function buildEditPatient(values: NewPatient, id: number): NewPatient {
  const newPatient: NewPatient = {
    id,
    name: values.name,
    surname: values.surname,
    birthdate: values.birthdate,
    nationality: values.nationality,
    typeOfIdentification: values.typeOfIdentification,
    identification: values.identification,
    sex: values.sex,
    email: values.email,
    phone: values.phone,
    admissionDate: values.admissionDate,
  };

  if (
    values.motivosConsulta &&
    Object.values(values.motivosConsulta).some((v) => v !== undefined && v !== '')
  ) {
    newPatient.motivosConsulta = { ...values.motivosConsulta };
  }

  if (
    values.historiaClinica &&
    Object.values(values.historiaClinica).some((v) => v !== undefined && v !== '')
  ) {
    newPatient.historiaClinica = { ...values.historiaClinica };
  }

  if (
    values.seguimiento &&
    Object.values(values.seguimiento).some((v) => v !== undefined && v !== '')
  ) {
    newPatient.seguimiento = { ...values.seguimiento };
  }

  return newPatient;
}
