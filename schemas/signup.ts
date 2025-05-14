import * as Yup from 'yup';

export const signupValidationSchema = Yup.object({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .matches(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]+$/, 'El nombre solo puede contener letras')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),

  lastname: Yup.string()
    .required('El apellido es obligatorio')
    .matches(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]+$/, 'El apellido solo puede contener letras')
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede tener más de 50 caracteres'),

  phone: Yup.string()
    .required('El teléfono es obligatorio')
    .matches(/^\d+$/, 'El teléfono debe contener solo números')
    .min(7, 'El teléfono debe tener al menos 7 dígitos')
    .max(15, 'El teléfono no puede tener más de 15 dígitos'),

  email: Yup.string()
    .required('El correo electrónico es obligatorio')
    .email('Debe ser un correo electrónico válido')
    .max(254, 'El correo no puede tener más de 254 caracteres'),

  password: Yup.string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(64, 'La contraseña no puede tener más de 64 caracteres')
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/\d/, 'Debe contener al menos un número')
    .matches(/[@$!%*?&]/, 'Debe contener al menos un carácter especial (@$!%*?&)'),

  repeatPassword: Yup.string()
    .required('Debes repetir la contraseña')
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
});
