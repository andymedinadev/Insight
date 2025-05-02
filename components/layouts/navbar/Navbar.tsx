import { NavbarClient, CurrentPath } from '@/components';
import { Campana, Avatar, FlechaBaja } from '@/public';
import Image from 'next/image';

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
      <div className="flex items-center gap-4">
        <span>
          <Image src={Campana} alt="Campana" className="object-contain" />
        </span>
        <span>
          <Image src={Avatar} alt="Avatar" className="object-contain" />
        </span>
        <span>
          <Image src={FlechaBaja} alt="Flecha Baja" className="object-contain" />
        </span>
      </div>
    </header>
  );
}
