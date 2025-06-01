import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { clearSelectedPatient } from '@/store/slices/backendPatientsSlice';

export function useClearSelectedPatientOnUnmount(): void {
  const dispatch = useDispatch();

  // Limpiar paciente seleccionado al desmontar
  useEffect(() => {
    return () => {
      dispatch(clearSelectedPatient());
    };
  }, [dispatch]);
}
