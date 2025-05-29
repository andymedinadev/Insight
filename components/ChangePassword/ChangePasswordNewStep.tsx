'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useChangePassword } from '@/hooks';
import { InputField } from '@/components';
import type { ChangePasswordPayload } from '@/types';

interface NewPasswordStepProps {
  payload: ChangePasswordPayload;
  onNext: () => void;
}

const validationSchema = Yup.object({
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

export function ChangePasswordNewStep({ payload, onNext }: NewPasswordStepProps) {
  const { changePassword, loading } = useChangePassword();

  const formik = useFormik({
    initialValues: { password: '', repeatPassword: '' },
    validationSchema: validationSchema,
    onSubmit: async ({ password, repeatPassword }) => {
      const lastPayload: ChangePasswordPayload = {
        ...payload,
        newPassword: password,
        confirmNewPassword: repeatPassword,
      };
      console.log('🚀 ~ onSubmit: ~ lastPayload:', lastPayload);

      const success = await changePassword(lastPayload);

      if (success) {
        onNext();
      }
    },
  });

  return (
    <>
      <h2 className="mt-14 justify-start font-['Roboto'] text-2xl font-bold text-black lg:text-3xl lg:leading-[48px] lg:font-semibold">
        Nueva contraseña
      </h2>
      <p className="mt-3 w-[350px] justify-start font-['Roboto'] text-base leading-tight font-normal text-black lg:mt-8 lg:w-[539px] lg:text-lg">
        La verificación fue exitosa. <br className="lg:hidden" />
        Ingresa tu nueva contraseña debajo.
      </p>

      <form
        className="mt-14 flex flex-col gap-[52px] lg:mt-8 lg:gap-[31px]"
        onSubmit={formik.handleSubmit}
      >
        <InputField
          id="password"
          label="Nueva contraseña"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Debe tener 8 caracteres como mínimo"
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
          required
          hasError={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
          errorMessage={formik.touched.repeatPassword ? formik.errors.repeatPassword : undefined}
        />

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 flex h-12 w-[350px] items-center justify-center rounded-lg border-none bg-[#0655D5] lg:mt-0 lg:w-[470px] lg:rounded-xl ${loading ? 'cursor-not-allowed' : 'cursor-pointer'} `}
        >
          <p className="justify-start text-center font-['Roboto'] text-base leading-normal font-semibold text-[#FFF] lg:my-2.5 lg:text-2xl lg:leading-7">
            {loading ? 'Cargando...' : 'Continuar'}
          </p>
        </button>
      </form>
    </>
  );
}
