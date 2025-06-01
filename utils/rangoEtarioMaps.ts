export const rangoEtarioMapBackendToFrontend: Record<string, string> = {
  Niño: '0-12 años',
  Adolescente: '13-17 años',
  Adulto: 'Más de 18 años',
};

export const rangoEtarioMapFrontendToBackend: Record<string, string> = {
  '0-12 años': 'Niño',
  '13-17 años': 'Adolescente',
  'Más de 18 años': 'Adulto',
};
