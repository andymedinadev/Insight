import { patientSlice } from '@/store/slices/patientSlice';

export const {
  deleteMaterialOfPatient,
  deleteNoteOfPatient,
  editMaterialOfPatient,
  editNoteOfPatient,
  addMaterialToPatient,
  addNoteToPatient,
  addToNewListDemo,
  editNewTypePatient,
  setFilterGenero,
  setFilterModalidad,
  setFilterRangoEtario,
  setSearchTerm,
  toggleFiled,
} = patientSlice.actions;
