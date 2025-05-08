'use client';
import FilterButton from '../FilterButton/FilterButton';
import SearchBar from '../SearchBar/SearchBar';
import { useSearchParams } from 'next/navigation';

export default function MedicalHistoryHeader() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const isMaterial = from === 'material';

  return (
    <div className="flex items-center justify-between px-10 py-10">
      <button className="font-body text-small leading-small h-[48px] w-auto rounded-[8px] border border-[#0655D5CC] bg-[#FFFFFF03] px-4 px-[Spacing/4] text-center font-semibold tracking-[0px] text-[#0655D5] shadow-[0px_4px_8px_-2px_#0000000A,0px_2px_4px_-2px_#00000014]">
        {isMaterial ? 'Agregar nuevo material' : 'Agregar nueva nota'}
      </button>

      <div className="flex items-center gap-2">
        <SearchBar />
        <FilterButton>
          <div>Aca va tu drop</div>
        </FilterButton>
      </div>
    </div>
  );
}
