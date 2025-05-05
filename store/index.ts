import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import counterReducer from './slices/counterSlice';
import patientReducer from './slices/patientSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    patients: patientReducer,
  },
});

// Tipos para usar en componentes con TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
