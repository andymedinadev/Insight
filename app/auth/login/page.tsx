'use client';

<<<<<<< HEAD
import React, { useState } from "react";
import Button from "@/components/ui/Button";
=======
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
>>>>>>> dd23eb3023bff4ed424302919c642ce823cd0fba

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login con:', { email, password });
    alert('Login simulado. Revisar consola.');
  };

  return (
<<<<<<< HEAD
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col-reverse md:grid md:grid-cols-2 w-full h-full">        {/* Formulario */}
      <div className="bg-white p-6 md:p-10 flex flex-col justify-center items-center w-full h-full md:mt-[24px] ">
      <div className="w-full max-w-md">
          <h2 className="text-3xl font-medium font-['Inter'] text-black md:mt-[24px]">
              Comience su jornada
            </h2>



            <h3 className="text-2xl font-medium font-['Inter'] text-black mb-2 mt-10 md:mt-16">
              Inicie sesión
            </h3>
            <p className="text-base font-normal text-black tracking-wide leading-tight font-['Inter'] mt-6 md:mt-7">
              Acceda a su cuenta para continuar acompañando a sus pacientes de manera segura y eficiente.
            </p>

            <p className="text-base font-normal text-black mb-5 mt-10 md:mt-16">
              *Datos Requeridos
            </p>

            <form onSubmit={handleLogin} className="space-y-4 w-full">
              <div>
                <label className="block text-base font-['Inter'] text-black">
                  Correo electrónico o usuario <span className="text-gray-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Ingrese su correo o usuario"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full h-12 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-['Inter'] text-black">
                  Contraseña <span className="text-gray-400">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full h-12 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="text-right">
                <a href="#" className="text-sm font-bold underline text-black font-['Inter']">
                  ¿Olvidó su contraseña?
                </a>
              </div>

              <Button type="submit">Ingresar</Button>

              <div className="flex justify-center mt-4 text-sm text-black font-['Inter']">
                ¿No tiene cuenta?
                <a href="#" className="ml-1 font-bold underline">
                  Registrarse
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Imagen o fondo visual */}
          <div className="block md:block bg-zinc-300 w-full h-1/3 md:h-full pb-6 md:pb-0" />
        </div>
=======
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="ml-36 grid h-full w-full grid-cols-1 md:grid-cols-2">
        <div className="flex h-full w-full flex-col justify-center bg-white p-10">
          {' '}
          {/* Formulario de inicio de sesión */}
          <h2 className="font-['Inter'] text-3xl font-medium text-black">Comience su jornada</h2>
          <h3 className="mt-16 mb-2 font-['Inter'] text-2xl font-medium text-black">
            Inicie sesión
          </h3>
          <p className="mt-7 max-w-md font-['Inter'] text-base leading-tight font-normal tracking-wide text-black">
            Acceda a su cuenta para continuar acompañando a sus pacientes de manera segura y
            eficiente.
          </p>
          <p className="mt-16 mb-5 text-base font-normal text-black">*Datos Requeridos</p>
          <form onSubmit={handleLogin} className="w-96 max-w-full space-y-4">
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
              <a href="#" className="ml-1 font-bold underline">
                Registrarse
              </a>
            </div>
          </form>
        </div>

        <div className="hidden h-full w-full bg-zinc-300 md:block"></div>
      </div>
>>>>>>> dd23eb3023bff4ed424302919c642ce823cd0fba
    </div>
  );
}
