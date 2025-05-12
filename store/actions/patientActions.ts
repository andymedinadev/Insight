import { patientSlice } from '@/store/slices/patientSlice';

export const {
  addMaterialToPatient,
  addNoteToPatient,
  addToNewListDemo,
  editNewTypePatient,
  setFilterGenero,
  setFilterModalidad,
  setFilterRangoEtario,
  setSearchTerm,
} = patientSlice.actions;
