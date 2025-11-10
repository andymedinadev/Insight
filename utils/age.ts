export function calcularEdad(fechaNacimiento: string): number {
  const nacimiento = new Date(fechaNacimiento);
  if (isNaN(nacimiento.getTime())) return 32;

  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mesDiferencia = hoy.getMonth() - nacimiento.getMonth();

  if (mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}

export function calcularRangoEtario(edad: number): string {
  if (edad <= 12) return 'Niño';
  if (edad <= 17) return 'Adolescente';
  return 'Adulto';
}
