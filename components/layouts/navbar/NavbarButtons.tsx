'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

import { useLogout } from '@/hooks';
import { selectUserName, selectUserSurname } from '@/store/slices/userSlice';
import { AvatarGeneral, FlechaBaja } from '@/public';
import DropdownUserMenu from './DropdownUserMenu';

export default function NavbarButtons() {
  const { logout } = useLogout();

  const userName = useSelector(selectUserName);
  const userSurname = useSelector(selectUserSurname);

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
      <span className="hidden justify-center font-['Roboto'] text-sm leading-tight font-normal text-[#000F27]/90 lg:block">
        {`${userName} ${userSurname}`}
      </span>
      <span ref={optionsButtonRef} onClick={() => setIsOpen(!isOpen)}>
        <Image src={FlechaBaja} alt="Flecha Baja" className="object-contain hover:cursor-pointer" />
        {isOpen && <DropdownUserMenu ref={optionsPopupRef} onLogout={logout} />}
      </span>
    </div>
  );
}
