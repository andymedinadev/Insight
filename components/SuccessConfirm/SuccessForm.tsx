'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Logo as InsightLogo, ValidCodeImage } from '@/public';

export function SuccessForm() {
  const router = useRouter();

  const [redirecting, setRedirecting] = useState(false);

  const handleClick = () => {
    setRedirecting(true);
    router.push('/dashboard/home');
  };

  return (
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

      <div className="mt-14 flex flex-col items-center lg:mt-24">
        <div className="flex h-[200px] w-[200px] justify-center">
          <Image src={ValidCodeImage} alt="checkmark logo" />
        </div>
        <h1 className="mt-11 justify-start font-['Roboto'] text-base leading-tight font-normal text-black lg:w-[445px] lg:text-center lg:text-lg">
          Tu cuenta fue confirmada exitosamente
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
  );
}
