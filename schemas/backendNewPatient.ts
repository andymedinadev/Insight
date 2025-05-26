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
  sex: 'Masculino', // <- revisar
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
    .max(50, 'El nombre no puede superar los 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo permite letras, espacios y tildes'),

  surname: Yup.string()
    .required('El apellido es obligatorio')
    .max(50, 'El apellido no puede superar los 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo permite letras, espacios y tildes'),

  birthdate: Yup.date()
    .required('La fecha de nacimiento es obligatoria')
    .max(new Date(), 'La fecha de nacimiento no puede ser futura'),

  nationality: Yup.string()
    .required('La nacionalidad es obligatoria')
    .max(30, 'La nacionalidad no puede superar los 30 caracteres')
    .matches(/^[a-zA-Z\s]+$/, 'La nacionalidad solo permite letras y espacios'),

  typeOfIdentification: Yup.string()
    .required('El tipo de identificación es obligatorio')
    .max(50, 'El tipo de identificación no puede superar los 50 caracteres')
    .matches(/^[a-zA-Z\s]+$/, 'El tipo de identificación solo permite letras y espacios'),

  identification: Yup.string()
    .required('La identificación es obligatoria')
    .max(20, 'La identificación no puede superar los 20 caracteres')
    .matches(/^\d+$/, 'La identificación solo permite números'),

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

  sessionDay: Yup.date().nullable(),
  modality: Yup.string().nullable(),
  sessionDuration: Yup.number()
    .nullable()
    .integer('La duración debe ser un número entero positivo')
    .min(0, 'La duración no puede ser negativa'),
  sessionFrequency: Yup.string().nullable(),
  preferedContact: Yup.string().nullable(),
});
