import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/store';

interface UserState {
  data: null | {
    id: number;
    identification: number;
    name: string;
    surname: string;
    email: string;
    phone: string | null;
    title: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) throw new Error('Token no disponible');

      const res = await fetch('https://proyecto-foo-production.up.railway.app/api/User/me', {
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
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error inesperado');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
