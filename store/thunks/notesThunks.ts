import { createAsyncThunk } from '@reduxjs/toolkit';

import { BACKEND_BASE_URL } from '@/config';
import type { RootState } from '@/store';
import type { BackendNote, CreateNotePayload, DeleteNotePayload } from '@/types';

// Traer todas las notas de un paciente
export const fetchAllNotes = createAsyncThunk<BackendNote[], number, { rejectValue: string }>(
  'backendPatients/fetchAllNotes',
  async (patientId, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/Patient/${patientId}/notes`, {
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
  }
);

// Traer una nota de un paciente
export const fetchOneNote = createAsyncThunk<
  BackendNote,
  { patientId: number; noteId: number },
  { rejectValue: string }
>('backendPatients/fetchOneNote', async ({ patientId, noteId }, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/Patient/${patientId}/notes/${noteId}`, {
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

// Crear una nota para un paciente
export const createNote = createAsyncThunk<BackendNote, CreateNotePayload, { rejectValue: string }>(
  'backendPatients/createNote',
  async ({ patientId, noteData }, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/Patient/${patientId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noteData),
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
  }
);

// Editar nota
export const editNote = createAsyncThunk<
  BackendNote,
  { patientId: number; noteId: number; noteData: { title: string; content: string; date: string } },
  { rejectValue: string }
>('backendPatients/editNote', async ({ patientId, noteId, noteData }, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/Patient/${patientId}/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(noteData),
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

//Eliminar nota
export const deleteNote = createAsyncThunk<string, DeleteNotePayload, { rejectValue: string }>(
  'backendPatients/deleteNote',
  async ({ patientId, noteId }, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/Patient/${patientId}/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      return noteId;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return thunkApi.rejectWithValue(message);
    }
  }
);
