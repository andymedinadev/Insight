import { normalizePatientAge } from '@/utils';

import { BackendPatient } from '@/types';

export function removePatientFromCollection(
  collection: BackendPatient[],
  id: number
): BackendPatient | null {
  const index = collection.findIndex((patient) => patient.id === id);

  if (index === -1) return null;

  const [removed] = collection.splice(index, 1);

  return removed;
}

export function updatePatientInCollection(
  collection: BackendPatient[],
  updated: BackendPatient
): boolean {
  const index = collection.findIndex((patient) => patient.id === updated.id);

  if (index === -1) return false;

  collection[index] = normalizePatientAge(updated);

  return true;
}
