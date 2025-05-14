'use client';
import FilterButton from '../FilterButton/FilterButton';
import SearchBar from '../SearchBar/SearchBar';
import { useSearchParams } from 'next/navigation';

type Props = {
  onAddNewNote: () => void;
};

export default function MedicalHistoryHeader({ onAddNewNote }: Props) {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const isMaterial = from === 'material';

  return (
    <div className="flex flex-col-reverse gap-4 px-4 pt-6 md:flex-row md:items-center md:justify-between md:px-10 md:pt-10">
      <button
        onClick={onAddNewNote}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#0655D5CC] bg-white/0 px-4 text-center font-sans text-base leading-normal font-semibold text-[#0655D5] shadow-[0px_4px_8px_-2px_rgba(0,0,0,0.04),0px_2px_4px_-2px_rgba(0,0,0,0.08)] md:w-auto"
      >
        {isMaterial ? '+ Agregar nuevo material' : '+ Agregar nueva nota'}
      </button>

      <div className="flex w-full items-center gap-2 md:w-auto">
        <SearchBar />
        <FilterButton>
          <div>Aca va tu drop</div>
        </FilterButton>
      </div>
    </div>
  );
}
