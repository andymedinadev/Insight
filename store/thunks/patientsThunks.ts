import { createAsyncThunk } from '@reduxjs/toolkit';

import { BACKEND_BASE_URL } from '@/config';
import type { RootState } from '@/store';
import { mapEditPatientToBackendPatient } from '@/utils';
import type { BackendPatient, BackendEditPatient, BackendNewPatient } from '@/types';

// Traer todos los pacientes
export const fetchPatients = createAsyncThunk<BackendPatient[], void, { rejectValue: string }>(
  'backendPatients/fetchPatients',
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;

    if (!token) {
      return thunkApi.rejectWithValue('Token no disponible');
    }

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/Patient/pacientes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/Patient/patients/archived`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/Patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/Patient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/Patient/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;

  const payload = mapEditPatientToBackendPatient(patient);

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/Patient/${patient.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
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
