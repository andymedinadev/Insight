'use client';

import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { InputField } from '@/components';
import { useBackendPatientById } from '@/hooks';
import { medicalHistoryValidationSchema } from '@/schemas';
import { createNote, createMaterial } from '@/store/thunks';
import { BackendNote } from '@/types';
import { AppDispatch } from '@/store';

type Props = {
  onSaved: () => void;
  goBack: () => void;
};

type BackendNotePayload = {
  title: string;
  date: string;
  content: string;
  patientId: number;
};

export default function MedicalHistoryNew({ onSaved, goBack }: Props) {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const isMaterial = from === 'material';

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useBackendPatientById();

  const initialValues: BackendNote = {
    id: 0,
    title: '',
    creationDate: '',
    content: '',
    patientId: id,
  };

  const formik = useFormik<BackendNote>({
    initialValues,
    validationSchema: medicalHistoryValidationSchema,
    onSubmit: async (values) => {
      const newNote: Omit<BackendNotePayload, 'id'> = {
        content: values.content,
        date: new Date(values.creationDate).toISOString(),
        title: values.title,
        patientId: id,
      };

      onSaved();

      if (isMaterial) {
        await dispatch(createMaterial({ patientId: id, materialData: newNote }));
      } else {
        await dispatch(createNote({ patientId: id, noteData: newNote }));
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
            id="creationDate"
            label="Fecha de la sesión"
            type="date"
            value={formik.values.creationDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            hasError={formik.touched.creationDate && Boolean(formik.errors.creationDate)}
            errorMessage={formik.touched.creationDate ? formik.errors.creationDate : undefined}
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

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-[#0655D5] font-['Roboto'] text-base leading-normal font-semibold text-white shadow-[0px_4px_8px_-2px_rgba(0,0,0,0.04),_0px_2px_4px_-2px_rgba(0,0,0,0.08)] md:w-28"
          >
            Guardar
          </button>

          <button
            type="button"
            onClick={() => goBack()}
            className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg font-['Roboto'] text-base leading-normal font-semibold text-[#0655D5] underline md:w-28"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
