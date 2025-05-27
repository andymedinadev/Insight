// selectors/patientSelectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { HardcodedPatient, Patient } from '@/types';
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

// NUEVO SELECTOR PARA PODER FILTRAR EL NUEVO TIPO

// DATOS DEL STORE PARA EL SELECTOR COMBINADO
const selectNewListDemo = (state: RootState) => state.patients.newListDemo;
export const selectSearchTerm = (state: RootState) => state.patients.searchTerm.toLowerCase();
const selectModalidad = (state: RootState) => state.patients.filters.modalidad;
const selectGenero = (state: RootState) => state.patients.filters.genero;
const selectRangoEtario = (state: RootState) => state.patients.filters.rangoEtario;
const selectPatientList = (state: RootState) => state.patients.list;

// SELECTOR COMBINADO MEMOIZABLE
export const newSelectFilteredPatients = createSelector(
  [selectPatientList, selectSearchTerm, selectModalidad, selectGenero, selectRangoEtario],
  (patients, term, modalidad, genero, rangoEtario): Patient[] => {
    return patients.filter((patient: Patient) => {
      const matchesTerm = term === '' || patient.name.toLowerCase().includes(term);

      const modalidadPaciente = patient.modality;
      const matchesModalidad =
        modalidad.length === 0 || (modalidadPaciente && modalidad.includes(modalidadPaciente));

      const matchesGenero =
        genero.length === 0 || (patient.sex !== undefined && genero.includes(patient.sex));

      const matchesEdad = matchesRangoEtario(patient.birthdate, rangoEtario);

      return matchesTerm && matchesModalidad && matchesGenero && matchesEdad;
    });
  }
);
