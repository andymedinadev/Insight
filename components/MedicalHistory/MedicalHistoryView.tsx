import Image from 'next/image';
import Download from '../../public/icons/Download.svg';
import { Note } from '@/types';

interface Props {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

export default function MedicalHistoryView({ note, onEdit, onDelete }: Props) {
  return (
    <div className="px-4 pt-6 md:px-10 md:pt-10">
      <div className="flex justify-between md:flex-row md:items-center md:justify-between">
        <h1 className="mb-2 font-['Roboto'] text-2xl font-semibold text-black md:mb-0 md:text-3xl">
          {note?.title}
        </h1>

        <div className="flex space-x-4 md:items-center md:space-x-5">
          <button
            onClick={onEdit}
            className="cursor-pointer font-['Roboto'] text-sm font-semibold text-[#0655D5] underline md:text-base"
          >
            Editar
          </button>
          <button
            onClick={onDelete}
            className="cursor-pointer font-['Roboto'] text-sm font-semibold text-[#0655D5] underline md:text-base"
          >
            Borrar
          </button>
          <button className="cursor-pointer">
            <Image src={Download} alt="Descargar" width={24} height={24} />
          </button>
        </div>
      </div>
      <div className="mb-3 h-6 w-fit font-['Roboto'] text-sm text-[#000C21] md:mb-5 md:h-7 md:text-base">
        {note?.date}
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
