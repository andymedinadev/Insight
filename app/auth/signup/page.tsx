'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Button, InputField } from '@/components';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
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
      <div className="ml-36 grid h-full w-full grid-cols-1 md:grid-cols-2">
        <div className="flex h-full w-full flex-col justify-center bg-white p-10">
          <h2 className="text-3xl font-medium text-black">Bienvenido/a</h2>
          <h3 className="mt-16 mb-2 text-2xl font-medium text-black">Cree su cuenta</h3>
          <p className="mt-7 max-w-md text-base leading-tight font-normal tracking-wide text-black">
            Desde aquí podrá gestionar sus pacientes, registrar observaciones y brindar un
            seguimiento personalizado y organizado.
          </p>
          <p className="mt-16 mb-5 text-base font-normal text-black">*Datos Requeridos</p>
          <form onSubmit={handleSignup} className="w-96 max-w-full space-y-4">
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
              id="password"
              label="Contraseña"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              required
            />

            <Button type="submit">Crear cuenta</Button>

            <div className="mt-4 flex justify-center text-sm text-black">
              ¿Ya tiene una cuenta?{' '}
              <Link href="/auth/login" className="ml-1 font-bold underline">
                Iniciar sesión
              </Link>
            </div>
          </form>
        </div>

        {/* Background */}
        <div className="hidden h-full w-full bg-zinc-300 md:block"></div>
      </div>
    </div>
  );
}
