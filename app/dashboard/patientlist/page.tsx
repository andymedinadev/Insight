import { CompletedList } from '@/components';
import React from 'react';

export default function PatientList() {
  return (
    <div>
      <div>
        <h1 className="mt-8 mb-10 ml-2.5 text-xl font-semibold text-black lg:mt-12 lg:ml-14 lg:text-2xl lg:font-bold">
          Listado de pacientes
        </h1>
      </div>
      <div>
        <CompletedList variant="list" />
      </div>
    </div>
  );
}
