import Link from 'next/link';
import React from 'react';

export default function SeeMoreButton() {
  return (
    <div className="mb-2.5 flex items-center justify-center text-center">
      <Link href="/dashboard/patientlist">
        <p className="text-sm leading-tight font-semibold text-black underline">Ver más</p>
      </Link>
    </div>
  );
}
