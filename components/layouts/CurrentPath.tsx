'use client';

import { usePathname } from 'next/navigation';

export default function CurrentPath() {
  const pathname = usePathname();

  // Opcional: convertir rutas en nombres más legibles
  const getLabel = (path: string) => {
    switch (path) {
      case '/dashboard/home':
        return 'Inicio /';
      case '/dashboard/profile':
        return 'Home / Perfil';
      case '/dashboard/patientlist':
        return 'Home / Listado de pacientes';
      case '/dashboard/newpatient':
        return 'Home / Nuevo paciente';
      case '/dashboard/support':
        return 'Home / Soporte';
      case '/dashboard/patientlist/archived':
        return 'Home / Listado de pacientes / archivados';
      default:
        return '';
    }
  };

  return <span>{getLabel(pathname)}</span>;
}
