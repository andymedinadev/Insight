import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Patient, NewPatient, UpdatePatientPayload } from '@/types';
import type { RootState } from '../index';

// Traer todos los pacientes
export const fetchPatients = createAsyncThunk<Patient[], void, { rejectValue: string }>(
  'patients/fetchPatients',
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;

    try {
      const response = await fetch(
        'https://brave-generosity-production.up.railway.app/api/Patient/pacientes',
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Borrar un paciente
export const deletePatient = createAsyncThunk<number, number, { rejectValue: string }>(
  'patients/deletePatient',
  async (id, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;

    try {
      const response = await fetch(
        `https://proyecto-foo-production.up.railway.app/api/Patient/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
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
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Crear un paciente
export const createPatient = createAsyncThunk<Patient, NewPatient, { rejectValue: string }>(
  'patients/createPatient',
  async (newPatient, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;

    try {
      console.log(newPatient);
      const response = await fetch('https://proyecto-foo-production.up.railway.app/api/Patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Actualizar un paciente
export const updatePatient = createAsyncThunk<
  Patient,
  { id: string | number; updatedPatient: UpdatePatientPayload },
  { state: RootState; rejectValue: string }
>('patients/updatePatient', async ({ id, updatedPatient }, thunkApi) => {
  const state = thunkApi.getState();
  const token = state.auth.token;

  const currentPatient = state.patients.list.find((p) => p.id === id);

  if (!currentPatient) {
    return thunkApi.rejectWithValue('Paciente no encontrado en memoria');
  }

  const patientUpdatedLocally = { ...currentPatient, ...updatedPatient };

  try {
    const response = await fetch(
      `https://proyecto-foo-production.up.railway.app/api/Patient/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPatient),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al editar paciente: ${errorText}`);
    }

    return patientUpdatedLocally;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});
