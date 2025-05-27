'use client';

import Image from 'next/image';
import Link from 'next/link';
import { forwardRef } from 'react';
import { UserNav, Logout, AvatarGeneral } from '@/public';
import { UserNameDrop } from '@/components';

type DropdownUserMenuProps = {
  popupRef: React.RefObject<HTMLDivElement>;
  onLogout: () => void;
};

const DropdownUserMenu = forwardRef<HTMLDivElement, DropdownUserMenuProps>(({ onLogout }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute right-10 z-10 mt-5 h-56 w-2xs rounded-md border border-[#E6E8F0] bg-white shadow-md"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="mt-5 flex items-center px-4 py-2">
          <Image
            src={AvatarGeneral}
            alt="Icon"
            width={48}
            height={48}
            className="mr-2 inline-block"
          />
          <div>
            <UserNameDrop />
          </div>
        </div>
        <hr className="border-[#E6E8F0]" />
        <div className="cursor-pointer">
          <div className="flex flex-row px-4 py-3">
            <Image src={UserNav} alt="Icon" width={24} height={24} className="mr-2 inline-block" />
            <Link href="/dashboard/profile">
              <p className="text[#000F27E5] text-base leading-normal font-normal">Ir a perfil</p>
            </Link>
          </div>
        </div>
        <hr className="border-[#E6E8F0]" />
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
