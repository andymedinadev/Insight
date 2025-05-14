'use client';

import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { InputField } from '@/components';
import { useNewPatientById } from '@/hooks';
import { medicalHistoryValidationSchema } from '@/schemas';
import { addNoteToPatient, addMaterialToPatient } from '@/store/slices/patientSlice';
import { Note /*, Material*/ } from '@/types';

type Props = {
  onSaved: () => void;
};

const initialValues: Note = {
  id: 0,
  title: '',
  date: '',
  content: '',
};

export default function MedicalHistoryNew({ onSaved }: Props) {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const isMaterial = from === 'material';

  const dispatch = useDispatch();
  const { id } = useNewPatientById();

  const formik = useFormik<Note>({
    initialValues,
    validationSchema: medicalHistoryValidationSchema,
    onSubmit: async (values) => {
      console.log('Datos del formulario de notas:', values);

      const newNote: Omit<Note, 'id'> = {
        content: values.content,
        date: values.date,
        title: values.title,
      };

      onSaved();

      if (isMaterial) {
        dispatch(addMaterialToPatient({ patientId: id, material: newNote }));
      } else {
        dispatch(addNoteToPatient({ patientId: id, note: newNote }));
      }
    },
  });

  return (
    <div className="ml-2 max-w-xl p-4 sm:p-6 md:p-8">
      <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
        <div className="flex flex-col space-y-1">
          <InputField
            id="title"
            label={isMaterial ? 'Nombre del material' : 'Nombre de la nota'}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            hasError={formik.touched.title && Boolean(formik.errors.title)}
            errorMessage={formik.touched.title ? formik.errors.title : undefined}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <InputField
            id="date"
            label="Fecha de la sesión"
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            hasError={formik.touched.date && Boolean(formik.errors.date)}
            errorMessage={formik.touched.date ? formik.errors.date : undefined}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Descripción</label>
          <textarea
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-46 w-full rounded-lg border border-[#000D4D73] bg-white px-3 lg:h-96 lg:w-[851px]"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-[#0655D5] font-['Roboto'] text-base leading-normal font-semibold text-white shadow-[0px_4px_8px_-2px_rgba(0,0,0,0.04),_0px_2px_4px_-2px_rgba(0,0,0,0.08)] md:w-28"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
