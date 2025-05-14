'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';

import { InputField } from '@/components';
import { useSignup } from '@/hooks';
import { signupValidationSchema } from '@/schemas';
import { SignupFormData } from '@/types';

import { BackgroundSignup, Logo as InsightLogo } from '@/public';

export default function SignupPage() {
  const router = useRouter();
  const { signup, loading, error } = useSignup();

  const [redirecting, setRedirecting] = useState(false);

  const isLoading = loading || redirecting;

  const initialValues = {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    repeatPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signupValidationSchema,
    onSubmit: async (formData: SignupFormData) => {
      const successSignup = await signup(formData);

      if (successSignup) {
        setRedirecting(true);
        router.push('/auth/confirm-account');
      }
    },
  });

  return (
    <div className="flex min-h-screen items-stretch justify-center overflow-hidden bg-white 2xl:items-start">
      {/* Form Section */}
      <div className="flex h-full w-full flex-col lg:h-full lg:w-1/2 lg:flex-row 2xl:mt-20">
        {/* Logo Mobile */}
        <div className="mt-9 mb-12 ml-32 px-3 py-5 text-center lg:hidden">
          <Image src={InsightLogo} width={110} height={34} alt="Insight Logo" />
        </div>
        {/* Page */}
        <div className="flex h-full w-full flex-col justify-center bg-white p-5 pt-0 pb-10 lg:mt-10 lg:ml-24 2xl:pl-40">
          {/* Encabezado */}
          <div className="justify-start font-['Roboto'] text-2xl font-bold text-black lg:flex lg:items-start lg:justify-between lg:text-3xl lg:leading-[48px] lg:font-semibold">
            <h2>Bienvenido/a</h2>
            <Image
              className="ml-2 hidden object-cover lg:block"
              src={InsightLogo}
              width={150}
              height={47}
              alt="Insight Logo"
            />
          </div>

          <div className="mt-6 justify-start font-['Roboto'] text-xl font-semibold text-black lg:mt-6 lg:text-3xl lg:leading-10 lg:font-normal">
            <h3>Regístrese</h3>
          </div>

          <div className="mt-2.5 w-[350px] justify-start font-['Roboto'] text-base leading-tight font-normal text-black lg:mt-5 lg:w-[448px] lg:text-lg">
            <p>
              Desde aquí podrá gestionar sus pacientes, registrar observaciones y brindar un
              seguimiento personalizado y organizado.
            </p>
          </div>

          <div className="mt-11 mb-5 justify-start font-['Roboto'] text-base leading-tight font-normal text-black lg:mt-6 lg:leading-normal">
            <span className="text-red-600">*</span>
            <span> Datos Requeridos</span>
          </div>

          {/* Formulario */}
          <form onSubmit={formik.handleSubmit} className="w-96 max-w-full space-y-4 lg:w-[470px]">
            <InputField
              id="name"
              label="Nombre/s"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingrese sus nombre/s"
              required
              hasError={formik.touched.name && Boolean(formik.errors.name)}
              errorMessage={formik.touched.name ? formik.errors.name : undefined}
            />

            <InputField
              id="lastname"
              label="Apellido/s"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingrese sus apellido/s"
              required
              hasError={formik.touched.lastname && Boolean(formik.errors.lastname)}
              errorMessage={formik.touched.lastname ? formik.errors.lastname : undefined}
            />

            <InputField
              id="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingrese su email"
              required
              hasError={formik.touched.email && Boolean(formik.errors.email)}
              errorMessage={formik.touched.email ? formik.errors.email : undefined}
            />

            <InputField
              id="phone"
              label="Teléfono"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingrese su número de teléfono"
              required
              hasError={formik.touched.phone && Boolean(formik.errors.phone)}
              errorMessage={formik.touched.phone ? formik.errors.phone : undefined}
            />

            <InputField
              id="password"
              label="Contraseña"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingrese su contraseña"
              required
              hasError={formik.touched.password && Boolean(formik.errors.password)}
              errorMessage={formik.touched.password ? formik.errors.password : undefined}
            />

            <InputField
              id="repeatPassword"
              label="Repetir contraseña"
              type="password"
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingrese la contraseña nuevamente"
              required
              hasError={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
              errorMessage={
                formik.touched.repeatPassword ? formik.errors.repeatPassword : undefined
              }
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`mt-4 flex h-12 w-[350px] items-center justify-center rounded-lg border-none bg-[#0655D5] lg:mt-9 lg:w-[470px] lg:rounded-xl ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'} `}
            >
              <p className="justify-start text-center font-['Roboto'] text-base leading-normal font-semibold text-[#FFF] lg:my-2.5 lg:text-2xl lg:leading-7">
                {isLoading ? 'Cargando...' : 'Registrarse'}
              </p>
            </button>

            {error && <p className="text-red-500">{error}</p>}

            <div className="mt-3 mb-3 flex items-center justify-center text-sm font-medium text-black lg:mt-0 lg:mb-0">
              <div className="justify-start font-['Roboto'] text-sm leading-tight font-semibold text-black">
                ¿Ya tiene una cuenta?
              </div>
              <Link
                className="ml-5 justify-start font-['Roboto'] text-sm leading-normal font-bold text-blue-700 underline"
                href="/auth/login"
              >
                Iniciar sesión
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Background Image */}
      {/* Background */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block lg:max-h-[1024] lg:max-w-[720px] 2xl:max-h-[1080px] 2xl:max-w-[990px]">
        <Image
          priority
          className="fixed h-full w-full object-fill lg:max-w-[720px] 2xl:max-w-[990px]"
          src={BackgroundSignup}
          alt="Signup page Background"
        />
      </div>
    </div>
  );
}
