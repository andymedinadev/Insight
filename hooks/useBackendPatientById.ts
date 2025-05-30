import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks';
import { fetchOnePatient } from '@/store/thunks';
import { RootState } from '@/store';

export const useBackendPatientById = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);

  const dispatch = useAppDispatch();

  const patient = useSelector((state: RootState) => state.backendPatients.selectedPatient);

  const loading = useSelector(
    (state: RootState) => state.backendPatients.status.fetchOnePatient.loading
  );
  const error = useSelector(
    (state: RootState) => state.backendPatients.status.fetchOnePatient.error
  );

  useEffect(() => {
    if (!Number.isNaN(id)) {
      dispatch(fetchOnePatient(id));
    }
  }, [dispatch, id]);

  return { patient, id, loading, error };
};
