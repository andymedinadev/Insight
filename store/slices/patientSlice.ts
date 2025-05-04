// slices/patientSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Patient } from '@/types';
import { TypeNewPatient } from '@/types';

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

export const fetchPatients = createAsyncThunk<Patient[], void, { rejectValue: string }>(
  'patients/fetchPatients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://proyecto-foo-production.up.railway.app/api/Patient/pacientes',
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IlRFU1RUT0RBWSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXIyMjJAZXhhbXBsZS5jb20iLCJleHAiOjE3NDYzMzAzMjMsImlzcyI6InlvdXJJc3N1ZXIiLCJhdWQiOiJ5b3VyQXVkaWVuY2UifQ._2p2eVimkxZp8gHTGYVUWtSRw2uVl_TivdS4-GiavKE`,
          },
        }
      );

      console.log('Respuesta recibida:', response);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return rejectWithValue(message);
    }
  }
);

// borro
export const deletePatient = createAsyncThunk<number, number, { rejectValue: string }>(
  'patients/deletePatient',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://proyecto-foo-production.up.railway.app/api/Patient/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IlRFU1RUT0RBWSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXIyMjJAZXhhbXBsZS5jb20iLCJleHAiOjE3NDYzMzAzMjMsImlzcyI6InlvdXJJc3N1ZXIiLCJhdWQiOiJ5b3VyQXVkaWVuY2UifQ._2p2eVimkxZp8gHTGYVUWtSRw2uVl_TivdS4-GiavKE`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al eliminar paciente: ${errorText}`);
      }

      return id;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return rejectWithValue(message);
    }
  }
);

//Crear paciente
export const createPatient = createAsyncThunk<Patient, TypeNewPatient, { rejectValue: string }>(
  'patients/createPatient',
  async (newPatient, { rejectWithValue }) => {
    try {
      console.log(newPatient);
      const response = await fetch('https://proyecto-foo-production.up.railway.app/api/Patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IlRFU1RUT0RBWSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXIyMjJAZXhhbXBsZS5jb20iLCJleHAiOjE3NDYzMzAzMjMsImlzcyI6InlvdXJJc3N1ZXIiLCJhdWQiOiJ5b3VyQXVkaWVuY2UifQ._2p2eVimkxZp8gHTGYVUWtSRw2uVl_TivdS4-GiavKE`,
        },
        body: JSON.stringify(newPatient),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al crear paciente: ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return rejectWithValue(message);
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
      });
  },
});

export default patientSlice.reducer;
