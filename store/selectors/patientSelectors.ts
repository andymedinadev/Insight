// selectors/patientSelectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { HardcodedPatient, Patient } from '@/types';

// 👇 Funciones auxiliares para calcular edad y rango etario
function calcularEdad(fechaNacimiento: string): number {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

function obtenerRangoEtario(edad: number): string {
  if (edad <= 12) return 'Niño';
  if (edad >= 13 && edad <= 17) return 'Adolescente';
  return 'Adulto';
}

// 👇 Función de filtro por rango etario calculado
function matchesRangoEtario(birthdate: string | undefined, filtros: string[]): boolean {
  if (!birthdate) return false;
  if (filtros.length === 0) return true;

  const edad = calcularEdad(birthdate);
  const rango = obtenerRangoEtario(edad);
  return filtros.includes(rango);
}

// ✅ SELECTOR PARA PACIENTES DEL STATE ORIGINAL
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

// 🧠 NUEVO SELECTOR MEMOIZABLE PARA COMBINAR CON LISTA EXTERNA
const selectNewListDemo = (state: RootState) => state.patients.newListDemo;
export const selectSearchTerm = (state: RootState) =>
  state.backendPatients.searchTerm.toLowerCase();
const selectModalidad = (state: RootState) => state.patients.filters.modalidad;
const selectGenero = (state: RootState) => state.patients.filters.genero;
const selectRangoEtario = (state: RootState) => state.patients.filters.rangoEtario;

export const newSelectFilteredPatients = createSelector(
  [selectNewListDemo, selectSearchTerm, selectModalidad, selectGenero, selectRangoEtario],
  (patients, term, modalidad, genero, rangoEtario): HardcodedPatient[] => {
    return patients.filter((patient: HardcodedPatient) => {
      const matchesTerm = term === '' || patient.name.toLowerCase().includes(term);

      const modalidadPaciente = patient.seguimiento?.modalidad;
      const matchesModalidad =
        modalidad.length === 0 || (modalidadPaciente && modalidad.includes(modalidadPaciente));

      const matchesGenero =
        genero.length === 0 || (patient.sex !== undefined && genero.includes(patient.sex));

      const matchesEdad = matchesRangoEtario(patient.birthdate, rangoEtario);

      return matchesTerm && matchesModalidad && matchesGenero && matchesEdad;
    });
  }
);
