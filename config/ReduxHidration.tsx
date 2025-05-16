import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPersistedState } from '@/store/slices/patientSlice';

export const ReduxHydration = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const serializedState = localStorage.getItem('patientState');
      if (serializedState) {
        const parsed = JSON.parse(serializedState);

        if (typeof parsed.initialized === 'boolean' && Array.isArray(parsed.newListDemo)) {
          dispatch(
            setPersistedState({
              initialized: parsed.initialized,
              newListDemo: parsed.newListDemo,
            })
          );
        }
      }
    } catch (e) {
      console.warn('Error al hidratar estado de pacientes desde localStorage:', e);
    }
  }, [dispatch]);

  return null;
};
