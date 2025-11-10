import { createAsyncThunk } from '@reduxjs/toolkit';

import { mockApi } from '@/mocks/mockBackend';
import type { BackendMaterial, CreateMaterialPayload, DeleteMaterialPayload } from '@/types';

// Traer todos los materiales de un paciente
export const fetchAllMaterials = createAsyncThunk<
  BackendMaterial[],
  number,
  { rejectValue: string }
>('backendPatients/fetchAllMaterials', async (patientId, thunkApi) => {
  try {
    return await mockApi.materials.list(patientId);
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
    return await mockApi.materials.get(patientId, materialId);
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
    return await mockApi.materials.create(patientId, materialData);
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
    return await mockApi.materials.update(patientId, materialId, materialData);
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
    const numericPatientId = Number(patientId);
    const numericMaterialId = Number(materialId);

    await mockApi.materials.remove(numericPatientId, numericMaterialId);

    return materialId;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});
