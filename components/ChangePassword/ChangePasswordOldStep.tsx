'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { InputField } from '@/components';

const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(64, 'La contraseña no puede tener más de 64 caracteres')
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/\d/, 'Debe contener al menos un número')
    .matches(/[@$!%*?&]/, 'Debe contener al menos un carácter especial (@$!%*?&)'),
});

export function ChangePasswordOldStep({ onNext }: { onNext: (currentPassword: string) => void }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { currentPassword: '' },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);

      onNext(values.currentPassword);
    },
  });

  return (
    <>
      <h2 className="mb-7 justify-start font-['Roboto'] text-2xl font-bold text-black lg:mb-14 lg:text-3xl lg:leading-[48px] lg:font-semibold">
        Cambiar contraseña
      </h2>

      <p className="mb-12 w-[350px] justify-start font-['Roboto'] text-base leading-tight font-normal text-black lg:mb-14 lg:w-[445px] lg:text-lg">
        Ingresa tu contraseña actual
      </p>

      <form onSubmit={formik.handleSubmit} className="flex flex-col lg:gap-[60px]">
        <InputField
          id="currentPassword"
          label="Contraseña actual"
          type="password"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          hasError={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
          errorMessage={formik.touched.currentPassword ? formik.errors.currentPassword : undefined}
        />
        <button
          type="submit"
          disabled={loading}
          className={`mt-16 flex h-12 w-[350px] items-center justify-center rounded-lg border-none bg-[#0655D5] lg:mt-9 lg:w-[470px] lg:rounded-xl ${loading ? 'cursor-not-allowed' : 'cursor-pointer'} `}
        >
          <p className="justify-start text-center font-['Roboto'] text-base leading-normal font-semibold text-[#FFF] lg:my-2.5 lg:text-2xl lg:leading-7">
            {loading ? 'Cargando...' : 'Continuar'}
          </p>
        </button>
      </form>
    </>
  );
}
