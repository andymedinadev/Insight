import { UserProfileView, UserChangePassword } from '@/components';
import { AvatarGeneral } from '@/public';
import Image from 'next/image';
import React from 'react';

export default function page() {
  return (
    <div className="flex flex-col">
      <div className="mt-9 mb-16 ml-9">
        <h1 className="text-3xl leading-[48px] font-semibold text-black">Mi perfil</h1>
      </div>
      <div className="ml-9 flex flex-row">
        <div>
          <div className="relative mr-32 h-56 w-56">
            <Image src={AvatarGeneral} alt="Avatar psicologo" height={226} width={226} />
          </div>
        </div>
        <div>
          <h1 className="mb-14 text-2xl leading-loose font-semibold text-black">
            Datos personales
          </h1>
          <UserProfileView />
          <UserChangePassword />
        </div>
      </div>
    </div>
  );
}
