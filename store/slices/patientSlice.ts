// slices/patientSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockPatients } from '@/mocks';
let localMockPatients = [...mockPatients];

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

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async () => {
  try {
    console.log('Enviando petición...');

    const response = await fetch(
      'https://proyecto-foo-production.up.railway.app/api/Patient/pacientes',
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IlRFU1RUT0RBWSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXIyMjJAZXhhbXBsZS5jb20iLCJleHAiOjE3NDYyMjQ2MDAsImlzcyI6InlvdXJJc3N1ZXIiLCJhdWQiOiJ5b3VyQXVkaWVuY2UifQ.KT20sP3_6T6ecT0WY41_RPrE7XQDTp1jn0qzRKxcbt4`,
        },
      }
    );

    console.log('Respuesta recibida:', response);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Datos del backend:', data);

    return data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    console.warn('Fallo el backend, usando mocks:', message);

    return mockPatients;
  }
});

// borro
export const deletePatient = createAsyncThunk('patients/deletePatient', async (id: number) => {
  try {
    const response = await fetch(
      `https://proyecto-foo-production.up.railway.app/api/Patient/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IlRFU1RUT0RBWSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXIyMjJAZXhhbXBsZS5jb20iLCJleHAiOjE3NDYyMjQ2MDAsImlzcyI6InlvdXJJc3N1ZXIiLCJhdWQiOiJ5b3VyQXVkaWVuY2UifQ.KT20sP3_6T6ecT0WY41_RPrE7XQDTp1jn0qzRKxcbt4`,
        },
      }
    );

    if (!response.ok) throw new Error('Error al eliminar paciente');
    return id; // Devolvemos el ID para eliminarlo del estado
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    console.warn('Backend caído, borrando de mocks:', message);

    localMockPatients = localMockPatients.filter((p) => p.id !== id);
    return id;
  }
});

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
