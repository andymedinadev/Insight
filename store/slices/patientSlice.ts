// slices/patientSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPatient, deletePatient, fetchPatients, fetchPatientById } from '@/store/thunks';
import type { Patient } from '@/types';

interface PatientState {
  list: Patient[];
  searchTerm: string;
  selected: Patient | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: PatientState = {
  list: [],
  searchTerm: '',
  selected: null,
  loading: false,
  error: null,
  initialized: false,
};

export const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload.toLowerCase(); // normalizamos
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al obtener pacientes';
      })

      .addCase(deletePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al eliminar paciente';
      })

      .addCase(createPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al crear paciente';
      })

      .addCase(fetchPatientById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientById.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.loading = false;
        state.initialized = true;
      })
      .addCase(fetchPatientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
        state.initialized = true;
      });
  },
});



export default patientSlice.reducer;
