'use client';

import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { useNewPatientById } from '@/hooks';
import { medicalHistoryValidationSchema } from '@/schemas';
import { editMaterialOfPatient, editNoteOfPatient } from '@/store/actions/patientActions';
import { Note /*, Material*/ } from '@/types';

type Props = {
  onSaved: () => void;
  note?: Note;
};

function convertToISO(dateString: string): string {
  // Si ya está en formato yyyy-mm-dd, lo devolvemos sin cambios
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  const [day, month, year] = dateString.split('/');
  if (!day || !month || !year) {
    console.warn('Formato de fecha inválido:', dateString);
    return dateString;
  }

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export default function MedicalHistoryEdit({ onSaved, note }: Props) {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const isMaterial = from === 'material';

  const dispatch = useDispatch();
  const { id } = useNewPatientById();

  const initialValues: Note = note || {
    id: 0,
    title: '',
    date: '',
    content: '',
  };

  const formattedNote = note
    ? {
        ...note,
        date: convertToISO(note.date),
      }
    : initialValues;

  const formik = useFormik<Note>({
    enableReinitialize: true,
    initialValues: formattedNote,
    validationSchema: medicalHistoryValidationSchema,
    onSubmit: async (values) => {
      const updatedNote: Note = {
        id: values.id,
        content: values.content,
        date: values.date,
        title: values.title,
      };

      onSaved();

      // Guardo la nota/material en el store
      if (isMaterial) {
        dispatch(editMaterialOfPatient({ patientId: id, material: updatedNote }));
      } else {
        dispatch(editNoteOfPatient({ patientId: id, note: updatedNote }));
      }
    },
  });

  return (
    <div className="ml-2 max-w-xl p-4 sm:p-6 md:p-8">
      <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
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
            className="h-46 w-full rounded-lg border border-[#000D4D73] bg-white px-3 lg:h-96 lg:w-[851px]"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center rounded-lg bg-[#0655D5] font-['Roboto'] text-base leading-normal font-semibold text-white shadow-[0px_4px_8px_-2px_rgba(0,0,0,0.04),_0px_2px_4px_-2px_rgba(0,0,0,0.08)] md:w-28"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
