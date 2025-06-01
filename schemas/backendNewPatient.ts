import * as Yup from 'yup';

import { BackendNewPatient } from '@/types';

export const initialValues: Omit<BackendNewPatient, 'birthdate' | 'sessionDay'> & {
  birthdate: string;
  sessionDay: string;
} = {
  userId: 0,
  name: '',
  surname: '',
  birthdate: '',
  nationality: '',
  typeOfIdentification: '',
  identification: '',
  sex: 'Masculino',
  email: '',
  phone: '',

  // Opcionales
  principalMotive: '',
  actualSymptoms: '',
  recentEvents: '',
  previousDiagnosis: '',

  profesionalObservations: '',
  keyWords: '',
  failedActs: '',
  interconsulation: '',
  patientEvolution: '',

  sessionDay: '',
  modality: null,
  sessionDuration: null,
  sessionFrequency: '',
  preferedContact: '',
};

export const backendNewPatientValidationSchema = Yup.object({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede superar los 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo permite letras, espacios y tildes'),

  surname: Yup.string()
    .required('El apellido es obligatorio')
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede superar los 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo permite letras, espacios y tildes'),

  birthdate: Yup.date()
    .required('La fecha de nacimiento es obligatoria')
    .max(new Date(), 'La fecha de nacimiento no puede ser futura'),

  nationality: Yup.string()
    .required('La nacionalidad es obligatoria')
    .min(4, 'La nacionalidad debe tener al menos 4 caracteres')
    .max(30, 'La nacionalidad no puede superar los 30 caracteres')
    .matches(/^[a-zA-Z\s]+$/, 'La nacionalidad solo permite letras y espacios'),

  typeOfIdentification: Yup.string()
    .required('El tipo de identificación es obligatorio')
    .max(50, 'El tipo de identificación no puede superar los 50 caracteres')
    .matches(/^[a-zA-Z\s]+$/, 'El tipo de identificación solo permite letras y espacios'),

  identification: Yup.string()
    .required('La identificación es obligatoria')
    .matches(/^[A-Za-z0-9-]+$/, 'La identificación solo puede contener letras, números y guiones')
    .min(9, 'La identificación debe tener al menos 9 dígitos')
    .max(20, 'La identificación no puede superar los 20 dígitos'),

  sex: Yup.string().required('El sexo es obligatorio'),

  email: Yup.string()
    .required('El correo electrónico es obligatorio')
    .email('Formato de correo no válido'),

  phone: Yup.string()
    .required('El número de teléfono es obligatorio')
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Formato de número de teléfono no válido'),

  // Opcionales
  principalMotive: Yup.string().nullable(),
  actualSymptoms: Yup.string().nullable(),
  recentEvents: Yup.string().nullable(),
  previousDiagnosis: Yup.string().nullable(),

  profesionalObservations: Yup.string().nullable(),
  keyWords: Yup.string().nullable(),
  failedActs: Yup.string().nullable(),
  interconsulation: Yup.string().nullable(),
  patientEvolution: Yup.string().nullable(),

  sessionDay: Yup.string().nullable(),
  modality: Yup.string().nullable(),
  sessionDuration: Yup.number()
    .nullable()
    .integer('La duración debe ser un número entero positivo')
    .min(0, 'La duración no puede ser negativa'),
  sessionFrequency: Yup.string().nullable(),
  preferedContact: Yup.string().nullable(),
});
