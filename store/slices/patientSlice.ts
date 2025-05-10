// slices/patientSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPatient, deletePatient, fetchPatients, updatePatient } from '@/store/thunks';
import { mockMaterials, mockNotes } from '@/mocks';
import type { Material, Note, Patient } from '@/types';

interface PatientState {
  raw: Patient[]; // Pacientes originales recibidos
  list: Patient[]; // Pacientes transformados con mocks
  searchTerm: string;
  selected: Patient | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  filters: {
    rangoEtario: string[];
    genero: string[];
    modalidad: string[];
  };
}

const initialState: PatientState = {
  raw: [],
  list: [],
  searchTerm: '',
  selected: null,
  loading: false,
  error: null,
  initialized: false,
  filters: {
    modalidad: [],
    genero: [],
    rangoEtario: [],
  },
};

const addMockData = (paciente: Patient): Patient => ({
  ...paciente,
  notes: mockNotes,
  materials: mockMaterials,
});

export const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload.toLowerCase(); // normalizamos
    },
    setFilterRangoEtario(state, action: PayloadAction<string[]>) {
      state.filters.rangoEtario = action.payload;
    },
    setFilterGenero(state, action: PayloadAction<string[]>) {
      state.filters.genero = action.payload;
    },
    setFilterModalidad(state, action: PayloadAction<string[]>) {
      state.filters.modalidad = action.payload;
    },
    addNoteToPatient(state, action: PayloadAction<{ patientId: number; note: Note }>) {
      const { patientId, note } = action.payload;
      const patient = state.list.find((p) => p.id === patientId);
      if (patient) {
        if (!patient.notes) {
          patient.notes = [];
        }
        patient.notes.unshift(note);
      }
    },
    addMaterialToPatient(state, action: PayloadAction<{ patientId: number; material: Material }>) {
      const { patientId, material } = action.payload;
      const patient = state.list.find((p) => p.id === patientId);
      if (patient) {
        if (!patient.materials) {
          patient.materials = [];
        }
        patient.materials.unshift(material);
      }
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
        state.raw = action.payload;
        state.list = action.payload.map(addMockData);
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
