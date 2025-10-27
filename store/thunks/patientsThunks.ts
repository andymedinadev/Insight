import { createAsyncThunk } from '@reduxjs/toolkit';

import { BACKEND_BASE_URL } from '@/config';
import { mapEditPatientToBackendPatient } from '@/utils';
import type { BackendPatient, BackendEditPatient, BackendNewPatient } from '@/types';

// Traer todos los pacientes
export const fetchPatients = createAsyncThunk<BackendPatient[], void, { rejectValue: string }>(
  'backendPatients/fetchPatients',
  async (_, thunkApi) => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/patients`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Traer los pacientes archivados
export const fetchArchivedPatients = createAsyncThunk<
  BackendPatient[],
  void,
  { rejectValue: string }
>('backendPatients/fetchArchivedPatients', async (_, thunkApi) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/patients/archived`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});

// Traer un paciente
export const fetchOnePatient = createAsyncThunk<BackendPatient, number, { rejectValue: string }>(
  'backendPatients/fetchOnePatient',
  async (id, thunkApi) => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/patients/${id}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Crear un paciente
export const createBackendPatient = createAsyncThunk<
  BackendPatient,
  BackendNewPatient,
  { rejectValue: { detail: string } }
>('backendPatients/createBackendPatient', async (newPatient, thunkApi) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPatient),
    });

    if (!response.ok) {
      const errorJson = await response.json();
      return thunkApi.rejectWithValue(errorJson);
    }

    const data = await response.json();
    return data;
  } catch {
    return thunkApi.rejectWithValue({ detail: 'Error desconocido' });
  }
});

// Eliminar un paciente
export const deleteBackendPatient = createAsyncThunk<
  { id: number },
  number,
  { rejectValue: string }
>('backendPatients/deleteBackendPatient', async (id, thunkApi) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/patients/${id}`, {
      method: 'DELETE',
    });

    if (response.status !== 204) {
      const errorText = await response.text();
      throw new Error(`Error HTTP ${response.status}: ${errorText}`);
    }

    return { id };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});

// Editar un paciente
export const editBackendPatient = createAsyncThunk<
  void,
  BackendEditPatient,
  { rejectValue: string }
>('backendPatients/editBackendPatient', async (patient, thunkApi) => {
  const payload = mapEditPatientToBackendPatient(patient);

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/patients/${patient.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorBody = await response.json();

        if (errorBody?.errors && typeof errorBody.errors === 'object') {
          const errorMessages = Object.entries(errorBody.errors)
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
            .join(' | ');
          return thunkApi.rejectWithValue(errorMessages);
        }

        const detail = errorBody?.detail ?? 'Error de validación';
        return thunkApi.rejectWithValue(detail);
      }

      const errorText = await response.text();
      throw new Error(`Error HTTP ${response.status}: ${errorText}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});
