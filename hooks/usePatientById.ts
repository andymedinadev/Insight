import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';

import type { RootState } from '@/store';

export const usePatientById = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);
  const patientList = useSelector((state: RootState) => state.patients.list);

  const patient = isNaN(id) ? null : (patientList.find((p) => p.id === id) ?? null);

  return { patient, id };
};
