'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useLogin } from '@/hooks/useLogin';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useLogin();

  const [redirecting, setRedirecting] = useState(false);

  const isLoading = loading || redirecting;

  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('El correo electrónico es obligatorio')
      .email('Debe ser un correo electrónico válido')
      .max(254, 'El correo no puede tener más de 254 caracteres'),
    password: Yup.string()
      .required('La contraseña es obligatoria')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(64, 'La contraseña no puede tener más de 64 caracteres')
      .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
      .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
      .matches(/\d/, 'Debe contener al menos un número')
      .matches(/[@$!%*?&]/, 'Debe contener al menos un carácter especial (@$!%*?&)'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async ({ email, password }) => {
      const successLogin = await login(email, password);

      if (successLogin) {
        setRedirecting(true);
        router.push('/dashboard/home');
      }
    },
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Texto "INSIGHT" solo visible en móvil */}
      <div className="mt-8 flex w-full justify-center md:hidden">
        <Image
          src="/icons/Logo.svg"
          alt="Logo"
          width={128}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Contenido principal con grid */}
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

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block font-['Inter'] text-base text-black">
                  Correo electrónico o usuario <span className="text-gray-400">*</span>
                </label>
                <input
                  name="email"
                  id="email"
                  placeholder="Ingrese su correo o usuario"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  className="mt-1 h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block font-['Inter'] text-base text-black">
                  Contraseña <span className="text-gray-400">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Ingrese su contraseña"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  className="mt-1 h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
                )}
              </div>

              <div className="text-right">
                <a href="#" className="font-['Inter'] text-sm font-bold text-[#0655D5] underline">
                  ¿Olvidó su contraseña?
                </a>
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
              </Button>

              {error && <p className="text-red-500">{error}</p>}

              <div className="mt-4 flex justify-center font-['Inter'] text-sm text-black">
                ¿No tiene cuenta?{' '}
                <Link href="signup" className="ml-1 font-bold text-[#0655D5] underline">
                  Registrarse
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Columna decorativa derecha */}
        <div className="relative hidden h-full w-full overflow-hidden md:block">
          <Image src="/login.jpg" alt="Imagen decorativa" fill className="object-cover" priority />
        </div>
      </div>
    </div>
  );
}
