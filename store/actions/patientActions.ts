import { patientSlice } from '@/store/slices/patientSlice';

export const {
  addMaterialToPatient,
  addNoteToPatient,
  addToNewListDemo,
  setFilterGenero,
  setFilterModalidad,
  setFilterRangoEtario,
  setSearchTerm,
} = patientSlice.actions;
