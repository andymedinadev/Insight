'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useLogin } from '@/hooks';
import { useAlert } from '@/contexts/AlertContext';
import { ValidCodeImage } from '@/public';

type Props = {
  email: string;
  password: string;
};

export function SuccessStep({ email, password }: Props) {
  const router = useRouter();
  const { showAlert } = useAlert();

  const { login, loading } = useLogin();

  const [redirecting, setRedirecting] = useState(false);

  const isLoading = loading || redirecting;

  const handleClick = async () => {
    const result = await login(email, password);

    showAlert(result.alert);

    if (result.success) {
      setRedirecting(true);
      setTimeout(() => {
        router.push('/dashboard/home');
      }, 5000);
    }
  };

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
            disabled={isLoading}
            onClick={handleClick}
            className={`mb-0 inline-flex h-12 w-[350px] items-center justify-center rounded-lg bg-[#0655D5] lg:mt-0 lg:w-[470px] lg:rounded-xl ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <p className="justify-start border-none text-center font-['Roboto'] text-base leading-normal font-semibold text-white lg:text-2xl lg:leading-7">
              {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
