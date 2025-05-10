'use client';

import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { usePatientById } from '@/hooks';
import { addNoteToPatient } from '@/store/actions/patientActions';
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

const validationSchema = Yup.object({
  title: Yup.string().required('El nombre es obligatorio'),
  date: Yup.date()
    .max(new Date(), 'La fecha de la sesión no puede ser futura')
    .required('La fecha de la sesión es obligatoria'),
});

export default function MedicalHistoryNew({ onSaved }: Props) {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const isMaterial = from === 'material';

  // necesarios para guardar materiales/notas
  const dispatch = useDispatch();
  const { id } = usePatientById();

  const formik = useFormik<Note>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('Datos del formulario de notas:', values);

      const newNote: Note = {
        content: values.content,
        date: values.date,
        id: 500,
        title: values.title,
      };
      console.log(newNote);

      onSaved();

      // acá es cuando se guarda la nota en el store
      dispatch(addNoteToPatient({ patientId: id, note: newNote }));

      // así sería con los materiales
      // dispatch(addMaterialToPatient({ patientId: id, material: newMaterial  }));

      // try {
      //   const resultAction = await dispatch(createPatient(newPatient));

      //   if (createPatient.fulfilled.match(resultAction)) {
      //     router.push('/dashboard/patientlist');
      //   } else {
      //     console.error('Error al crear el paciente:', resultAction);
      //   }
      // } catch (error) {
      //   console.error('Error inesperado:', error);
      // }
    },
  });

  return (
    <div className="ml-2 max-w-xl p-8">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-1">
          <label className="text-Text-Strong/90 justify-start font-['Roboto'] text-base leading-normal font-normal">
            {isMaterial ? 'Nombre del material *' : 'Nombre de la nota *'}
          </label>
          <input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          ></input>
          {formik.touched.title && formik.errors.title && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.title}</p>
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-Text-Strong/90 justify-start font-['Roboto'] text-base leading-normal font-normal">
            Fecha de la sesión *
          </label>
          <span className="text-Text-Weak/60 justify-start self-stretch font-['Roboto'] text-sm leading-tight font-normal text-gray-500">
            (dd/mm/yyyy)
          </span>
          <input
            name="date"
            type="date"
            max={new Date().toISOString().split('T')[0]}
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          ></input>
          {formik.touched.date && formik.errors.date && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.date}</p>
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <label>Descripción</label>
          <textarea
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-96 w-[851px] rounded-lg border border-[#000D4D73] bg-white px-3"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="flex h-12 w-28 items-center justify-center rounded-lg bg-[#0655D5] font-['Roboto'] text-base leading-normal font-semibold text-white shadow-[0px_4px_8px_-2px_rgba(0,0,0,0.04),_0px_2px_4px_-2px_rgba(0,0,0,0.08)]"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
