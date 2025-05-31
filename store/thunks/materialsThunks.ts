import { createAsyncThunk } from '@reduxjs/toolkit';

import { BACKEND_BASE_URL } from '@/config';
import type { RootState } from '@/store';
import type { BackendMaterial } from '@/types';

// Traer todos los materiales de un paciente
export const fetchAllMaterials = createAsyncThunk<
  BackendMaterial[],
  number,
  { rejectValue: string }
>('backendPatients/fetchAllMaterials', async (patientId, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/Patient/${patientId}/materials`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});

// Traer un material de un paciente
export const fetchOneMaterial = createAsyncThunk<
  BackendMaterial,
  { patientId: number; materialId: number },
  { rejectValue: string }
>('backendPatients/fetchOneMaterial', async ({ patientId, materialId }, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;

  try {
    const response = await fetch(
      `${BACKEND_BASE_URL}/api/Patient/${patientId}/materials/${materialId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});

export interface CreateMaterialPayload {
  patientId: number;
  materialData: {
    title: string;
    content: string;
    date: string;
  };
}

// Crear un material para un paciente
export const createMaterial = createAsyncThunk<
  BackendMaterial,
  CreateMaterialPayload,
  { rejectValue: string }
>('backendPatients/createMaterial', async ({ patientId, materialData }, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;

  try {
    console.log('Datos enviados al backend:', materialData);
    const response = await fetch(`${BACKEND_BASE_URL}/api/Patient/${patientId}/materials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(materialData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});

// Editar material
export const editMaterial = createAsyncThunk<
  BackendMaterial,
  {
    patientId: number;
    materialId: number;
    materialData: { title: string; content: string; date: string };
  },
  { rejectValue: string }
>('backendPatients/editMaterial', async ({ patientId, materialId, materialData }, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;

  try {
    const response = await fetch(
      `${BACKEND_BASE_URL}/api/Patient/${patientId}/materials/${materialId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(materialData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});

export interface DeleteMaterialPayload {
  patientId: string;
  materialId: string;
}

//Eliminar material
export const deleteMaterial = createAsyncThunk<
  string,
  DeleteMaterialPayload,
  { rejectValue: string }
>('backendPatients/deleteMaterial', async ({ patientId, materialId }, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;

  try {
    const response = await fetch(
      `${BACKEND_BASE_URL}/api/Patient/${patientId}/materials/${materialId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return materialId;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});
