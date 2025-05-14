// slices/patientSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPatient, deletePatient, fetchPatients, updatePatient } from '@/store/thunks';
import { mockMaterials, mockNotes, mockPatients, mockHardcodedPatients } from '@/mocks';
import type { HardcodedPatient, Material, Note, Patient } from '@/types';

interface PatientState {
  raw: Patient[]; // Pacientes recibidos de backend
  list: Patient[]; // Pacientes recibidos y adaptados
  newListDemo: HardcodedPatient[]; // Pacientes full hardcodeados
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
  newListDemo: [],
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

// Toma un PACIENTE DE BACKEND y le llena las notas y materiales con mocks
const addMockData = (paciente: Patient): Patient => ({
  ...paciente,
  notes: mockNotes,
  materials: mockMaterials,
});

// Toma un PACIENTE MOCK y le llena las notas y materiales con mocks
const addHardcodedDemoData = (paciente: HardcodedPatient): HardcodedPatient => ({
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
    addToNewListDemo: (state, action: PayloadAction<HardcodedPatient>) => {
      state.newListDemo.unshift(action.payload);
    },
    toggleFiled(state, action: PayloadAction<number>) {
      const id = action.payload;
      const paciente = state.newListDemo.find((p) => p.id === id);
      if (paciente) {
        paciente.filed = !paciente.filed;
      }
    },
    editNewTypePatient(
      state,
      action: PayloadAction<{ patientId: number; data: Partial<HardcodedPatient> }>
    ) {
      const { patientId, data } = action.payload;

      const patient = state.newListDemo.find((p) => p.id === patientId);

      if (patient) {
        Object.assign(patient, data);
      }
    },
    addNoteToPatient(state, action: PayloadAction<{ patientId: number; note: Omit<Note, 'id'> }>) {
      const { patientId, note } = action.payload;

      const patient = state.newListDemo.find((p) => p.id === patientId);

      if (patient) {
        if (!patient.notes) {
          patient.notes = [];
        }

        const newNote: Note = {
          ...note,
          id: Date.now(),
        };

        patient.notes.unshift(newNote);
      }
    },
    addMaterialToPatient(
      state,
      action: PayloadAction<{ patientId: number; material: Omit<Material, 'id'> }>
    ) {
      const { patientId, material } = action.payload;

      const patient = state.newListDemo.find((p) => p.id === patientId);

      if (patient) {
        if (!patient.materials) {
          patient.materials = [];
        }

        const newMaterial: Material = {
          ...material,
          id: Date.now(),
        };

        patient.materials.unshift(newMaterial);
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
        // FUNCIONE O NO BACKEND, ESTA PROPIEDAD DEL ESTADO CONTIENE PACIENTES MOCKS
        state.newListDemo = mockHardcodedPatients.map(addHardcodedDemoData);
        state.initialized = true;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al obtener pacientes. Usando datos mock.';
        state.raw = mockPatients;
        state.list = mockPatients.map(addMockData);
        // FUNCIONE O NO BACKEND, ESTA PROPIEDAD DEL ESTADO CONTIENE PACIENTES MOCKS
        state.newListDemo = mockHardcodedPatients.map(addHardcodedDemoData);
        state.initialized = true;
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
