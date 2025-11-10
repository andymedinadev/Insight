import { BackendNote } from '@/types';

export const initialNotes: BackendNote[] = [
  {
    id: 1,
    patientId: 1,
    title: 'Primera sesión',
    content: 'Exploración del motivo de consulta y establecimiento de objetivos terapéuticos.',
    creationDate: '2024-01-17T12:00:00.000Z',
  },
  {
    id: 2,
    patientId: 1,
    title: 'Seguimiento',
    content: 'Se observan avances en la gestión de la ansiedad ante reuniones de trabajo.',
    creationDate: '2024-02-14T12:00:00.000Z',
  },
  {
    id: 3,
    patientId: 2,
    title: 'Evaluación inicial',
    content: 'Se identifican dificultades de concentración y hábitos de estudio deficientes.',
    creationDate: '2024-03-09T17:30:00.000Z',
  },
  {
    id: 4,
    patientId: 3,
    title: 'Intervención lúdica',
    content: 'Se trabajó con técnicas de juego para fomentar la interacción con pares.',
    creationDate: '2024-04-02T15:45:00.000Z',
  },
];
