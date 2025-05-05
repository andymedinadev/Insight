import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Patient, TypeNewPatient, UpdatePatientPayload } from '@/types';
import type { RootState } from '../index';

export const fetchPatients = createAsyncThunk<Patient[], void, { rejectValue: string }>(
  'patients/fetchPatients',
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;

    try {
      const response = await fetch(
        'https://proyecto-foo-production.up.railway.app/api/Patient/pacientes',
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

// borro
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

//Crear paciente
export const createPatient = createAsyncThunk<Patient, TypeNewPatient, { rejectValue: string }>(
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

// Traer un paciente
export const fetchPatientById = createAsyncThunk<Patient, string, { rejectValue: string }>(
  'pacientes/fetchPatientById',
  async (id: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;

    try {
      const response = await fetch(
        `https://proyecto-foo-production.up.railway.app/api/Patient/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

export const updatePatient = createAsyncThunk<
  boolean, // Tipo de respuesta
  { id: string | number; data: UpdatePatientPayload }, // Argumento de la acción con id y datos
  { rejectValue: string } // Valor en caso de error
>('patients/updatePatient', async ({ id, data }, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;

  try {
    const response = await fetch(
      `https://proyecto-foo-production.up.railway.app/api/Patient/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al editar paciente: ${errorText}`);
    }

    return true;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});
