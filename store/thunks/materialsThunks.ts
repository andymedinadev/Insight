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
