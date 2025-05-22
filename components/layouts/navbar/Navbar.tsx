import { CurrentPath, NavbarButtons, NavbarClient } from '@/components';
import { Suspense } from 'react';

export default function Navbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-[#E6E8F0] bg-white px-4 shadow lg:h-16 lg:px-6">
      {/* Mobile: ícono hamburguesa + menú */}
      <NavbarClient />

      {/* Desktop: ruta */}
      <h1 className="hidden text-sm leading-tight font-normal text-gray-500 lg:block">
        <Suspense fallback={null}>
          <CurrentPath />
        </Suspense>
      </h1>

      {/* Íconos comunes */}
      <NavbarButtons />
    </header>
  );
}
