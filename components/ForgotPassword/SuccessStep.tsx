import Image from 'next/image';

import { ValidCodeImage } from '@/public';

export function SuccessStep() {
  return (
    <>
      <div>
        <div className="mt-20 flex flex-col items-center lg:mt-40">
          <div className="flex h-[132px] w-[132px] justify-center lg:h-[200px] lg:w-[200px]">
            <Image src={ValidCodeImage} alt="checkmark logo" />
          </div>
          <h1 className="mt-11 justify-start font-['Roboto'] text-base leading-tight font-normal text-black lg:w-[445px] lg:text-center lg:text-lg">
            Tu contraseña fue modificada exitosamente
          </h1>
        </div>

        <div className="mt-24 flex justify-center lg:mt-32">
          <button
            type="submit"
            // Pendiente el inicio de sesión
            // disabled={redirecting}
            // onClick={handleClick}
            className={`mb-0 inline-flex h-12 w-[350px] items-center justify-center rounded-lg bg-[#0655D5] lg:mt-0 lg:w-[470px] lg:rounded-xl ${false ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <p className="justify-start border-none text-center font-['Roboto'] text-base leading-normal font-semibold text-white lg:text-2xl lg:leading-7">
              {false ? 'Cargando...' : 'Iniciar Sesión'}
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
