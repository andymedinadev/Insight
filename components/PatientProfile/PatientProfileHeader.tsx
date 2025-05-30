'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { ArrowBack } from '@/public';
import type { BackendPatient } from '@/types';

export function PatientProfileHeader({ patient }: { patient: BackendPatient }) {
  const router = useRouter();

  const handleRedirect = (id: number, queryParam?: string) => {
    let path = `/dashboard/medicalhistory/${id}`;
    if (queryParam) {
      path += `?from=${queryParam}`;
    }
    router.push(path);
  };

  const handleEditClick = () => {
    router.push(`/dashboard/patientprofile/${patient.id}/edit`);
  };

  return (
    <div className="mb-5 border-b border-gray-200 px-5 pt-4 md:overflow-x-hidden lg:border-none lg:pt-12">
      <Link href={'/dashboard/patientlist'}>
        <div className="flex h-10 w-60 items-center gap-3 lg:w-[258px] lg:pl-4 lg:text-nowrap">
          <Image src={ArrowBack} width={24} height={24} alt="Flecha Atrás" className="lg:hidden" />
          <Image
            src={ArrowBack}
            width={40}
            height={40}
            alt="Flecha Atrás"
            className="hidden lg:block"
          />
          <p className="justify-start font-['Roboto'] text-sm leading-normal font-normal text-blue-700 underline lg:text-base">
            Volver al listado de pacientes
          </p>
        </div>
      </Link>
      {/* Header */}
      <h1 className="mt-5 mb-3.5 font-['Roboto'] text-3xl leading-10 font-semibold text-black lg:mx-8 lg:mb-0 lg:font-bold">
        Perfil del paciente
      </h1>

      {/* Botones */}
      <div className="mx-auto mt-3.5 flex w-[352px] flex-col items-center gap-2 lg:mx-8 lg:mt-8 lg:w-full lg:flex-row lg:justify-between lg:gap-8 lg:pb-2">
        <div className="flex w-[352px] flex-col items-center gap-2 lg:w-1/2 lg:flex-row lg:gap-8">
          <button
            onClick={() => {
              if (patient?.id !== undefined) {
                handleRedirect(patient?.id, 'material');
              }
            }}
            className="h-12 w-[352px] cursor-pointer rounded-lg bg-[#0655D5] text-white outline-1 outline-offset-[-1px] lg:w-[205px]"
          >
            <p className="justify-start text-center font-['Roboto'] text-base leading-normal font-semibold">
              Material para el paciente
            </p>
          </button>
          <button
            onClick={() => {
              if (patient?.id !== undefined) {
                handleRedirect(patient?.id, 'notes');
              }
            }}
            className="h-12 w-[352px] cursor-pointer rounded-lg bg-[#0655D5] text-white outline-1 outline-offset-[-1px] lg:w-[205px]"
          >
            <p className="justify-start text-center font-['Roboto'] text-base leading-normal font-semibold">
              Gestionar notas
            </p>
          </button>
        </div>
        <div>
          <div className="hidden h-8 w-40 rounded-lg text-end lg:mr-9 lg:block">
            <button
              onClick={handleEditClick}
              className="cursor-pointer justify-start text-center font-['Roboto'] text-sm leading-tight font-semibold text-[#0655D5] underline"
            >
              Editar perfil del paciente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
