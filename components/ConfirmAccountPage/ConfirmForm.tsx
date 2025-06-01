'use client';

import { CodeInput } from '@/components';

interface ConfirmFormProps {
  code: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  isComplete: boolean;
  isLoading: boolean;
}

export function ConfirmForm({
  code,
  handleChange,
  handleSubmit,
  handleKeyDown,
  isComplete,
  isLoading,
}: ConfirmFormProps) {
  return (
    <form className="mt-20 flex flex-col items-center" onSubmit={handleSubmit}>
      <CodeInput code={code} handleChange={handleChange} handleKeyDown={handleKeyDown} />
      <button
        type="submit"
        disabled={!isComplete || isLoading}
        className={`mt-20 mb-16 inline-flex h-12 w-[350px] items-center justify-center rounded-lg lg:mt-20 lg:w-[470px] lg:rounded-xl ${
          !isComplete ? 'cursor-not-allowed bg-[#0011661A]' : 'cursor-pointer bg-[#0655D5]'
        }`}
      >
        <p className={`font-['Roboto'] text-base font-semibold text-white lg:text-2xl`}>
          {isLoading ? 'Cargando...' : 'Verificar código'}
        </p>
      </button>
    </form>
  );
}
