import { RootState } from '@/store';

export const selectFilteredPatients = (state: RootState) => {
  const term = state.patients.searchTerm ?? '';
  return state.patients.list.filter((patient) =>
    (patient.name ?? '').toLowerCase().includes(term.toLowerCase())
  );
};
