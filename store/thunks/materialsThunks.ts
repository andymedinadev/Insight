import { createAsyncThunk } from '@reduxjs/toolkit';

import { BACKEND_BASE_URL } from '@/config';
import { mapExpressMaterialToBackendMaterial } from '@/utils';
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

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success || !Array.isArray(data.data)) {
      throw new Error(data?.message ?? 'Respuesta inválida del servidor');
    }

    return data.data.map(mapExpressMaterialToBackendMaterial);
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

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success || !data.data) {
      throw new Error(data?.message ?? 'Respuesta inválida del servidor');
    }

    return mapExpressMaterialToBackendMaterial(data.data);
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
      const payload = {
        title: materialData.title,
        content: materialData.content,
        creationDate: materialData.date,
      };

      const response = await fetch(`${BACKEND_BASE_URL}/api/patients/${patientId}/materials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success || !data.data) {
        throw new Error(data?.message ?? 'Error al crear el material');
      }

      return mapExpressMaterialToBackendMaterial(data.data);
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
    const payload = {
      title: materialData.title,
      content: materialData.content,
      creationDate: materialData.date,
    };

    const response = await fetch(
      `${BACKEND_BASE_URL}/api/patients/${patientId}/materials/${materialId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success || !data.data) {
      throw new Error(data?.message ?? 'Error al editar el material');
    }

    return mapExpressMaterialToBackendMaterial(data.data);
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

      const data = await response.json().catch(() => null);

      if (!response.ok || (data && data.success === false)) {
        throw new Error(data?.message ?? 'Error al eliminar el material');
      }

      return materialId;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});
