import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import patientReducer from './slices/patientSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    patients: patientReducer,
  },
});

// Tipos para usar en componentes con TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
