import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateProfilePayload } from '@/types/Profile/profileTypes';

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (formData: UpdateProfilePayload, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Respuesta de error:', text);
        return rejectWithValue('No se pudo actualizar el perfil');
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error en la llamada:', error);
      return rejectWithValue('Error desconocido en la actualización del perfil');
    }
  }
);
