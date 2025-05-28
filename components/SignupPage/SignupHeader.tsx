import Image from 'next/image';

import { Logo as InsightLogo } from '@/public';

export function SignupHeader() {
  return (
    <>
      <div className="justify-start font-['Roboto'] text-2xl font-bold text-black lg:flex lg:items-start lg:justify-between lg:text-3xl lg:leading-[48px] lg:font-semibold 2xl:max-w-[550px]">
        <h2>Bienvenido/a</h2>
        <Image
          className="ml-2 hidden object-cover lg:block"
          src={InsightLogo}
          width={150}
          height={47}
          alt="Insight Logo"
        />
      </div>

      <div className="mt-6 justify-start font-['Roboto'] text-xl font-semibold text-black lg:mt-6 lg:text-3xl lg:leading-10 lg:font-normal">
        <h3>Regístrate</h3>
      </div>

      <div className="mt-2.5 w-[350px] justify-start font-['Roboto'] text-base leading-tight font-normal text-black lg:mt-5 lg:w-[448px] lg:text-lg">
        <p>
          Desde aquí podrás gestionar sus pacientes, registrar observaciones y brindar un
          seguimiento personalizado y organizado.
        </p>
      </div>

      <div className="mt-11 mb-5 justify-start font-['Roboto'] text-base leading-tight font-normal text-black lg:mt-6 lg:leading-normal">
        <span className="text-red-600">*</span>
        <span> Datos Requeridos</span>
      </div>
    </>
  );
}
