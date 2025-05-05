import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';

import { fetchPatientById } from '@/store/thunks';
import type { AppDispatch, RootState } from '@/store';

export const usePatientById = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const patient = useSelector((state: RootState) => state.patients.selected);
  const loading = useSelector((state: RootState) => state.patients.loading);
  const error = useSelector((state: RootState) => state.patients.error);
  const initialized = useSelector((state: RootState) => state.patients.initialized);

  useEffect(() => {
    if (id) {
      dispatch(fetchPatientById(id));
    }
  }, [id, dispatch]);

  return { patient, loading, error, initialized, id };
};
