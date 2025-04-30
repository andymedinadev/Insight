'use client';

import Link from 'next/link';

const links = [
  { href: '/dashboard/home', label: 'Inicio' },
  { href: '/dashboard/profile', label: 'Perfil' },
  { href: '/dashboard/patientlist', label: 'Listado de pacientes' },
  { href: '/dashboard/newpatient', label: 'Nuevo paciente' },
  { href: '/dashboard/calendar', label: 'Calendario' },
  { href: '/dashboard/support', label: 'Soporte' },
];

export default function DashboardLinks() {
  return (
    <>
      {links.map(({ href, label }) => (
        <Link key={href} href={href} className="flex flex-col hover:underline">
          {label}
        </Link>
      ))}
    </>
  );
}
