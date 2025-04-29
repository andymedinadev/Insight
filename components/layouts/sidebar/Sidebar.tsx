'use client'

import React from 'react'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className='h-screen w-56 bg-red-300 p-4'>
      <nav className='flex flex-col gap-2'>
        <Link href="/dashboard/home" className="hover:underline">Inicio</Link>
        <Link href="/dashboard/profile" className="hover:underline">Perfil</Link>
        <Link href="/dashboard/patientlist" className="hover:underline">Lista de paciente</Link>
        <Link href="/dashboard/newpatient" className="hover:underline">Nuevo paciente</Link>
        <Link href="/dashboard/calendar" className="hover:underline">Calendario</Link>
        <Link href="/dashboard/support" className="hover:underline">Soporte</Link>
      </nav>
    </div>
  )
}
