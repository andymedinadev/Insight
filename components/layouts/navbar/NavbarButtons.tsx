'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useLogout } from '@/hooks';
import { Campana, Avatar, FlechaBaja } from '@/public';

export default function NavbarButtons() {
  const { logout } = useLogout();

  const optionsButtonRef = useRef<HTMLDivElement>(null);
  const optionsPopupRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function closeOnClickOutside(event: MouseEvent) {
      const isOutsideClick =
        optionsPopupRef.current &&
        !optionsPopupRef.current.contains(event.target as Node) &&
        optionsButtonRef.current &&
        !optionsButtonRef.current.contains(event.target as Node);

      if (isOutsideClick) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', closeOnClickOutside);
    } else {
      document.removeEventListener('mousedown', closeOnClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', closeOnClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex items-center gap-4">
      <span>
        <Image src={Campana} alt="Campana" className="object-contain" />
      </span>
      <span>
        <Image src={Avatar} alt="Avatar" className="object-contain" />
      </span>
      <span ref={optionsButtonRef} onClick={() => setIsOpen(!isOpen)}>
        <Image src={FlechaBaja} alt="Flecha Baja" className="object-contain hover:cursor-pointer" />
        {isOpen && (
          <div
            ref={optionsPopupRef}
            className="absolute right-0 z-10 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-md"
          >
            <ul className="py-1 text-sm text-gray-700">
              <li>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:cursor-pointer hover:bg-gray-200"
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        )}
      </span>
    </div>
  );
}
