import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import patientReducer from './slices/patientSlice';
import paginationReducer from './slices/paginationSlice';
import profileReducer from './slices/profileSlice';
import userReducer from './slices/userSlice';
import { persistPatientState } from '@/config';

const preloadedPatientsState = {
  initialized: false,
  newListDemo: [],
  raw: [],
  list: [],
  searchTerm: '',
  selected: null,
  loading: false,
  error: null,
  filters: {
    modalidad: [],
    genero: [],
    rangoEtario: [],
  },
};

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('patientState');

  if (saved) {
    try {
      const parsed = JSON.parse(saved);

      preloadedPatientsState.initialized = parsed.initialized || false;

      preloadedPatientsState.newListDemo = parsed.newListDemo || [];
    } catch (e) {
      console.error('Error al leer de localStorage:', e);
    }
  }
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pagination: paginationReducer,
    patients: patientReducer,
    profile: profileReducer,
    user: userReducer,
  },
  preloadedState: {
    patients: preloadedPatientsState,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistPatientState),
});

// Tipos para usar en componentes con TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
