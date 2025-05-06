'use client';

import Image from 'next/image';
import { PatientProfilePic } from '@/public';
import { usePatientById } from '@/hooks/usePatientById';
import { transformPatientProfileData } from '@/utils/transformPatientProfileData';

export function PatientProfileInfo() {
  const { patient } = usePatientById();

  if (!patient) return <p>No se encontró el paciente.</p>;

  const { fullName, age, birthdate, sex, email, phone, modality, admissionDate } =
    transformPatientProfileData(patient);

  return (
    <div className="border-b border-gray-200 px-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex flex-col items-start justify-between md:flex-row lg:hidden">
          <h2 className="text-2xl font-semibold md:mb-0">Datos personales</h2>
        </div>

        <div className="flex-shrink-0 lg:mt-10 lg:pl-20">
          <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-200 lg:h-32 lg:w-32">
            <Image
              src={PatientProfilePic}
              alt="Foto de perfil"
              width={128}
              height={128}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex-grow lg:pl-10">
          <div className="hidden lg:mb-6 lg:flex lg:items-baseline lg:gap-4">
            <h2 className="text-2xl font-bold">Datos personales</h2>
            <button className="font-bold text-gray-600 underline hover:cursor-pointer">
              Editar
            </button>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2">
            <div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Apellido y nombre:</span>
                <p>{fullName}</p>
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Edad:</span>
                <p>{age}</p>
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Fecha de nacimiento:</span>
                <p>{birthdate.split('T')[0]}</p>
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Sexo:</span>
                <p>{sex ?? 'M'}</p>
              </div>
            </div>

            <div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Email:</span>
                <p>{email}</p>
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Número Móvil:</span>
                <p>{phone}</p>
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Modalidad de sesión:</span>
                <p>{modality}</p>
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Fecha de ingreso:</span>
                <p>{admissionDate}</p>
              </div>
            </div>
          </div>

          <button className="rounded-md bg-gray-300 py-4 text-lg font-semibold transition-colors hover:cursor-pointer hover:bg-gray-400 lg:hidden">
            Editar Datos
          </button>
        </div>
      </div>
    </div>
  );
}
