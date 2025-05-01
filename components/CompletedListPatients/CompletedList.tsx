import {
  SearchBar,
  FilterButton,
  PatientList,
  SeeMoreButton,
  AddPatientButton,
} from '@/components';

interface Props {
  variant?: 'home' | 'list';
}

export default function CompletedList({ variant = 'home' }: Props) {
  return (
    <div className="space-y-4">
      {(variant === 'home' || variant === 'list') && (
        <div className="flex flex-col items-start justify-between gap-4 lg:mx-10 lg:flex-row lg:items-center">
          {variant === 'home' && (
            <div className="hidden lg:block lg:w-full">
              <h1 className="mb-2 text-2xl font-bold text-black">Próximos pacientes</h1>
              <p className="mb-8 text-base font-normal text-black">
                Aquí se visualizan los pacientes agendados del día...
              </p>
            </div>
          )}
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="hidden lg:block">{variant === 'list' && <AddPatientButton />}</div>
            <div className="flex flex-row">
              <SearchBar />
              <FilterButton />
            </div>
          </div>
        </div>
      )}

      <PatientList variant={variant} />

      {variant === 'home' ? <SeeMoreButton /> : null}
    </div>
  );
}
