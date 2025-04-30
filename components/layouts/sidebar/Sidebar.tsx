'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="z-30 flex h-full w-64 flex-col gap-4 border-r bg-white p-6 shadow">
      <h1 className="mb-24 text-xl font-semibold">INSIGHT</h1>
      <Link href="/dashboard/home" className="hover:underline">
        Inicio
      </Link>
      <Link href="/dashboard/profile" className="hover:underline">
        Perfil
      </Link>
      <Link href="/dashboard/patientlist" className="hover:underline">
        Listado de pacientes
      </Link>
      <Link href="/dashboard/newpatient" className="hover:underline">
        Nuevo paciente
      </Link>
      <Link href="/dashboard/calendar" className="hover:underline">
        Calendario
      </Link>
      <Link href="/dashboard/support" className="hover:underline">
        Soporte
      </Link>
    </aside>
  );
}
