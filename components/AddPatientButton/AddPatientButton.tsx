import Link from 'next/link';
import React from 'react';

export default function AddPatientButton() {
  return (
    <Link href="/dashboard/newpatient">
      <button className="h-9 w-52 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-normal text-black">
        <div className="" />+ Agregar paciente nuevo
      </button>
    </Link>
  );
}
