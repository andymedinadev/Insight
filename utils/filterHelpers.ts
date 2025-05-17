import { calcularEdad } from '@/utils';

export function matchesRangoEtario(birthdate: string, rangoEtario: string[]): boolean {
  if (rangoEtario.length === 0) return true;

  const age = calcularEdad(birthdate);

  return rangoEtario.some((rango) => {
    if (rango === '0-12 años') return age >= 0 && age <= 12;
    if (rango === '13-17 años') return age >= 13 && age <= 17;
    if (rango === 'Más de 18 años') return age >= 18;
    return false;
  });
}
