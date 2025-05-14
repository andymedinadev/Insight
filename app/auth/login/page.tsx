'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';

import { useLogin } from '@/hooks/useLogin';
import { InputField } from '@/components';
import { loginValidationSchema } from '@/schemas';
import { BackgroundLogin, Logo as InsightLogo } from '@/public';

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useLogin();

  const [redirecting, setRedirecting] = useState(false);

  const isLoading = loading || redirecting;

  const initialValues = { email: '', password: '' };

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
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
      <div className="mt-9 mb-[68px] flex w-full justify-center px-3 py-5 md:hidden">
        <Image
          src={InsightLogo}
          alt="InsightLogo"
          width={110}
          height={34}
          className="object-contain"
        />
      </div>

      {/* Contenido principal con grid */}
      <div className="grid h-full w-full grid-cols-1 px-6 md:h-screen md:grid-cols-2">
        {/* Columna del formulario */}
        <div className="flex h-full items-center justify-center bg-white lg:m-auto lg:block lg:w-[470px] 2xl:pt-20">
          <div>
            <div className="mt-16 hidden py-7 lg:block">
              {/* LOGO */}
              <Image
                src={InsightLogo}
                alt="InsightLogo"
                width={150}
                height={34}
                className="object-contain"
              />
            </div>
            {/* Formulario */}
            <h2 className="justify-start font-['Roboto'] text-2xl font-bold text-black lg:mt-5 lg:text-3xl lg:leading-[48px] lg:font-semibold">
              Comience su jornada
            </h2>

            <h3 className="mt-8 justify-start font-['Roboto'] text-xl font-semibold text-black lg:mt-12 lg:text-3xl lg:leading-10 lg:font-normal">
              Inicie sesión
            </h3>
            <p className="mt-3 w-[350px] justify-start font-['Roboto'] text-base leading-tight font-normal text-black lg:w-[445px] lg:text-lg">
              Acceda a su cuenta para continuar acompañando a sus pacientes de manera segura y
              eficiente.
            </p>
            <div className="mt-10 justify-start lg:mt-14">
              <span className="font-['Roboto'] text-sm leading-tight font-normal text-red-600 lg:text-base lg:leading-normal">
                *
              </span>
              <span className="font-['Roboto'] text-sm leading-tight font-normal text-black lg:text-base lg:leading-normal">
                {' '}
                Datos Requeridos
              </span>
            </div>

            <form onSubmit={formik.handleSubmit} className="mt-6 w-[350px] space-y-4 lg:w-[470px]">
              <InputField
                type="email"
                label="Email"
                required
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                hasError={formik.touched.email && Boolean(formik.errors.email)}
                errorMessage={formik.touched.email ? formik.errors.email : undefined}
              />

              <InputField
                type="password"
                label="Contraseña"
                required
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                hasError={formik.touched.password && Boolean(formik.errors.password)}
                errorMessage={formik.touched.password ? formik.errors.password : undefined}
              />

              <div className="mt-2.5 pr-4 text-right lg:-mt-2 lg:mb-0 lg:pr-0">
                <a className="justify-start font-['Roboto'] text-sm leading-normal font-bold text-blue-700 underline">
                  ¿Olvidó su contraseña?
                </a>
              </div>

              <div className="mt-6 mb-0 inline-flex h-12 w-[350px] items-center justify-center rounded-lg bg-[#0655D5] lg:mt-8 lg:w-[470px] lg:rounded-xl">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`justify-start border-none text-center font-['Roboto'] text-base leading-normal font-semibold text-white lg:text-2xl lg:leading-7 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'} `}
                >
                  {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
              </div>

              {error && <p className="text-red-500">{error}</p>}

              <div className="m-auto mt-5 flex h-6 w-60 items-center justify-center gap-4">
                <div className="justify-start font-['Roboto'] text-sm leading-tight font-semibold text-black">
                  ¿No tiene una cuenta?
                </div>
                <Link
                  href="signup"
                  className="justify-start font-['Roboto'] text-sm leading-normal font-bold text-blue-700 underline"
                >
                  Registrarse
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Columna decorativa derecha */}
        <div className="relative hidden w-1/2 overflow-hidden lg:block lg:max-h-[1024] lg:max-w-[720px] 2xl:max-h-[1080px] 2xl:max-w-[990px]">
          <Image
            priority
            className="fixed h-full w-full object-fill lg:max-w-[720px] 2xl:max-w-[990px]"
            src={BackgroundLogin}
            alt="Login page Background"
          />
        </div>
      </div>
    </div>
  );
}
