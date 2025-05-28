import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
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
});
