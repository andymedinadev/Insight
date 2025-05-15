import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import patientReducer from './slices/patientSlice';
import paginationReducer from './slices/paginationSlice';
import profileReducer from './slices/profileSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pagination: paginationReducer,
    patients: patientReducer,
    profile: profileReducer,
    user: userReducer,
  },
});

// Tipos para usar en componentes con TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
