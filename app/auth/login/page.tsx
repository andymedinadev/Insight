'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login con:', { email, password });
    alert('Login simulado. Revisar consola.');
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Texto "INSIGHT" solo visible en móvil */}
      <div className="mt-8 block text-center font-['Inter'] text-2xl font-semibold text-black md:hidden">
        INSIGHT
      </div>
      k{/* Contenido principal con grid */}
      <div className="grid h-full w-full grid-cols-1 md:h-screen md:grid-cols-2">
        {/* Columna del formulario */}
        <div className="flex h-full items-center justify-center bg-white p-6 sm:p-10">
          <div className="w-full max-w-md">
            <h2 className="font-['Inter'] text-3xl font-medium text-black">Comience su jornada</h2>
            <h3 className="mt-16 mb-2 font-['Inter'] text-2xl font-medium text-black">
              Inicie sesión
            </h3>
            <p className="mt-7 font-['Inter'] text-base leading-tight font-normal tracking-wide text-black">
              Acceda a su cuenta para continuar acompañando a sus pacientes de manera segura y
              eficiente.
            </p>
            <p className="mt-16 mb-5 text-base font-normal text-black">*Datos Requeridos</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-['Inter'] text-base text-black">
                  Correo electrónico o usuario <span className="text-gray-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Ingrese su correo o usuario"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-['Inter'] text-base text-black">
                  Contraseña <span className="text-gray-400">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div className="text-right">
                <a href="#" className="font-['Inter'] text-sm font-bold text-black underline">
                  ¿Olvidó su contraseña?
                </a>
              </div>

              <Button type="submit">Ingresar</Button>

              <div className="mt-4 flex justify-center font-['Inter'] text-sm text-black">
                ¿No tiene cuenta?{' '}
                <Link href="signup" className="ml-1 font-bold underline">
                  Registrarse
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Columna decorativa derecha */}
        <div className="hidden h-full max-h-screen w-full overflow-x-hidden bg-zinc-300 md:block" />
      </div>
    </div>
  );
}
