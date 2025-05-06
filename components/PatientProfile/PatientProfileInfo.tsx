'use client';

import Image from 'next/image';

import { PatientProfilePic } from '@/public';

export function PatientProfileInfo() {
  return (
    <div className="border-b border-gray-200 px-6">
      {/* Personal Data Section */}
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex flex-col items-start justify-between md:flex-row lg:hidden">
          <h2 className="text-2xl font-semibold md:mb-0">Datos personales</h2>
        </div>

        {/* Profile Image */}
        <div className="flex-shrink-0 lg:mt-10 lg:pl-20">
          <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-200 lg:h-32 lg:w-32">
            <Image
              src={PatientProfilePic}
              alt="Foto de perfil"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Personal Information */}
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
                <span className="font-medium lg:font-semibold">Apellido y nombre:</span>
                <p>Juan Paredes</p>
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Edad:</span>
                <p>32 años</p>
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Fecha de nacimiento:</span>
                <p>10 de Octubre de 1992</p>
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Sexo:</span>
                <p>Masculino</p>
              </div>
            </div>
            <div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Email:</span>
                <p>juan.paredes123@gmail.com</p>
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Número Móvil:</span>
                <p>+52 55 1234 5678</p>
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Modalidad de sesión:</span>
                <p>Presencial</p>
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Fecha de ingreso:</span>
                <p>22/02/2019</p>
              </div>
            </div>
          </div>
        </div>

        <button className="rounded-md bg-gray-300 py-4 text-lg font-semibold transition-colors hover:cursor-pointer hover:bg-gray-400 lg:hidden">
          Editar Datos
        </button>
      </div>
    </div>
  );
}
