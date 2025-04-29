'use client'

import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="h-full w-64 bg-white border-r p-6 flex flex-col gap-4 shadow z-30">
      <h1 className="text-xl font-semibold mb-24">INSIGHT</h1>
      <Link href="/dashboard/home" className="hover:underline">Inicio</Link>
      <Link href="/dashboard/profile" className="hover:underline">Perfil</Link>
      <Link href="/dashboard/patientlist" className="hover:underline">Listado de pacientes</Link>
      <Link href="/dashboard/newpatient" className="hover:underline">Nuevo paciente</Link>
      <Link href="/dashboard/calendar" className="hover:underline">Calendario</Link>
      <Link href="/dashboard/support" className="hover:underline">Soporte</Link>
    </aside>
  );
}
