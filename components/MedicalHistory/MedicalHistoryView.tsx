import Image from 'next/image';
import { format, parseISO } from 'date-fns';

import { EditBlue, TrashBlue } from '@/public';
import { BackendNote } from '@/types';

interface Props {
  note: BackendNote;
  onEdit: () => void;
  onDelete: () => void;
}

export default function MedicalHistoryView({ note, onEdit, onDelete }: Props) {
  return (
    <div className="px-4 pt-6 md:px-10 md:pt-10">
      <div className="flex justify-between md:flex-row md:items-center md:justify-between">
        <h1 className="mb-2 font-['Roboto'] text-2xl leading-9 font-semibold text-black md:mb-0">
          {note?.title}
        </h1>

        <div className="mr-5 flex space-x-7 md:items-center md:space-x-5">
          <button
            onClick={onEdit}
            className="cursor-pointer font-['Roboto'] text-sm font-semibold text-[#0655D5] underline md:text-base"
          >
            <Image
              src={EditBlue}
              width={26}
              height={22}
              alt="icono editar nota"
              className="md:hidden"
            />
            <Image
              src={EditBlue}
              width={32}
              height={28}
              alt="icono editar nota"
              className="hidden md:block"
            />
          </button>
          <button
            onClick={onDelete}
            className="cursor-pointer font-['Roboto'] text-sm font-semibold text-[#0655D5] underline md:text-base"
          >
            <Image
              src={TrashBlue}
              width={18}
              height={22}
              alt="icono borrar nota"
              className="md:hidden"
            />
            <Image
              src={TrashBlue}
              width={22}
              height={28}
              alt="icono borrar nota"
              className="hidden md:block"
            />
          </button>
        </div>
      </div>
      <div className="mb-3 h-6 w-fit font-['Roboto'] text-sm text-[#000C21] md:mb-5 md:h-7 md:text-base">
        {format(parseISO(note.creationDate), 'dd/MM/yyyy')}
      </div>
      <div>
        {note.content ? (
          <p className="text-sm leading-relaxed whitespace-pre-line text-black md:text-base">
            {note.content}
          </p>
        ) : (
          <p className="mb-5 text-center text-gray-500">(Nota vacía)</p>
        )}
      </div>
    </div>
  );
}
