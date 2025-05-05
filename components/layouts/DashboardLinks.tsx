'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Home, Perfil, Listado, Paciente, Soporte } from '@/public'; // Asegurate que exportás bien los paths

const links = [
  { href: '/dashboard/home', label: 'Inicio', icon: Home },
  { href: '/dashboard/profile', label: 'Perfil', icon: Perfil },
  { href: '/dashboard/patientlist', label: 'Listado de pacientes', icon: Listado },
  { href: '/dashboard/newpatient', label: 'Nuevo paciente', icon: Paciente },
  { href: '/dashboard/support', label: 'Soporte', icon: Soporte },
];

export default function DashboardLinks() {
  return (
    <>
      {links.map(({ href, label, icon }) => (
        <Link key={href} href={href} className="flex items-center hover:underline lg:mb-6">
          <Image
            src={icon}
            alt={label}
            width={20}
            height={20}
            className="mr-3 ml-6 object-contain"
          />
          <span>{label}</span>
        </Link>
      ))}
    </>
  );
}
