import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';

import type { RootState } from '@/store';

export const usePatientById = () => {
  const { id } = useParams<{ id: string }>();
  const { list: patientList } = useSelector((state: RootState) => state.patients);

  const patient = patientList.find((p) => p.id === Number(id));

  return { patient, id: Number(id) };
};
