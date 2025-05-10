import { patientSlice } from '@/store/slices/patientSlice';

export const {
  addMaterialToPatient,
  addNoteToPatient,
  setFilterGenero,
  setFilterModalidad,
  setFilterRangoEtario,
  setSearchTerm,
} = patientSlice.actions;
