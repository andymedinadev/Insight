import { createSlice } from '@reduxjs/toolkit';
import { updateProfile } from '@/store/thunks/profileThunk';

// Definir los tipos para el estado
interface User {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  avatarUrl: string;
}

interface ProfileState {
  user: User;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  user: {
    name: '',
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
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setAvatar, setUserField } = profileSlice.actions;
export default profileSlice.reducer;
