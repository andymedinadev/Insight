// slices/patientSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPatient, deletePatient, fetchPatients, updatePatient } from '@/store/thunks';
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
      // TRAER TODOS LOS PACIENTES
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

      // ELIMINAR UN PACIENTE
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

      // CREAR UN PACIENTE
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

      // ACTUALIZAR UN PACIENTE
      .addCase(updatePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error desconocido';
      });
  },
});

export default patientSlice.reducer;
