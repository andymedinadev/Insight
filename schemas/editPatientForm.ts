import * as Yup from 'yup';

export const editPatientFormValidationSchema = Yup.object({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .matches(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]+$/, 'El nombre solo puede contener letras')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  surname: Yup.string()
    .required('El apellido es obligatorio')
    .matches(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]+$/, 'El apellido solo puede contener letras')
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede tener más de 50 caracteres'),
  birthdate: Yup.date()
    .max(new Date(), 'La fecha de nacimiento no puede ser futura')
    .required('La fecha de nacimiento es obligatoria'),
  nationality: Yup.string()
    .required('La nacionalidad es obligatoria')
    .matches(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]+$/, 'La nacionalidad solo puede contener letras')
    .min(2, 'La nacionalidad debe tener al menos 2 caracteres')
    .max(50, 'La nacionalidad no puede tener más de 50 caracteres'),
  typeOfIdentification: Yup.string()
    .required('El tipo de identificación es obligatorio')
    .max(50, 'El tipo de identificación no puede superar los 50 caracteres')
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      'El tipo de identificación solo permite letras y espacios'
    ),
  identification: Yup.string()
    .required('La identificación es obligatoria')
    .matches(/^[A-Za-z0-9-]+$/, 'La identificación solo puede contener letras, números y guiones')
    .min(9, 'La identificación debe tener al menos 9 caracteres')
    .max(20, 'La identificación no puede superar los 20 caracteres'),
  email: Yup.string()
    .required('El correo electrónico es obligatorio')
    .email('Debe ser un correo electrónico válido')
    .max(254, 'El correo no puede tener más de 254 caracteres'),
  phone: Yup.string()
    .required('El número de celular es obligatorio')
    .min(7, 'El número de celular debe tener al menos 7 caracteres')
    .matches(
      /^\+?\d{7,15}$/,
      'El número de celular debe contener solo números y puede incluir un "+" al inicio'
    )
    .max(15, 'El número de celular no puede tener más de 15 dígitos'),
  admissionDate: Yup.date()
    .required('La fecha de ingreso es obligatoria')
    .max(new Date(), 'La fecha de ingreso no puede ser futura'),

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
  sessionDuration: Yup.string().nullable(),
  sessionFrequency: Yup.string().nullable(),
  preferedContact: Yup.string().nullable(),
});
