'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Logo as InsightLogo, Background, ValidCodeImage } from '@/public';
import { useState } from 'react';

export function SuccessConfirm() {
  const router = useRouter();

  const [redirecting, setRedirecting] = useState(false);

  const handleClick = () => {
    setRedirecting(true);
    router.push('/dashboard/home');
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Texto "INSIGHT" solo visible en móvil */}
      <div className="mt-9 flex w-full justify-center px-3 py-5 md:hidden">
        <Image
          src={InsightLogo}
          alt="InsightLogo"
          width={110}
          height={34}
          className="object-contain"
        />
      </div>

      {/* Contenido principal con grid */}
      <div className="mt-0 grid h-full w-full grid-cols-1 px-6 md:h-screen md:grid-cols-2">
        <div>
          <div className="hidden lg:mt-10 lg:ml-24 lg:block lg:pt-7">
            {/* LOGO DESKTOP */}
            <Image
              src={InsightLogo}
              alt="InsightLogo"
              width={150}
              height={34}
              className="object-contain"
            />
          </div>
          <div className="mt-36 flex flex-col items-center lg:mt-24">
            <div className="flex h-32 w-32 justify-center">
              <Image src={ValidCodeImage} alt="checkmark logo" />
            </div>
            <h1 className="mt-11 justify-start font-['Roboto'] text-base leading-tight font-normal text-black lg:w-[445px] lg:text-center lg:text-lg">
              Su cuenta fue confirmada exitosamente
            </h1>
          </div>

          <div className="mt-24 flex justify-center lg:mt-32">
            <button
              type="submit"
              disabled={redirecting}
              onClick={handleClick}
              className={`mb-0 inline-flex h-12 w-[350px] items-center justify-center rounded-lg bg-[#0655D5] lg:mt-0 lg:w-[470px] lg:rounded-xl ${redirecting ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <p className="justify-start border-none text-center font-['Roboto'] text-base leading-normal font-semibold text-white lg:text-2xl lg:leading-7">
                {redirecting ? 'Cargando...' : 'Iniciar Sesión'}
              </p>
            </button>
          </div>
        </div>
        {/* Columna decorativa derecha */}
        <div className="relative hidden w-1/2 overflow-hidden lg:block lg:max-h-[1024] lg:max-w-[720px] 2xl:max-h-[1080px] 2xl:max-w-[990px]">
          <Image
            priority
            className="fixed h-full w-full object-fill lg:max-w-[720px] 2xl:max-w-[990px]"
            src={Background}
            alt="Login page Background"
          />
        </div>
      </div>
    </div>
  );
}
