import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import paginationReducer from './slices/paginationSlice';
import profileReducer from './slices/profileSlice';
import userReducer from './slices/userSlice';
import backendPatientsReducer from './slices/backendPatientsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pagination: paginationReducer,
    profile: profileReducer,
    user: userReducer,
    backendPatients: backendPatientsReducer,
  },
});

// Tipos para usar en componentes con TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
