import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { UpdateProfilePayload, User } from '@/types/Profile/profileTypes';

export const updateProfile = createAsyncThunk<
  User, // tipo que regresa
  UpdateProfilePayload, // tipo del argumento
  { state: RootState; rejectValue: string }
>('profile/updateProfile', async (updatedData, thunkApi) => {
  const state = thunkApi.getState();
  const token = state.auth.token;

  try {
    const response = await fetch(
      'https://brave-generosity-production.up.railway.app/api/User/update',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al actualizar perfil: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return thunkApi.rejectWithValue(message);
  }
});
