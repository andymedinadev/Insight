import { createAsyncThunk } from '@reduxjs/toolkit';

import { BACKEND_BASE_URL } from '@/config';
import type { BackendMaterial, CreateMaterialPayload, DeleteMaterialPayload } from '@/types';

// Traer todos los materiales de un paciente
export const fetchAllMaterials = createAsyncThunk<
  BackendMaterial[],
  number,
  { rejectValue: string }
>('backendPatients/fetchAllMaterials', async (patientId, thunkApi) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/patients/${patientId}/materials`);

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
  try {
    const response = await fetch(
      `${BACKEND_BASE_URL}/api/patients/${patientId}/materials/${materialId}`
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

// Crear un material para un paciente
export const createMaterial = createAsyncThunk<
  BackendMaterial,
  CreateMaterialPayload,
  { rejectValue: string }
>('backendPatients/createMaterial', async ({ patientId, materialData }, thunkApi) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/patients/${patientId}/materials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
  try {
    const response = await fetch(
      `${BACKEND_BASE_URL}/api/patients/${patientId}/materials/${materialId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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

//Eliminar material
export const deleteMaterial = createAsyncThunk<
  string,
  DeleteMaterialPayload,
  { rejectValue: string }
>('backendPatients/deleteMaterial', async ({ patientId, materialId }, thunkApi) => {
  try {
    const response = await fetch(
      `${BACKEND_BASE_URL}/api/patients/${patientId}/materials/${materialId}`,
      {
        method: 'DELETE',
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
