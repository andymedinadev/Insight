import { BackendMaterial } from '@/types';

export const initialMaterials: BackendMaterial[] = [
  {
    id: 1,
    patientId: 1,
    title: 'Ejercicios de respiración',
    content: 'Guía con respiración diafragmática para practicar antes de presentaciones.',
    creationDate: '2024-01-20T09:00:00.000Z',
  },
  {
    id: 2,
    patientId: 2,
    title: 'Planificador semanal',
    content: 'Plantilla editable para organizar tareas y tiempos de estudio.',
    creationDate: '2024-03-12T09:00:00.000Z',
  },
  {
    id: 3,
    patientId: 3,
    title: 'Juego de roles',
    content: 'Actividad para practicar saludos y presentaciones en entornos escolares.',
    creationDate: '2024-04-05T09:00:00.000Z',
  },
];
