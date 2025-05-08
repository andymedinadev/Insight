// selectors/patientSelectors.ts
import { RootState } from '@/store';
import { Patient } from '@/types';
import { matchesRangoEtario } from '@/utils/filterHelpers';

export const selectFilteredPatients = (state: RootState): Patient[] => {
  const term = state.patients.searchTerm.toLowerCase();
  const modalidad = state.patients.filters.modalidad;
  const genero = state.patients.filters.genero;
  const rangoEtario = state.patients.filters.rangoEtario;

  return state.patients.list.filter((patient: Patient) => {
    const matchesTerm = term === '' || patient.name.toLowerCase().includes(term);

    const matchesModalidad = modalidad.length === 0 || modalidad.includes(patient.modality);

    const matchesGenero = genero.length === 0 || genero.includes(patient.sex);

    const matchesEdad = matchesRangoEtario(patient.birthdate, rangoEtario);

    return matchesTerm && matchesModalidad && matchesGenero && matchesEdad;
  });
};
