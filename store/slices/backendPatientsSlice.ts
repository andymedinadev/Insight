import { createSlice } from '@reduxjs/toolkit';
import {
  createBackendPatient,
  fetchPatients,
  fetchArchivedPatients,
  fetchOnePatient,
  fetchAllNotes,
  fetchAllMaterials,
  fetchOneNote,
  fetchOneMaterial,
  createNote,
  createMaterial,
  deleteNote,
  deleteMaterial,
  editNote,
  editMaterial,
} from '@/store/thunks/backendPatientsThunks';
import type { BackendPatient, BackendMaterial, BackendNote } from '@/types';

type FetchStatus = {
  loading: boolean;
  error: string | null;
};

interface BackendPatientsState {
  patients: BackendPatient[];
  archivedPatients: BackendPatient[];
  selectedPatient: BackendPatient | null;
  searchTerm: string;

  notes: {
    all: BackendNote[];
    selected: BackendNote | null;
    status: {
      fetchAll: FetchStatus;
      fetchOne: FetchStatus;
      create: FetchStatus;
      delete: FetchStatus;
      edit: FetchStatus;
    };
  };

  materials: {
    all: BackendMaterial[];
    selected: BackendMaterial | null;
    status: {
      fetchAll: FetchStatus;
      fetchOne: FetchStatus;
      create: FetchStatus;
      delete: FetchStatus;
      edit: FetchStatus;
    };
  };

  status: {
    fetchPatients: FetchStatus;
    fetchArchived: FetchStatus;
    fetchOnePatient: FetchStatus;
    createPatient: FetchStatus;
  };

  filters: {
    creationDate: string[];
    modalidad: string[];
    genero: string[];
    rangoEtario: string[];
  };
}

const initialState: BackendPatientsState = {
  patients: [],
  archivedPatients: [],
  selectedPatient: null,
  searchTerm: '',

  notes: {
    all: [],
    selected: null,
    status: {
      fetchAll: {
        error: null,
        loading: false,
      },
      fetchOne: {
        error: null,
        loading: false,
      },
      create: {
        error: null,
        loading: false,
      },
      delete: { loading: false, error: null },
      edit: { loading: false, error: null },
    },
  },

  materials: {
    all: [],
    selected: null,
    status: {
      fetchAll: {
        error: null,
        loading: false,
      },
      fetchOne: {
        error: null,
        loading: false,
      },
      create: {
        error: null,
        loading: false,
      },
      delete: { loading: false, error: null },
      edit: { loading: false, error: null },
    },
  },

  status: {
    fetchPatients: {
      error: null,
      loading: false,
    },
    fetchArchived: {
      error: null,
      loading: false,
    },
    fetchOnePatient: {
      error: null,
      loading: false,
    },
    createPatient: {
      error: null,
      loading: false,
    },
  },

  filters: {
    creationDate: [],
    modalidad: [],
    genero: [],
    rangoEtario: [],
  },
};

