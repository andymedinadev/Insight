'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';

import { useLogin } from '@/hooks/useLogin';
import { loginValidationSchema } from '@/schemas';
import { InputField } from '@/components';

export function LoginForm() {
  const router = useRouter();

  const { login, loading } = useLogin();

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
    <>
      <div className="mt-10 md:mt-14">
        <span className="text-red-600">*</span>
        <span className="ml-1 font-['Roboto'] text-sm text-black md:text-base">
          Datos requeridos
        </span>
      </div>

      <form onSubmit={formik.handleSubmit} className="mt-6 space-y-5 md:mt-8">
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

        <div className="h-6 justify-start text-right font-['Roboto'] text-sm leading-normal font-bold text-blue-700 underline">
          <Link href={'/auth/forgot-password'}>¿Olvidó su contraseña?</Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`mt-6 flex h-12 w-full items-center justify-center rounded-lg md:mt-8 md:rounded-xl ${
            isLoading ? 'cursor-not-allowed bg-[#0011661A]' : 'cursor-pointer bg-[#0655D5]'
          }`}
        >
          <p className="font-['Roboto'] text-base font-semibold text-white md:text-2xl">
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </p>
        </button>

        <div className="mt-5 flex justify-center gap-4">
          <span className="font-['Roboto'] text-sm font-semibold text-black">
            ¿No tiene una cuenta?
          </span>
          <Link href="signup" className="font-['Roboto'] text-sm font-bold text-blue-700 underline">
            Registrarse
          </Link>
        </div>
      </form>
    </>
  );
}
