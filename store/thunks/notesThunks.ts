import { createAsyncThunk } from '@reduxjs/toolkit';

import { BACKEND_BASE_URL } from '@/config';
import type { RootState } from '@/store';
import type { BackendNote } from '@/types';

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

type AddNoteInput = {
  patientId: number;
  note: {
    title: string;
    content: string;
    date: string;
  };
};

// Crear una nota
export const addNoteToPatient = createAsyncThunk<
  BackendNote,
  AddNoteInput,
  { rejectValue: string }
>('backendPatients/addNoteToPatient', async ({ patientId, note }, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;

  const payload = {
    patientId,
    title: note.title,
    content: note.content,
    date: note.date,
  };

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/Patient/${patientId}/notes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.status !== 201) {
      const errorText = await response.text();
      throw new Error(`Error HTTP ${response.status}: ${errorText}`);
    }

    const backendResponse = await response.json();

    const adaptedNote: BackendNote = {
      id: backendResponse.id,
      patientId: backendResponse.patientId,
      title: backendResponse.title,
      content: backendResponse.content,
      creationDate: backendResponse.creationDate,
    };

    return adaptedNote;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});

// Borrar una nota
export const deleteNoteOfPatient = createAsyncThunk<
  { noteId: number },
  { patientId: number; noteId: number },
  { rejectValue: string }
>('backendPatients/deleteNoteOfPatient', async ({ patientId, noteId }, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/Patient/${patientId}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 204) {
      const errorText = await response.text();
      throw new Error(`Error HTTP ${response.status}: ${errorText}`);
    }

    return { noteId };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});

// Editar una nota
export const editNoteOfPatient = createAsyncThunk<
  BackendNote,
  { patientId: number; note: BackendNote },
  { rejectValue: string }
>('backendPatients/editNoteOfPatient', async ({ patientId, note }, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;

  const payload = {
    id: note.id,
    patientId,
    title: note.title,
    content: note.content,
    creationDate: note.creationDate,
    sessionDate: '',
    actualizationDate: '',
  };

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/Patient/${patientId}/notes/${note.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { patientNote } = data;

    const result: BackendNote = {
      id: patientNote.id,
      title: patientNote.id,
      content: patientNote.content,
      patientId: patientNote.patientId,
      creationDate: patientNote.creationDate,
    };

    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});
