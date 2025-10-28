import { createAsyncThunk } from '@reduxjs/toolkit';

import { BACKEND_BASE_URL } from '@/config';
import { mapEditPatientToBackendPatient, mapExpressPatientToBackendPatient } from '@/utils';
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

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success || !Array.isArray(data.data)) {
        throw new Error(data?.message ?? 'Respuesta inválida del servidor');
      }

      return data.data.map(mapExpressPatientToBackendPatient);
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

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success || !Array.isArray(data.data)) {
      throw new Error(data?.message ?? 'Respuesta inválida del servidor');
    }

    return data.data.map(mapExpressPatientToBackendPatient);
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

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success || !data.data) {
        throw new Error(data?.message ?? 'Respuesta inválida del servidor');
      }

      return mapExpressPatientToBackendPatient(data.data);
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

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
      const detail =
        (typeof data?.message === 'string' && data.message) ||
        (typeof data?.detail === 'string' && data.detail) ||
        'Error desconocido';
      return thunkApi.rejectWithValue({ detail });
    }

    return mapExpressPatientToBackendPatient(data.data);
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

    const data = await response.json().catch(() => null);

    if (!response.ok || (data && data.success === false)) {
      const message =
        (data && typeof data.message === 'string' && data.message) ||
        `Error HTTP ${response.status}`;
      throw new Error(message);
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

    const data = await response.json().catch(() => null);

    if (!response.ok || (data && data.success === false)) {
      if (data?.errors && typeof data.errors === 'object') {
        const errorMessages = Object.entries(data.errors)
          .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
          .join(' | ');
        return thunkApi.rejectWithValue(errorMessages);
      }

      const detail = data?.message ?? 'Error al editar el paciente.';
      return thunkApi.rejectWithValue(detail);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});
