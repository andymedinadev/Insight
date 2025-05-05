import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/store';
import { updatePatient, fetchPatientById } from '@/store/thunks';
import { UpdatePatientPayload } from '@/types';

export function useUpdatePatient() {
  const dispatch = useDispatch<AppDispatch>();

  const updatePatientData = async (id: string | number, data: UpdatePatientPayload) => {
    try {
      const resultAction = await dispatch(updatePatient({ id, data }));

      if (updatePatient.fulfilled.match(resultAction)) {
        console.log('Paciente actualizado exitosamente');

        // Volver a obtener los datos actualizados del paciente
        await dispatch(fetchPatientById(String(id)));
      } else {
        console.error('Error al actualizar paciente:', resultAction.payload);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
  };

  return { updatePatientData };
}
