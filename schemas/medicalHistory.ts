import * as Yup from 'yup';

export const medicalHistoryValidationSchema = Yup.object({
  title: Yup.string().required('El nombre es obligatorio'),
  date: Yup.date()
    .max(new Date(), 'La fecha no puede ser futura')
    .required('La fecha es obligatoria'),
});
