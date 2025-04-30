import { SearchBar, FilterButton, PatientList, SeeMoreButton } from '@/components';

export default function CompletedList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="hidden lg:block">
          <h1 className="text-2xl font-bold text-black">Próximos pacientes</h1>
          <p className="text-base font-normal text-black">
            Aquí se visualizan los pacientes agendados del día...
          </p>
        </div>
        <div className="flex flex-row">
          <SearchBar />
          <FilterButton />
        </div>
      </div>
      <PatientList />
      <SeeMoreButton />
    </div>
  );
}
