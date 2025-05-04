import { CurrentPath, NavbarButtons, NavbarClient } from '@/components';

export default function Navbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4 shadow lg:h-16 lg:px-6">
      {/* Mobile: ícono hamburguesa + menú */}
      <NavbarClient />

      {/* Desktop: ruta */}
      <h1 className="hidden text-sm leading-tight font-normal text-gray-500 lg:block">
        <CurrentPath />
      </h1>

      {/* Íconos comunes */}
      <NavbarButtons />
    </header>
  );
}
