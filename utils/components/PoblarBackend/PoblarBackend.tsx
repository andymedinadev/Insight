'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { poblarPacientes } from '@/utils';
import { mockNewPatients } from '@/mocks';

export function PoblarBackend() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const [isClient, setIsClient] = useState(false);
  const [mockLength, setMockLength] = useState(0);

  useEffect(() => {
    setIsClient(true);
    setMockLength(mockNewPatients.length);
  }, []);

  const handlePoblar = async () => {
    await poblarPacientes(mockNewPatients, dispatch);
  };

  if (!isClient) return null;

  return (
    <div className="m-12 text-center">
      <div className="ml-10">
        <h1 className="mt-8 mb-5 text-3xl font-semibold text-black">
          SOLO USAR ESTE COMPONENTE EN DEV MODE
        </h1>
        <h1 className="mt-8 mb-5 text-3xl font-semibold text-black">Hola, Frontend!</h1>
      </div>

      <div className="flex w-full flex-col items-center gap-4 lg:mb-16 lg:justify-center">
        <p className="m-12 mb-0 text-xl font-semibold text-black">
          Acá es donde backend se enoja con nosotros!
        </p>

        <button
          type="button"
          onClick={handlePoblar}
          disabled={!token}
          className="me-2 mb-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none disabled:opacity-50 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          {token ? `POBLAR BACKEND CON ${mockLength} PACIENTES` : 'No estás autenticado'}
        </button>
      </div>
    </div>
  );
}
