import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import patientReducer from './slices/patientSlice';
import paginationReducer from './slices/paginationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientReducer,
    pagination: paginationReducer,
  },
});

// Tipos para usar en componentes con TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
