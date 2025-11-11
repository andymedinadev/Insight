import { createAsyncThunk } from '@reduxjs/toolkit';

import { mapEditPatientToBackendPatient } from '@/utils';
import { mockApi } from '@/mocks/mockBackend';
import type { BackendPatient, BackendEditPatient, BackendNewPatient } from '@/types';

// Traer todos los pacientes
export const fetchPatients = createAsyncThunk<BackendPatient[], void, { rejectValue: string }>(
  'backendPatients/fetchPatients',
  async (_, thunkApi) => {
    try {
      return await mockApi.patients.list();
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
    return await mockApi.patients.listArchived();
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
      return await mockApi.patients.get(id);
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
    return await mockApi.patients.create(newPatient);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue({ detail: message });
  }
});

// Eliminar un paciente
export const deleteBackendPatient = createAsyncThunk<
  { id: number },
  number,
  { rejectValue: string }
>('backendPatients/deleteBackendPatient', async (id, thunkApi) => {
  try {
    await mockApi.patients.remove(id);
    return { id };
  } catch (error: unknown) {
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
    await mockApi.patients.update(payload);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});
