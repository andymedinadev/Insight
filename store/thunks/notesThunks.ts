import { createAsyncThunk } from '@reduxjs/toolkit';

import { BACKEND_BASE_URL } from '@/config';
import { mapExpressNoteToBackendNote } from '@/utils';
import type { BackendNote, CreateNotePayload, DeleteNotePayload } from '@/types';

// Traer todas las notas de un paciente
export const fetchAllNotes = createAsyncThunk<BackendNote[], number, { rejectValue: string }>(
  'backendPatients/fetchAllNotes',
  async (patientId, thunkApi) => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/patients/${patientId}/notes`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success || !Array.isArray(data.data)) {
        throw new Error(data?.message ?? 'Respuesta inválida del servidor');
      }

      return data.data.map(mapExpressNoteToBackendNote);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Traer una nota de un paciente
export const fetchOneNote = createAsyncThunk<
  BackendNote,
  { patientId: number; noteId: number },
  { rejectValue: string }
>('backendPatients/fetchOneNote', async ({ patientId, noteId }, thunkApi) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/patients/${patientId}/notes/${noteId}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success || !data.data) {
      throw new Error(data?.message ?? 'Respuesta inválida del servidor');
    }

    return mapExpressNoteToBackendNote(data.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});

// Crear una nota para un paciente
export const createNote = createAsyncThunk<BackendNote, CreateNotePayload, { rejectValue: string }>(
  'backendPatients/createNote',
  async ({ patientId, noteData }, thunkApi) => {
    try {
      const payload = {
        title: noteData.title,
        content: noteData.content,
        creationDate: noteData.date,
      };

      const response = await fetch(`${BACKEND_BASE_URL}/api/patients/${patientId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success || !data.data) {
        throw new Error(data?.message ?? 'Error al crear la nota');
      }

      return mapExpressNoteToBackendNote(data.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Editar nota
export const editNote = createAsyncThunk<
  BackendNote,
  { patientId: number; noteId: number; noteData: { title: string; content: string; date: string } },
  { rejectValue: string }
>('backendPatients/editNote', async ({ patientId, noteId, noteData }, thunkApi) => {
  try {
    const payload = {
      title: noteData.title,
      content: noteData.content,
      creationDate: noteData.date,
    };

    const response = await fetch(`${BACKEND_BASE_URL}/api/patients/${patientId}/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success || !data.data) {
      throw new Error(data?.message ?? 'Error al editar la nota');
    }

    return mapExpressNoteToBackendNote(data.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});

//Eliminar nota
export const deleteNote = createAsyncThunk<string, DeleteNotePayload, { rejectValue: string }>(
  'backendPatients/deleteNote',
  async ({ patientId, noteId }, thunkApi) => {
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/api/patients/${patientId}/notes/${noteId}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok || (data && data.success === false)) {
        throw new Error(data?.message ?? 'Error al eliminar la nota');
      }

      return noteId;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return thunkApi.rejectWithValue(message);
    }
  }
);