export const backendPatientsSlice = createSlice({
  name: 'backendPatients',
  initialState,
  reducers: {
    clearSelectedPatient(state) {
      state.selectedPatient = null;
      state.status.fetchOnePatient = { loading: false, error: null };
    },
    clearSelectedNote(state) {
      state.notes.selected = null;
      state.notes.status.fetchOne = { loading: false, error: null };
    },
    clearSelectedMaterial(state) {
      state.materials.selected = null;
      state.materials.status.fetchOne = { loading: false, error: null };
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    resetSearchTerm(state) {
      state.searchTerm = '';
    },
    setCreationDateFilter(state, action) {
      state.filters.creationDate = action.payload;
    },
    resetCreationDateFilter(state) {
      state.filters.creationDate = [];
    },
    setModalidadFilter(state, action) {
      state.filters.modalidad = action.payload;
    },
    resetModalidadFilter(state) {
      state.filters.modalidad = [];
    },

    setGeneroFilter(state, action) {
      state.filters.genero = action.payload;
    },
    resetGeneroFilter(state) {
      state.filters.genero = [];
    },

    setRangoEtarioFilter(state, action) {
      state.filters.rangoEtario = action.payload;
    },
    resetRangoEtarioFilter(state) {
      state.filters.rangoEtario = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // TRAER TODOS LOS PACIENTES
      .addCase(fetchPatients.pending, (state) => {
        state.status.fetchPatients.loading = true;
        state.status.fetchPatients.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patients = action.payload;
        state.status.fetchPatients.loading = false;
        state.status.fetchPatients.error = null;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status.fetchPatients.loading = false;
        state.status.fetchPatients.error = action.payload || 'Error al obtener pacientes.';
      })

      // TRAER PACIENTES ARCHIVADOS
      .addCase(fetchArchivedPatients.pending, (state) => {
        state.status.fetchArchived.loading = true;
        state.status.fetchArchived.error = null;
      })
      .addCase(fetchArchivedPatients.fulfilled, (state, action) => {
        state.archivedPatients = action.payload;
        state.status.fetchArchived.loading = false;
        state.status.fetchArchived.error = null;
      })
      .addCase(fetchArchivedPatients.rejected, (state, action) => {
        state.status.fetchArchived.loading = false;
        state.status.fetchArchived.error =
          action.payload || 'Error al obtener pacientes archivados.';
      })

      // TRAER UN PACIENTE
      .addCase(fetchOnePatient.pending, (state) => {
        state.status.fetchOnePatient.loading = true;
        state.status.fetchOnePatient.error = null;
      })
      .addCase(fetchOnePatient.fulfilled, (state, action) => {
        state.selectedPatient = action.payload;
        state.status.fetchOnePatient.loading = false;
        state.status.fetchOnePatient.error = null;
      })
      .addCase(fetchOnePatient.rejected, (state, action) => {
        state.status.fetchOnePatient.loading = false;
        state.status.fetchOnePatient.error = action.payload || 'Error al obtener el paciente.';
      })

      // TRAER TODAS LAS NOTAS DE UN PACIENTE
      .addCase(fetchAllNotes.pending, (state) => {
        state.notes.status.fetchAll.loading = true;
        state.notes.status.fetchAll.error = null;
      })
      .addCase(fetchAllNotes.fulfilled, (state, action) => {
        state.notes.all = action.payload;
        state.notes.status.fetchAll.loading = false;
      })
      .addCase(fetchAllNotes.rejected, (state, action) => {
        state.notes.status.fetchAll.loading = false;
        state.notes.status.fetchAll.error = action.payload || 'Error al obtener las notas';
      })

      // TRAER TODOS LOS MATERIALES DE UN PACIENTE
      .addCase(fetchAllMaterials.pending, (state) => {
        state.materials.status.fetchAll.loading = true;
        state.materials.status.fetchAll.error = null;
      })
      .addCase(fetchAllMaterials.fulfilled, (state, action) => {
        state.materials.all = action.payload;
        state.materials.status.fetchAll.loading = false;
      })
      .addCase(fetchAllMaterials.rejected, (state, action) => {
        state.materials.status.fetchAll.loading = false;
        state.materials.status.fetchAll.error = action.payload || 'Error al obtener los materiales';
      })

      // TRAER UNA NOTA DE UN PACIENTE
      .addCase(fetchOneNote.pending, (state) => {
        state.notes.status.fetchOne.loading = true;
        state.notes.status.fetchOne.error = null;
      })
      .addCase(fetchOneNote.fulfilled, (state, action) => {
        state.notes.selected = action.payload;
        state.notes.status.fetchOne.loading = false;
      })
      .addCase(fetchOneNote.rejected, (state, action) => {
        state.notes.status.fetchOne.loading = false;
        state.notes.status.fetchOne.error = action.payload || 'Error al obtener la nota';
      })

      // TRAER UN MATERIAL DE UN PACIENTE
      .addCase(fetchOneMaterial.pending, (state) => {
        state.materials.status.fetchOne.loading = true;
        state.materials.status.fetchOne.error = null;
      })
      .addCase(fetchOneMaterial.fulfilled, (state, action) => {
        state.materials.selected = action.payload;
        state.materials.status.fetchOne.loading = false;
      })
      .addCase(fetchOneMaterial.rejected, (state, action) => {
        state.materials.status.fetchOne.loading = false;
        state.materials.status.fetchOne.error = action.payload || 'Error al obtener el material';
      })

      // CREAR UNA NOTA
      .addCase(createNote.pending, (state) => {
        if (!state.notes.status.create) {
          state.notes.status.create = { loading: true, error: null };
        } else {
          state.notes.status.create.loading = true;
          state.notes.status.create.error = null;
        }
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.all.push(action.payload);
        state.notes.status.create.loading = false;
        state.notes.status.create.error = null;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.notes.status.create.loading = false;
        state.notes.status.create.error = action.payload || 'Error al crear la nota';
      })

      // CREAR MATERIAL
      .addCase(createMaterial.pending, (state) => {
        if (!state.materials.status.create) {
          state.materials.status.create = { loading: true, error: null };
        } else {
          state.materials.status.create.loading = true;
          state.materials.status.create.error = null;
        }
      })
      .addCase(createMaterial.fulfilled, (state, action) => {
        state.materials.all.push(action.payload);
        state.materials.status.create.loading = false;
        state.materials.status.create.error = null;
      })
      .addCase(createMaterial.rejected, (state, action) => {
        state.materials.status.create.loading = false;
        state.materials.status.create.error = action.payload || 'Error al crear el material';
      })

      // ELIMINAR NOTA
      .addCase(deleteNote.pending, (state) => {
        state.notes.status.delete = { loading: true, error: null };
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes.all = state.notes.all.filter((note) => note.id !== +action.payload);
        state.notes.status.delete.loading = false;
        state.notes.status.delete.error = null;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.notes.status.delete.loading = false;
        state.notes.status.delete.error = action.payload || 'Error al eliminar la nota';
      })

      // ELIMINAR MATERIAL
      .addCase(deleteMaterial.pending, (state) => {
        state.materials.status.delete = { loading: true, error: null };
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.materials.all = state.materials.all.filter((mat) => mat.id !== +action.payload);
        state.materials.status.delete.loading = false;
        state.materials.status.delete.error = null;
      })
      .addCase(deleteMaterial.rejected, (state, action) => {
        state.materials.status.delete.loading = false;
        state.materials.status.delete.error = action.payload || 'Error al eliminar el material';
      })

      // EDITAR UNA NOTA
      .addCase(editNote.pending, (state) => {
        if (!state.notes.status.edit) {
          state.notes.status.edit = { loading: true, error: null };
        } else {
          state.notes.status.edit.loading = true;
          state.notes.status.edit.error = null;
        }
      })
      .addCase(editNote.fulfilled, (state, action) => {
        const index = state.notes.all.findIndex((note) => note.id === action.payload.id);
        if (index !== -1) {
          state.notes.all[index] = action.payload;
        }
        state.notes.status.edit.loading = false;
        state.notes.status.edit.error = null;
      })
      .addCase(editNote.rejected, (state, action) => {
        state.notes.status.edit.loading = false;
        state.notes.status.edit.error = action.payload || 'Error al editar la nota';
      })

      // EDITAR UN MATERIAL
      .addCase(editMaterial.pending, (state) => {
        if (!state.materials.status.edit) {
          state.materials.status.edit = { loading: true, error: null };
        } else {
          state.materials.status.edit.loading = true;
          state.materials.status.edit.error = null;
        }
      })
      .addCase(editMaterial.fulfilled, (state, action) => {
        const index = state.materials.all.findIndex(
          (material) => material.id === action.payload.id
        );
        if (index !== -1) {
          state.materials.all[index] = action.payload;
        }
        state.materials.status.edit.loading = false;
        state.materials.status.edit.error = null;
      })
      .addCase(editMaterial.rejected, (state, action) => {
        state.materials.status.edit.loading = false;
        state.materials.status.edit.error = action.payload || 'Error al editar el material';
      })

      // CREAR UN PACIENTE
      .addCase(createBackendPatient.pending, (state) => {
        state.status.createPatient.loading = true;
        state.status.createPatient.error = null;
      })
      .addCase(createBackendPatient.fulfilled, (state) => {
        state.status.createPatient.loading = false;
        state.status.createPatient.error = null;
      })
      .addCase(createBackendPatient.rejected, (state, action) => {
        state.status.createPatient.loading = false;
        if (action.payload && typeof action.payload === 'object' && 'detail' in action.payload) {
          state.status.createPatient.error = (action.payload as { detail: string }).detail;
        } else {
          state.status.createPatient.error = 'Error desconocido';
        }
      });
  },
});

export const {
  setCreationDateFilter,
  resetCreationDateFilter,
  setModalidadFilter,
  resetModalidadFilter,
  setGeneroFilter,
  resetGeneroFilter,
  setRangoEtarioFilter,
  resetRangoEtarioFilter,
} = backendPatientsSlice.actions;

export default backendPatientsSlice.reducer;
export const { setSearchTerm, resetSearchTerm } = backendPatientsSlice.actions;
