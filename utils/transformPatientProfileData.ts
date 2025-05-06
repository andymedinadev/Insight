import { Patient } from '@/types';

// Esto es lo que tengo que devolver según diseño
interface PatientProfileData {
  fullName: string;
  age: number;
  birthdate: string;
  sex: 'Masculino' | 'Femenino' | 'Otros';
  email: string;
  phone: string;
  modality: string;
  admissionDate: string;
}

function formatBirthdate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '10/10/1992';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function mockAdmissionDate(): string {
  const year = new Date().getFullYear() - 2;
  const month = Math.floor(Math.random() * 12); // 0-11
  const day = Math.floor(Math.random() * 28) + 1;

  const fakeDate = new Date(year, month, day);

  const dayStr = String(fakeDate.getDate()).padStart(2, '0');
  const monthStr = String(fakeDate.getMonth() + 1).padStart(2, '0');
  return `${dayStr}/${monthStr}/${year}`;
}

function calcularEdad(fechaNacimiento: string): number {
  const nacimiento = new Date(fechaNacimiento);
  if (isNaN(nacimiento.getTime())) return 32;

  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mesDiferencia = hoy.getMonth() - nacimiento.getMonth();

  if (mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}

function obtenerGenero(genero: 'M' | 'F' | 'O'): 'Masculino' | 'Femenino' | 'Otros' {
  const mapa = {
    M: 'Masculino',
    F: 'Femenino',
    O: 'Otros',
  } as const;

  return mapa[genero];
}

export function transformPatientProfileData(patient: Patient) {
  const PatientProfileData: PatientProfileData = {
    fullName: `${patient.name} ${patient.surname}`,
    age: patient.age ?? calcularEdad(patient.birthdate),
    birthdate: formatBirthdate(patient.birthdate),
    sex: obtenerGenero(patient.sex as 'M' | 'F' | 'O'),
    email: patient.email ?? 'Sin email',
    phone: patient.phone ?? 'Sin número',
    modality: patient.modality ?? 'Presencial',
    admissionDate: patient.admissionDate ?? mockAdmissionDate(),
  };

  return PatientProfileData;
}
