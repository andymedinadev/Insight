import {
  SeeMoreButton,
  GoBackArchived,
  PatientListArchived,
  SearchBar,
  FilterButton,
  PatientFilterDropdown,
} from '@/components';

interface Props {
  variant?: 'home' | 'list';
}

export default function CompletedListArchived({ variant = 'home' }: Props) {
  return (
    <div className="space-y-4">
      {(variant === 'home' || variant === 'list') && (
        <div className="flex flex-col items-start justify-between gap-4 lg:mx-10 lg:flex-row lg:items-center">
          {variant === 'home' && (
            <div className="hidden lg:block lg:w-full">
              <h1 className="mb-2 text-3xl leading-[48px] font-semibold text-black">
                Próximos pacientes
              </h1>
              <p className="mb-8 text-base leading-normal font-normal text-black">
                Aquí visualizaras los pacientes del dia de hoy
              </p>
            </div>
          )}
          <div className="flex w-full flex-col items-center justify-between gap-2 lg:mb-1.5 lg:flex-row">
            <div className="flex w-full flex-col items-center gap-2 lg:flex-row lg:justify-start">
              <GoBackArchived />
            </div>
          </div>
          {variant === 'list' && (
            <div className="flex flex-row items-center">
              <div className="ml-4">
                <SearchBar />
              </div>

              <FilterButton>
                <PatientFilterDropdown />
              </FilterButton>
            </div>
          )}
        </div>
      )}

      <PatientListArchived variant={variant} />

      {variant === 'home' ? <SeeMoreButton /> : null}
    </div>
  );
}
