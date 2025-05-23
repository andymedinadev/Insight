'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CurrentPath() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const mode = searchParams.get('mode');

  const getBreadcrumbs = (path: string) => {
    if (path === '/dashboard/home') {
      return [{ label: 'Inicio', href: '/dashboard/home' }];
    }

    if (path === '/dashboard/patientlist') {
      return [
        { label: 'Inicio', href: '/dashboard/home' },
        { label: 'Listado de pacientes', href: '/dashboard/patientlist' },
      ];
    }

    if (path === '/dashboard/patientlist/archived') {
      return [
        { label: 'Inicio', href: '/dashboard/home' },
        { label: 'Listado de pacientes', href: '/dashboard/patientlist' },
        { label: 'Archivados', href: '/dashboard/patientlist/archived' },
      ];
    }

    if (path === '/dashboard/newpatient') {
      return [
        { label: 'Inicio', href: '/dashboard/home' },
        { label: 'Nuevo paciente', href: '/dashboard/newpatient' },
      ];
    }

    if (path === '/dashboard/support') {
      return [
        { label: 'Inicio', href: '/dashboard/home' },
        { label: 'Soporte', href: '/dashboard/support' },
      ];
    }

    if (path.startsWith('/dashboard/patientprofile/')) {
      const id = path.split('/')[3];
      return [
        { label: 'Inicio', href: '/dashboard/home' },
        { label: 'Listado de pacientes', href: '/dashboard/patientlist' },
        { label: 'Perfil del paciente', href: `/dashboard/patientprofile/${id}` },
      ];
    }

    if (path === '/dashboard/patientprofile') {
      return [
        { label: 'Inicio', href: '/dashboard/home' },
        { label: 'Perfil del paciente', href: '/dashboard/patientprofile' },
      ];
    }

    if (path.startsWith('/dashboard/patientprofile/') && path.endsWith('/notes')) {
      const id = path.split('/')[3];
      return [
        { label: 'Inicio', href: '/dashboard/home' },
        { label: 'Listado de pacientes', href: '/dashboard/patientlist' },
        { label: 'Perfil del paciente', href: `/dashboard/patientprofile/${id}` },
        { label: 'Gestionar notas', href: `/dashboard/patientprofile/${id}/notes` },
      ];
    }

    if (path.startsWith('/dashboard/medicalhistory/')) {
      const id = path.split('/')[3];
      const base = [
        { label: 'Inicio', href: '/dashboard/home' },
        { label: 'Listado de pacientes', href: '/dashboard/patientlist' },
        { label: 'Perfil del paciente', href: `/dashboard/patientprofile/${id}` },
      ];

      if (from === 'notes') {
        const crumbs = [
          ...base,
          { label: 'Gestionar notas', href: `/dashboard/medicalhistory/${id}?from=notes` },
        ];
        if (mode === 'edit') {
          crumbs.push({ label: 'Editar nota', href: '#' });
        } else if (mode === 'new') {
          crumbs.push({ label: 'Agregar nueva nota', href: '#' });
        }
        return crumbs;
      }

      if (from === 'material') {
        const crumbs = [
          ...base,
          {
            label: 'Material para el paciente',
            href: `/dashboard/medicalhistory/${id}?from=material`,
          },
        ];
        if (mode === 'edit') {
          crumbs.push({ label: 'Editar material', href: '#' });
        } else if (mode === 'new') {
          crumbs.push({ label: 'Agregar nuevo material', href: '#' });
        }
        return crumbs;
      }
    }

    return [];
  };

  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <nav className="space-x-1 text-sm text-gray-600">
      {breadcrumbs.map((crumb, index) => (
        <span key={index}>
          <Link href={crumb.href} style={{ color: '#000D22A6' }} className="hover:underline">
            {crumb.label}
          </Link>
          {index < breadcrumbs.length - 1 && <span> / </span>}
        </span>
      ))}
    </nav>
  );
}
