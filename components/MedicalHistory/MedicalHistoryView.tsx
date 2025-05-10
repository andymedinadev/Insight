import Image from 'next/image';
import Download from '../../public/icons/Download.svg';
import { Note } from '@/types';

interface Props {
  note: Note;
}

export default function MedicalHistoryView({ note }: Props) {
  return (
    <div className="px-10 pt-10">
      <div className="flex items-center justify-between">
        <h1 className="font-['Roboto'] text-3xl leading-10 font-semibold text-black">
          {note?.title}
        </h1>

        <div className="flex items-center space-x-5">
          <button className="font-['Roboto'] text-base leading-normal font-semibold text-[#0655D5] underline">
            Editar
          </button>
          <button className="font-['Roboto'] text-base leading-normal font-semibold text-[#0655D5] underline">
            Borrar
          </button>
          <button>
            <Image src={Download} alt="Descargar" width={24} height={24} />
          </button>
        </div>
      </div>
      <div className="mb-5 h-7 w-24 font-['Roboto'] text-base leading-normal font-normal text-[#000C21]">
        {note?.date}
      </div>
      <div>
        {note.content ? (
          <p>{note.content}</p>
        ) : (
          <p className="mb-5 text-center text-gray-500">(Nota vacía)</p>
        )}
      </div>
    </div>
  );
}
