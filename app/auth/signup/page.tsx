'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Button, InputField } from '@/components';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    repeatPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos registro:', { ...formData });
    alert('Registro existoso'); //simulación
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="grid h-full w-full grid-cols-1 lg:ml-24 lg:grid-cols-2">
        <div className="text-center lg:hidden">
          <h1 className="mt-14 mb-16 text-2xl font-bold">INSIGHT</h1>
        </div>
        <div className="flex h-full w-full flex-col justify-center bg-white p-5 pt-0 lg:p-10">
          <h2 className="text-2xl font-bold text-black lg:text-3xl">Bienvenido/a</h2>
          <h3 className="mt-6 text-xl font-medium text-black lg:mt-12 lg:text-2xl lg:font-bold">
            Cree su cuenta
          </h3>
          <p className="mt-2.5 max-w-md text-base leading-tight font-normal tracking-wide text-black lg:mt-5 lg:text-lg">
            Desde aquí podrá gestionar sus pacientes, registrar observaciones y brindar un
            seguimiento personalizado y organizado.
          </p>
          <p className="mt-11 mb-5 text-base font-normal text-black lg:mt-7">*Datos Requeridos</p>
          <form onSubmit={handleSignup} className="w-[445px] max-w-full space-y-4">
            <InputField
              id="name"
              label="Nombre/s"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingrese sus nombre/s"
              required
            />

            <InputField
              id="lastname"
              label="Apellido/s"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Ingrese sus apellido/s"
              required
            />

            <InputField
              id="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingrese su email"
              required
            />

            <InputField
              id="phone"
              label="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ingrese su número de teléfono"
              required
            />

            <InputField
              id="password"
              label="Contraseña"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              required
            />

            <InputField
              id="repeatPassword"
              label="Repetir contraseña"
              value={formData.repeatPassword}
              onChange={handleChange}
              placeholder="Ingrese la contraseña nuevamente"
              required
            />

            <Button className="mt-4 lg:mt-8" type="submit">
              Crear cuenta
            </Button>

            <div className="mt-3 mb-3 flex justify-center text-sm font-medium text-black lg:mt-0 lg:mb-0">
              ¿Ya tiene una cuenta?{' '}
              <Link href="/auth/login" className="ml-5 font-bold underline">
                Iniciar sesión
              </Link>
            </div>
          </form>
        </div>

        {/* Background */}
        <div className="hidden h-full w-full bg-zinc-300 lg:block"></div>
      </div>
    </div>
  );
}
