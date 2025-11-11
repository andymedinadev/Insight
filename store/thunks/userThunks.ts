import { createAsyncThunk } from '@reduxjs/toolkit';

import { mockApi } from '@/mocks/mockBackend';
import type { RootState } from '@/store';
import type { UpdateUserPayload } from '@/types';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, thunkApi) => {
  try {
    return await mockApi.user.get();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});

export const updateUser = createAsyncThunk<void, UpdateUserPayload, { state: RootState }>(
  'user/updateUser',
  async (userData, thunkApi) => {
    const [name, surname = ''] = userData.nombre.trim().split(' ');

    try {
      await mockApi.user.update({
        name,
        surname,
        email: userData.email,
        title: userData.titulo,
      });
      thunkApi.dispatch(fetchUser());
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return thunkApi.rejectWithValue(message);
    }
  }
);
