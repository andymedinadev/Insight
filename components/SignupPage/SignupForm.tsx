'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';

import { useSignup } from '@/hooks';
import { signupValidationSchema } from '@/schemas';
import { InputField } from '@/components';
import { SignupFormData } from '@/types';

export function SignupForm() {
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
    <form onSubmit={formik.handleSubmit} className="w-96 max-w-full space-y-5 lg:w-[470px]">
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
        label="Número móvil"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Ingrese su número de teléfono"
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
        errorMessage={formik.touched.repeatPassword ? formik.errors.repeatPassword : undefined}
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
  );
}
