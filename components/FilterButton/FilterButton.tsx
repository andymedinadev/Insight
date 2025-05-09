'use client';
import { useState, isValidElement, cloneElement, ReactElement } from 'react';
import Image from 'next/image';
import { iconofilter } from '@/public';

interface Props {
  children: ReactElement<{ onClose?: () => void }>;
}

export default function FilterButton({ children }: Props) {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);

  return (
    <div className="relative mx-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-1 rounded-md px-3 py-2"
      >
        <Image src={iconofilter} alt="Filtro" width={20} height={20} />
        <p className="text-sm font-medium text-neutral-400">Filtros</p>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-1.5 w-40 rounded-md border border-gray-200 bg-white shadow-lg lg:h-auto lg:w-96">
          {isValidElement(children) ? cloneElement(children, { onClose }) : children}
        </div>
      )}
    </div>
  );
}
