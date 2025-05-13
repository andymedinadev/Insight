import * as Yup from 'yup';

export const newPatientFormValidationSchema = Yup.object({
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
  typeOfIdentification: Yup.string().required('El tipo de documento es obligatorio'),
  identification: Yup.number().required('El número de documento es obligatorio'),
  sex: Yup.string().required('El género es obligatorio'),
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
  admissionDate: Yup.string().required('La fecha de ingreso es obligatoria'),
});
