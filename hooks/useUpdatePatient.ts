import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { updatePatient } from '@/store/thunks';
import { PatientProfileData } from '@/types';
import { mapPatientProfileToUpdatePayload } from '@/utils';

export function useUpdatePatient() {
  const dispatch = useDispatch<AppDispatch>();

  const updatePatientData = async (id: string | number, data: PatientProfileData) => {
    const updatedPatient = mapPatientProfileToUpdatePayload(data);

    try {
      const resultAction = await dispatch(updatePatient({ id, updatedPatient }));

      if (updatePatient.fulfilled.match(resultAction)) {
        console.log('Paciente actualizado exitosamente');
      } else {
        console.error('Error al actualizar paciente:', resultAction.payload);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
  };

  return { updatePatientData };
}
