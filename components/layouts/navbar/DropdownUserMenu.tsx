'use client';

import Image from 'next/image';
import Link from 'next/link';
import { forwardRef } from 'react';
import { UserNav, Logout } from '@/public';

type DropdownUserMenuProps = {
  popupRef: React.RefObject<HTMLDivElement>;
  onLogout: () => void;
};

const DropdownUserMenu = forwardRef<HTMLDivElement, DropdownUserMenuProps>(({ onLogout }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute right-10 z-10 mt-5 h-56 w-2xs rounded-md border border-gray-200 bg-white shadow-md"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="mt-5 flex items-center px-4 py-2">
          <div className="outline-Stroke-Weak/10 relative mr-3 h-12 w-12 rounded-[48px] outline-1 outline-offset-[-1px]" />
          <div>
            <p className="text-base leading-normal font-normal">María José</p>
            <p className="text-sm leading-tight font-normal">mariajohaynes@gmail.com</p>
          </div>
        </div>
        <hr />
        <div className="cursor-pointer">
          <div className="flex flex-row px-4 py-3">
            <Image src={UserNav} alt="Icon" width={24} height={24} className="mr-2 inline-block" />
            <Link href="/dashboard/profile">
              <p className="text[#000F27E5] text-base leading-normal font-normal">Ir a perfil</p>
            </Link>
          </div>
        </div>
        <hr />
        <div className="mb-5 flex flex-row px-4 py-2">
          <Image src={Logout} alt="Icon" width={24} height={24} className="mr-2 inline-block" />
          <button onClick={onLogout} className="cursor-pointer">
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
});

DropdownUserMenu.displayName = 'DropdownUserMenu';
export default DropdownUserMenu;
