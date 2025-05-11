import { CompletedListArchived } from '@/components';
import React from 'react';

export default function PatientList() {
  return (
    <div>
      <div>
        <div className="mb- mt-3.5 ml-5 lg:mt-9 lg:ml-8">
          <h1 className="text-3xl leading-10 font-semibold text-black lg:leading-[48px]">
            Pacientes archivados
          </h1>
        </div>
      </div>
      <div>
        <CompletedListArchived variant="list" />
      </div>
    </div>
  );
}
