import { createSlice } from '@reduxjs/toolkit';
import { getProfile } from '@/store/thunks/profileThunk';
import { updateProfile } from '@/store/thunks/updateThunk';
import type { User } from '@/types/Profile/profileTypes';

interface ErrorPayload {
  message: string;
  code?: number;
}

interface ProfileState {
  user: User;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | ErrorPayload | null;
}

const initialState: ProfileState = {
  user: {
    name: '',
    lastName: '',
    surname: '',
    email: '',
    phone: '',
    specialty: '',
    avatarUrl: '',
  },
  status: 'idle',
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.user.avatarUrl = action.payload;
    },
    setUserField: (state, action) => {
      const { field, value } = action.payload;
      if (field in state.user) {
        state.user[field as keyof User] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = 'failed';
        const errorPayload = action.payload;
        // Verificar el tipo de errorPayload correctamente
        if (typeof errorPayload === 'string') {
          // Si el payload es un string, envolverlo en un objeto con 'message'
          state.error = { message: errorPayload };
        } else if (errorPayload && typeof errorPayload === 'object' && 'message' in errorPayload) {
          // Si es un objeto con 'message', asignarlo
          state.error = errorPayload as ErrorPayload;
        } else {
          // Si no tiene 'message', asignar un mensaje por defecto
          state.error = { message: 'Hubo un problema al obtener el perfil' };
        }
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedUser = action.payload as User;
        state.user = updatedUser;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        const errorPayload = action.payload;
        // Verificar el tipo de errorPayload correctamente
        if (typeof errorPayload === 'string') {
          // Si el payload es un string, envolverlo en un objeto con 'message'
          state.error = { message: errorPayload };
        } else if (errorPayload && typeof errorPayload === 'object' && 'message' in errorPayload) {
          // Si es un objeto con 'message', asignarlo
          state.error = errorPayload as ErrorPayload;
        } else {
          // Si no tiene 'message', asignar un mensaje por defecto
          state.error = { message: 'Hubo un problema al actualizar el perfil' };
        }
      });
  },
});

export const { setAvatar, setUserField } = profileSlice.actions;
export default profileSlice.reducer;
