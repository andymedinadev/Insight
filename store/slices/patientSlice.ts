// slices/patientSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Patient {
  id: number;
  name: string;
  surname: string;
  birthdate: string;
  identification: number;
  sex: string;
  email: string;
  phone: string;
  modality: string;
  admissionDate: string;
  diagnosis: string | null;
  institution: string | null;
  age: number;
  // Extra fields si hacen falta:
  lastSession?: string;
  category?: string;
}

interface PatientState {
  list: Patient[];
  loading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Enviando petición...');

      const response = await fetch(
        'https://proyecto-foo-production.up.railway.app/api/Patient/pacientes',
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IlRFU1RUT0RBWSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXIyMjJAZXhhbXBsZS5jb20iLCJleHAiOjE3NDYxMzk0NTEsImlzcyI6InlvdXJJc3N1ZXIiLCJhdWQiOiJ5b3VyQXVkaWVuY2UifQ.WIr6EgBZlJWoBGVEGKmRpBRe4hRmLYXyJlLwFYhfd_Q`,
          },
        }
      );

      console.log('Respuesta recibida:', response);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Datos recibidos:', data);

      return data;
    } catch (error: any) {
      console.error('Error al obtener pacientes:', error);
      return rejectWithValue(error.message || 'Error al obtener pacientes');
    }
  }
);

// borro
export const deletePatient = createAsyncThunk(
  'patients/deletePatient',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://proyecto-foo-production.up.railway.app/api/Patient/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IlRFU1RUT0RBWSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXIyMjJAZXhhbXBsZS5jb20iLCJleHAiOjE3NDYxMzk0NTEsImlzcyI6InlvdXJJc3N1ZXIiLCJhdWQiOiJ5b3VyQXVkaWVuY2UifQ.WIr6EgBZlJWoBGVEGKmRpBRe4hRmLYXyJlLwFYhfd_Q`,
          },
        }
      );

      if (!response.ok) throw new Error('Error al eliminar paciente');
      return id; // Devolvemos el ID para eliminarlo del estado
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      });
  },
});

export default patientSlice.reducer;
