import Link from 'next/link';
import React from 'react';

export default function SeeMoreButton() {
  return (
    <div className="flex items-center justify-center text-center">
      <Link href="/dashboard/patientlist">
        <p className="text-base leading-loose font-medium text-black underline">Ver más</p>
      </Link>
    </div>
  );
}
