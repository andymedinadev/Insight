'use client';

import { useState } from 'react';
import { DashboardLinks } from '@/components';

export default function NavbarClient() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="block lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        <span>☰</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)}>
          <aside
            className="absolute top-0 left-0 z-50 h-full w-64 bg-white p-6 shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-6 text-lg font-semibold">Menú</h2>
            <DashboardLinks />
          </aside>
        </div>
      )}
    </>
  );
}
