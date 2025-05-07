import React from 'react';
import { FormPatient } from '@/components';

export default function NewPatient() {
  return (
    <div>
      <h1 className="mt-8 mb-0 ml-8 text-[20px] font-semibold sm:mb-8 sm:ml-10 sm:text-[26px] sm:leading-[26px]">
        Formulario paciente nuevo
      </h1>

      <FormPatient />
    </div>
  );
}
