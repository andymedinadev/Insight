'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, InputField } from '@/components';
import { useSignup } from '@/hooks';
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

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('El nombre es obligatorio')
      .matches(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]+$/, 'El nombre solo puede contener letras')
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(50, 'El nombre no puede tener más de 50 caracteres'),

    lastname: Yup.string()
      .required('El apellido es obligatorio')
      .matches(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]+$/, 'El apellido solo puede contener letras')
      .min(2, 'El apellido debe tener al menos 2 caracteres')
      .max(50, 'El apellido no puede tener más de 50 caracteres'),

    phone: Yup.string()
      .required('El teléfono es obligatorio')
      .min(7, 'El teléfono debe tener al menos 7 caracteres')
      .matches(
        /^\+?\d{7,15}$/,
        'El teléfono debe contener solo números y puede incluir un "+" al inicio'
      )
      .max(15, 'El teléfono no puede tener más de 15 dígitos'),

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

    repeatPassword: Yup.string()
      .required('Debes repetir la contraseña')
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (formData: SignupFormData) => {
      const successSignup = await signup(formData);

      if (successSignup) {
        setRedirecting(true);
        router.push('/dashboard/home');
      }
    },
  });

  return (
    <div className="flex min-h-screen items-stretch justify-center bg-white 2xl:items-start">
      {/* Form */}
      <div className="flex h-full w-full flex-col lg:h-full lg:w-1/2 lg:flex-row">
        {/* Logo Mobile */}
        <div className="mt-9 mb-12 ml-32 px-3 py-5 text-center lg:hidden">
          <Image src={InsightLogo} width={110} height={34} alt="Insight Logo" />
        </div>
        {/* Page */}
        <div className="flex h-full w-full flex-col justify-center bg-white p-5 pt-0 lg:mt-10 lg:ml-24 2xl:pl-40">
          <div className="justify-start font-['Roboto'] text-2xl font-bold text-black lg:flex lg:items-start lg:justify-between lg:text-3xl lg:leading-[48px] lg:font-semibold">
            <h2>Bienvenido/a</h2>
            <Image
              className="-mt-6 -mr-2 hidden px-4 py-7 lg:block"
              src={InsightLogo}
              width={150}
              height={47}
              alt="Insight Logo"
            />
          </div>
          <div className="mt-6 justify-start font-['Roboto'] text-xl font-semibold text-black lg:mt-0 lg:text-3xl lg:leading-10 lg:font-normal">
            <h3>Regístrese</h3>
          </div>
          <div className="mt-2.5 w-[350px] justify-start font-['Roboto'] text-base leading-tight font-normal text-black lg:mt-5 lg:w-[448px] lg:text-lg">
            <p>
              Desde aquí podrá gestionar sus pacientes, registrar observaciones y brindar un
              seguimiento personalizado y organizado.
            </p>
          </div>
          <div className="mt-11 mb-5 justify-start font-['Roboto'] text-base leading-tight font-normal text-black lg:mt-6 lg:leading-normal">
            <p>*Datos Requeridos</p>
          </div>
          <form onSubmit={formik.handleSubmit} className="w-96 max-w-full space-y-4 lg:w-[470px]">
            <InputField
              id="name"
              label="Nombre/s"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingrese sus nombre/s"
              required
            />

            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
            )}

            <InputField
              id="lastname"
              label="Apellido/s"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingrese sus apellido/s"
              required
            />

            {formik.touched.lastname && formik.errors.lastname && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.lastname}</p>
            )}

            <InputField
              id="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingrese su email"
              required
            />

            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
            )}

            <InputField
              id="phone"
              label="Teléfono"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingrese su número de teléfono"
              required
            />

            {formik.touched.phone && formik.errors.phone && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
            )}

            <InputField
              id="password"
              label="Contraseña"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingrese su contraseña"
              required
            />

            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
            )}

            <InputField
              id="repeatPassword"
              label="Repetir contraseña"
              type="password"
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingrese la contraseña nuevamente"
              required
            />

            {formik.touched.repeatPassword && formik.errors.repeatPassword && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.repeatPassword}</p>
            )}

            <Button type="submit" disabled={isLoading} className="mt-4 flex border-none lg:mt-4">
              <div className="inline-flex h-12 w-96 items-center justify-center rounded-lg bg-[#0655D5] lg:w-[470px] lg:rounded-xl">
                <div className="flex items-center justify-center gap-1 self-stretch rounded-lg px-4 lg:rounded-xl lg:px-6">
                  <div className="flex items-center justify-center gap-2 px-1">
                    <div className="justify-start text-center font-['Roboto'] text-base leading-normal font-semibold text-[#FFF] lg:my-2.5 lg:text-2xl lg:leading-7">
                      {isLoading ? 'Cargando...' : 'Registrarse'}
                    </div>
                  </div>
                </div>
              </div>
            </Button>

            {error && <p className="text-red-500">{error}</p>}

            <div className="mt-3 mb-3 flex items-center justify-center text-sm font-medium text-black lg:mt-0 lg:mb-0">
              <div className="justify-start font-['Roboto'] text-sm leading-tight font-semibold text-black">
                ¿Ya tiene una cuenta?
              </div>
              <Link
                className="ml-5 justify-start font-['Roboto'] text-sm leading-normal font-bold text-blue-700 underline"
                href={'/auth/login'}
              >
                Iniciar sesión
              </Link>
            </div>
          </form>
        </div>
      </div>

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
