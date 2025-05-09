import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { User } from '@/types/Profile/profileTypes';

export const getProfile = createAsyncThunk<User, void, { state: RootState; rejectValue: string }>(
  'profile/getProfile',
  async (_, thunkApi) => {
    const token = thunkApi.getState().auth.token;
    try {
      const res = await fetch('https://brave-generosity-production.up.railway.app/api/User/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al obtener perfil');
      }

      const data = await res.json();
      return data as User;
    } catch (error: unknown) {
      let message = 'Error desconocido al obtener perfil';
      if (error instanceof Error) {
        message = error.message;
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);
