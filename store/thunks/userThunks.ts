import { createAsyncThunk } from '@reduxjs/toolkit';

import { BACKEND_BASE_URL } from '@/config';
import type { RootState } from '@/store';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, thunkApi) => {
  try {
    const state = thunkApi.getState() as RootState;
    const token = state.auth.token;

    if (!token) throw new Error('Token no disponible');

    const res = await fetch(`${BACKEND_BASE_URL}/api/User/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.message || 'Error al obtener el usuario');
    }

    return await res.json();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});

interface UpdateUserPayload {
  nombre: string;
  email: string;
  titulo: string;
}

export const updateUser = createAsyncThunk<void, UpdateUserPayload, { state: RootState }>(
  'user/updateUser',
  async (userData, thunkApi) => {
    const token = thunkApi.getState().auth.token;

    if (!token) {
      return thunkApi.rejectWithValue('Token no disponible');
    }

    const [name, surname = ''] = userData.nombre.trim().split(' ');

    try {
      const res = await fetch(`${BACKEND_BASE_URL}/api/User/me/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          surname,
          email: userData.email,
          title: userData.titulo,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || 'Error al guardar cambios');
      }

      thunkApi.dispatch(fetchUser());
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return thunkApi.rejectWithValue(message);
    }
  }
);
