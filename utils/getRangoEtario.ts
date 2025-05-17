import { RangoEtario } from '@/types';

export function getRangoEtario(age: number): RangoEtario {
  if (age < 13) return 'Niño';
  if (age < 18) return 'Adolescente';
  if (age < 60) return 'Adulto';
  return 'Adulto';
}
