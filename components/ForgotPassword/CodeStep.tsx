'use client';

import { CodeInput } from '@/components';
import { useCodeInput } from '@/hooks';

import type { ResetPasswordPayload } from '@/types';

interface CodeStepProps {
  payload: ResetPasswordPayload;
  onNext: (payload: ResetPasswordPayload) => void;
}

export function CodeStep({ payload, onNext }: CodeStepProps) {
  const { code, isComplete, handleChange, handleKeyDown } = useCodeInput();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isComplete) return;

    const loadedPayload: ResetPasswordPayload = {
      ...payload,
      code: code.join(''),
    };

    onNext(loadedPayload);
  };

  return (
    <>
      <h2 className="mb-7 justify-start font-['Roboto'] text-2xl font-bold text-black lg:mb-14 lg:text-3xl lg:leading-[48px] lg:font-semibold">
        Recuperar contraseña
      </h2>
      <p className="mb-24 w-[350px] justify-start font-['Roboto'] text-base leading-tight font-normal text-black lg:mb-20 lg:w-[445px] lg:text-lg">
        Recibirás un código en su casilla. Ingresa el código debajo.
      </p>

      <form className="flex flex-col items-center lg:pl-7" onSubmit={handleSubmit}>
        <CodeInput code={code} handleChange={handleChange} handleKeyDown={handleKeyDown} />
        <button
          type="submit"
          disabled={!isComplete}
          className={`mt-20 mb-0 inline-flex h-12 w-[350px] items-center justify-center rounded-lg lg:mt-20 lg:w-[470px] lg:rounded-xl ${
            !isComplete ? 'cursor-not-allowed bg-[#0011661A]' : 'cursor-pointer bg-[#0655D5]'
          }`}
        >
          <p className={`font-['Roboto'] text-base font-semibold text-white lg:text-2xl`}>
            Verificar código
          </p>
        </button>
        <a className="mt-20 justify-start self-stretch text-center font-['Roboto'] text-sm leading-normal font-bold text-blue-700 underline lg:mt-9">
          Enviar de nuevo
        </a>
      </form>
    </>
  );
}
