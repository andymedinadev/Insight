'use client';

import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, useEffect } from 'react';
import { UserNav, Logout, AvatarGeneral } from '@/public';
import { UserNameDrop } from '@/components';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchUser, selectUser } from '@/store/slices/userSlice';
import { User } from '@/types/Profile/profileTypes';

type DropdownUserMenuProps = {
  onLogout: () => void;
};

const DropdownUserMenu = forwardRef<HTMLDivElement, DropdownUserMenuProps>(({ onLogout }, ref) => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useSelector(selectUser) as {
    data: User | null;
    loading: boolean;
    error: string | null;
  };

  useEffect(() => {
    if (!data) {
      dispatch(fetchUser());
    }
  }, [dispatch, data]);

  if (loading) return <span className="h-10 w-32 text-sm text-gray-400">Cargando...</span>;
  if (error) return <span className="text-sm text-red-500">Error</span>;
  if (!data) return <span className="text-sm text-gray-400">Usuario</span>;

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
