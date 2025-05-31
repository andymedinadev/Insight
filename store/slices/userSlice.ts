import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '@/store/thunks';
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
