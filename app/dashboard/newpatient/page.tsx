import React from 'react';
import { FormPatient } from '@/components';

export default function NewPatient() {
  return (
    <div>
      <h1 className="mt-8 mb-8 ml-10 text-[26px] leading-[26px] font-semibold">
        Formulario paciente nuevo
      </h1>

      <FormPatient />
    </div>
  );
}
