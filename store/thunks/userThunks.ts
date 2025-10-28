import { createAsyncThunk } from '@reduxjs/toolkit';

import { BACKEND_BASE_URL } from '@/config';
import type { UpdateUserPayload } from '@/types';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, thunkApi) => {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/api/users/me`, {
      headers: {
        'Content-Type': 'application/json',
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

export const updateUser = createAsyncThunk<void, UpdateUserPayload>(
  'user/updateUser',
  async (userData, thunkApi) => {
    const [name, surname = ''] = userData.nombre.trim().split(' ');

    try {
      const res = await fetch(`${BACKEND_BASE_URL}/api/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
