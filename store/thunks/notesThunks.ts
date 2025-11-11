import { createAsyncThunk } from '@reduxjs/toolkit';

import { mockApi } from '@/mocks/mockBackend';
import type { BackendNote, CreateNotePayload, DeleteNotePayload } from '@/types';

// Traer todas las notas de un paciente
export const fetchAllNotes = createAsyncThunk<BackendNote[], number, { rejectValue: string }>(
  'backendPatients/fetchAllNotes',
  async (patientId, thunkApi) => {
    try {
      return await mockApi.notes.list(patientId);
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
    return await mockApi.notes.get(patientId, noteId);
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
      return await mockApi.notes.create(patientId, noteData);
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
    return await mockApi.notes.update(patientId, noteId, noteData);
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
      const numericPatientId = Number(patientId);
      const numericNoteId = Number(noteId);

      await mockApi.notes.remove(numericPatientId, numericNoteId);

      return noteId;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return thunkApi.rejectWithValue(message);
    }
  }
);
