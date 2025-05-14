'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useConfirmCode } from '@/hooks/useConfirmCode';
import { SuccessConfirm } from '@/components';
import { Logo as InsightLogo, BackgroundSignup } from '@/public';

function ConfirmAccount() {
  const [confirmed, setConfirmed] = useState(false);

  const { code, isComplete, isLoading, handleChange, handleSubmit } = useConfirmCode(() =>
    setConfirmed(true)
  );

  if (confirmed) return <SuccessConfirm />;

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
      <div className="mt-12 grid h-full w-full grid-cols-1 px-6 md:h-screen md:grid-cols-2 lg:mt-0">
        {/* Columna del formulario */}
        <div className="flex h-full flex-col items-center justify-center bg-white lg:m-auto lg:block lg:w-[470px] 2xl:pt-20">
          <div>
            <div className="mt-16 hidden py-7 lg:block">
              {/* LOGO DESKTOP */}
              <Image
                src={InsightLogo}
                alt="InsightLogo"
                width={150}
                height={34}
                className="object-contain"
              />
            </div>
          </div>
          <div className="lg:mt-20">
            <h1 className="justify-start font-['Roboto'] text-2xl font-bold text-black lg:text-3xl lg:leading-[48px] lg:font-semibold">
              Confirme su cuenta
            </h1>

            <p className="mt-12 w-[350px] justify-start font-['Roboto'] text-base leading-tight font-normal text-black lg:w-[445px] lg:text-lg">
              Para confirmar su cuenta recibirá un código al email ingresado. Ingrese el código
              debajo.
            </p>
          </div>

          <form className="mt-16 flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="flex h-14 gap-2 lg:h-[60px] lg:w-full lg:gap-2">
              {code.map((char, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  type="text"
                  value={char}
                  onChange={(e) => handleChange(e, i)}
                  maxLength={1}
                  className="h-full w-9 rounded-lg border border-black/50 bg-white text-center font-['Roboto'] text-xl leading-tight font-medium tracking-tight text-black uppercase lg:w-1/8"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={!isComplete || isLoading}
              className={`mt-16 mb-0 inline-flex h-12 w-[350px] items-center justify-center rounded-lg lg:mt-20 lg:w-[470px] lg:rounded-xl ${!isComplete ? 'cursor-not-allowed bg-[#0011661A]' : 'cursor-pointer bg-[#0655D5]'}`}
            >
              <p
                className={`justify-start border-none text-center font-['Roboto'] text-base leading-normal font-semibold text-white lg:text-2xl lg:leading-7 ${isLoading ? 'cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Cargando...' : 'Verificar código'}
              </p>
            </button>
          </form>

          <a className="my-10 justify-start font-['Roboto'] text-sm leading-normal font-bold text-blue-700 underline lg:hidden">
            Enviar de nuevo
          </a>
        </div>

        {/* Columna decorativa derecha */}
        <div className="relative hidden w-1/2 overflow-hidden lg:block lg:max-h-[1024] lg:max-w-[720px] 2xl:max-h-[1080px] 2xl:max-w-[990px]">
          <Image
            priority
            className="fixed h-full w-full object-fill lg:max-w-[720px] 2xl:max-w-[990px]"
            src={BackgroundSignup}
            alt="Login page Background"
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmAccount;
