'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Listado, Paciente, Soporte, CalendarSidebar } from '@/public';

const links = [
  { href: '/dashboard/home', label: 'Inicio', icon: Home },
  { href: '/dashboard/patientlist', label: 'Listado de pacientes', icon: Listado },
  { href: '/dashboard/newpatient', label: 'Nuevo paciente', icon: Paciente },
  { href: '/dashboard/calendar', label: 'Mi agenda', icon: CalendarSidebar },
  { href: '/dashboard/support', label: 'Soporte', icon: Soporte },
];

export default function DashboardLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map(({ href, label, icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center text-base leading-normal font-normal lg:mb-2 lg:py-2 lg:text-[#000F27E5] ${
              isActive ? 'border-l-4 border-[#0655D5] bg-[#F5F7FA] pl-[22px]' : 'pl-6'
            }`}
          >
            <Image src={icon} alt={label} width={20} height={20} className="mr-3 object-contain" />
            <span>{label}</span>
          </Link>
        );
      })}
    </>
  );
}
