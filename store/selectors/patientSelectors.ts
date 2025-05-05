import { RootState } from '@/store';

export const selectFilteredPatients = (state: RootState) => {
  const term = state.patients.searchTerm;
  return state.patients.list.filter(
    (p) => p.name.toLowerCase().includes(term) || p.email?.toLowerCase().includes(term)
  );
};
