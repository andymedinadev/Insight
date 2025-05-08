import { CompletedList } from '@/components';
import React from 'react';

export default function PatientList() {
  return (
    <div>
      <div>
        <div className="mt-3.5 mb-9 ml-5 lg:mt-9 lg:ml-8">
          <h1 className="text-3xl leading-10 font-semibold text-black lg:leading-[48px]">
            Listado de pacientes
          </h1>
        </div>
      </div>
      <div>
        <CompletedList variant="list" />
      </div>
    </div>
  );
}
