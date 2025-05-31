import Image from 'next/image';
import Link from 'next/link';

import { flechaDerecha } from '@/public';

export function UserChangePassword() {
  return (
    <div className="mb-10">
      <div className="justify-start font-['Roboto'] text-2xl leading-loose font-semibold text-black">
        Configuración de la cuenta
      </div>

      <div className="relative h-14 w-[500px]">
        <Link href={'/auth/change-password'}>
          <div className="absolute top-0 left-0 h-14 w-[500px] border-t border-b border-white" />
          <div className="absolute top-[21px] left-[35.33px] justify-start font-['Roboto'] text-lg font-semibold text-black">
            Cambiar contraseña
          </div>
          <div className="absolute top-[13px] left-[300px] inline-flex h-11 w-0 origin-top-left flex-col items-center justify-center gap-2.5 p-1">
            <div className="h-4 w-2.5">
              <Image src={flechaDerecha} alt="flechaDerecha" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
