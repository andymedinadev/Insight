import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import type { RootState } from '@/store';

export const useBackPatientById = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);

  const patients = useSelector((state: RootState) => state.backendPatients.patients);
  console.log(patients);
  const patient = Number.isNaN(id) ? null : (patients.find((p) => p.id === id) ?? null);
  console.log(patient);
  return { patient, id };
};
