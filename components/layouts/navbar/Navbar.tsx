import { NavbarClient } from '@/components';

export default function Navbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4 shadow lg:h-16 lg:px-6">
      {/* Mobile: ícono hamburguesa + menú */}
      <NavbarClient />

      {/* Desktop: título */}
      <h1 className="hidden text-xl font-semibold lg:block"></h1>

      {/* Íconos comunes */}
      <div className="flex items-center gap-4">
        <span>🔔</span>
        <span>👤</span>
        <span>↓</span>
      </div>
    </header>
  );
}
