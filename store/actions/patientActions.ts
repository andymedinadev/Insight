import { patientSlice } from '@/store/slices/patientSlice';

export const { setSearchTerm, setFilterRangoEtario, setFilterGenero, setFilterModalidad } =
  patientSlice.actions;
