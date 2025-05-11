'use client';

import Link from 'next/link';

export default function ArchivedLink() {
  return (
    <Link href="/dashboard/patientlist" className="mt-8 mb-8 lg:mt-0 lg:mb-0 lg:ml-[-10px]">
      <span className="text-Text-Brand text-base leading-normal font-semibold text-[#0655D5] underline">
        Ir atrás
      </span>
    </Link>
  );
}
