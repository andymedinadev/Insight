import Image from 'next/image';

import { Logo as InsightLogo } from '@/public';

export function ConfirmHeader() {
  return (
    <>
      <div className="mt-24 hidden lg:block">
        <Image
          src={InsightLogo}
          alt="InsightLogo"
          width={150}
          height={47}
          className="object-contain"
        />
      </div>
      <div className="lg:mt-28">
        <h1 className="font-['Roboto'] text-2xl font-bold text-black lg:text-3xl lg:leading-[48px] lg:font-semibold">
          Confirma tu cuenta
        </h1>
        <p className="mt-12 w-[350px] font-['Roboto'] text-base leading-tight font-normal text-black lg:w-[445px] lg:text-lg">
          Para confirmar tu cuenta recibirás un código al email ingresado. Ingresa el código debajo.
        </p>
      </div>
    </>
  );
}
