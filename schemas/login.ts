import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required('El correo electrónico es obligatorio')
    .email('Debe ser un correo electrónico válido')
    .max(254, 'El correo no puede tener más de 254 caracteres'),

  password: Yup.string().required('La contraseña es obligatoria'),
});
