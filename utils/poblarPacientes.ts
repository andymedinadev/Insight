import { AppDispatch } from '@/store';
import { createPatient } from '@/store/thunks';
import type { TypeNewPatient } from '@/types';

interface TypeNewPatientBackend {
  name: string;
  surname: string;
  birthdate: string;
  identification: number;
  sex: 'M' | 'F' | 'O';
  modality: string;
  email: string;
  phone: string;
}

function transfPacienteCreacion(p: TypeNewPatient): TypeNewPatientBackend {
  const adaptGenre = (g: string): 'M' | 'F' | 'O' => {
    if (g.startsWith('M') || g.startsWith('m')) {
      return 'M';
    }

    if (g.startsWith('F') || g.startsWith('F')) {
      return 'F';
    }

    return 'O';
  };

  return {
    name: p.name,
    surname: p.surname,
    birthdate: p.birthdate,
    identification: 12345678,
    sex: adaptGenre(p.sex),
    modality: p.modality || 'Presencial',
    email: p.email,
    phone: p.phone,
  };
}

// Poblar backend creando pacientes
export async function poblarPacientes(
  pacientes: TypeNewPatient[],
  dispatch: AppDispatch
): Promise<void> {
  for (const paciente of pacientes) {
    const pacienteFormateado = transfPacienteCreacion(paciente);

    try {
      const resultAction = await dispatch(createPatient(pacienteFormateado));

      if (createPatient.fulfilled.match(resultAction)) {
        console.log(`✅ Paciente creado: ${pacienteFormateado.name} ${pacienteFormateado.surname}`);
      } else {
        console.error(`❌ Error al crear paciente:`, resultAction.payload);
      }
    } catch (error) {
      console.error(`❗ Error inesperado:`, error);
    }
  }
}
