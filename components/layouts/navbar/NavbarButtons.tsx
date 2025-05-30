'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useLogout } from '@/hooks';
import { AvatarGeneral, FlechaBaja } from '@/public';
import DropdownUserMenu from './DropdownUserMenu';

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
    }

    return () => {
      document.removeEventListener('mousedown', closeOnClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex items-center gap-4">
      <span>
        <Image src={AvatarGeneral} height={32} width={32} alt="Avatar" className="object-contain" />
      </span>
      <span ref={optionsButtonRef} onClick={() => setIsOpen(!isOpen)}>
        <Image src={FlechaBaja} alt="Flecha Baja" className="object-contain hover:cursor-pointer" />
        {isOpen && <DropdownUserMenu ref={optionsPopupRef} onLogout={logout} />}
      </span>
    </div>
  );
}
