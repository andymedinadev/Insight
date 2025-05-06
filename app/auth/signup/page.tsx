'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, InputField } from '@/components';
import { useSignup } from '@/hooks';
import { SignupFormData } from '@/types';

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
          <form onSubmit={formik.handleSubmit} className="w-[445px] max-w-full space-y-4">
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

            <Button type="submit" disabled={isLoading} className="mt-4 lg:mt-8">
              {isLoading ? 'Cargando...' : 'Crear cuenta'}
            </Button>

            {error && <p className="text-red-500">{error}</p>}

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
