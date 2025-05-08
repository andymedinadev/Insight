import {
  SearchBar,
  FilterButton,
  PatientList,
  SeeMoreButton,
  AddPatientButton,
  ArchivedLink,
  PatientFilterDropdown,
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
          <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
            <div className="flex w-full flex-col items-center gap-2 lg:flex-row lg:justify-start">
              {variant === 'list' && (
                <>
                  <AddPatientButton />
                  <ArchivedLink />
                </>
              )}
            </div>

            <div className="flex flex-row items-center">
              <SearchBar />
              <FilterButton>
                <PatientFilterDropdown />
              </FilterButton>
            </div>
          </div>
        </div>
      )}

      <PatientList variant={variant} />

      {variant === 'home' ? <SeeMoreButton /> : null}
    </div>
  );
}
