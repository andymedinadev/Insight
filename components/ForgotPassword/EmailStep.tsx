'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useRequestReset } from '@/hooks';
import { InputField } from '@/components';

const emailValidation = Yup.object({
  email: Yup.string()
    .required('El correo electrónico es obligatorio')
    .email('Debe ser un correo electrónico válido')
    .max(50, 'El correo no puede tener más de 50 caracteres'),
});

export function EmailStep({ onNext }: { onNext: (email: string) => void }) {
  const [loading, setLoading] = useState(false);

  const { requestReset } = useRequestReset();

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: emailValidation,
    onSubmit: async (values) => {
      setLoading(true);

      const successRequest = await requestReset(values.email);

      if (successRequest) {
        onNext(values.email);
      }
    },
  });

  return (
    <>
      <h2 className="mb-7 justify-start font-['Roboto'] text-2xl font-bold text-black lg:mb-14 lg:text-3xl lg:leading-[48px] lg:font-semibold">
        Recuperar contraseña
      </h2>

      <p className="mb-12 w-[350px] justify-start font-['Roboto'] text-base leading-tight font-normal text-black lg:mb-14 lg:w-[445px] lg:text-lg">
        Para recuperar tu contraseña, ingresa el email que utilizaste para crear tu cuenta.
        Recibirás un código en tu casilla.
      </p>

      <form onSubmit={formik.handleSubmit} className="flex flex-col lg:gap-[60px]">
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
