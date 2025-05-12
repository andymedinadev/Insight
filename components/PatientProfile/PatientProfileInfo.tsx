'use client';

// import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// import { usePatientById, useUpdatePatient } from '@/hooks';
import { useNewPatientById } from '@/hooks';
// import { PatientProfilePic } from '@/public';
// import { transformPatientProfileData } from '@/utils';
// import type { PatientProfileData } from '@/types';
// import { mockPatients } from '@/mocks';

function obtenerElementoAleatorio(array: string[]) {
  const indiceAleatorio = Math.floor(Math.random() * array.length);
  return array[indiceAleatorio];
}

export function PatientProfileInfo() {
  const router = useRouter();
  // SE CAYÓ BACKEND , TOCA MOCKEAR
  const { patient } = useNewPatientById();
  // const patient = mockPatients[0];

  const avatars = [
    'https://randomuser.me/api/portraits/men/11.jpg',
    'https://randomuser.me/api/portraits/women/21.jpg',
    'https://randomuser.me/api/portraits/men/31.jpg',
    'https://randomuser.me/api/portraits/women/61.jpg',
    'https://randomuser.me/api/portraits/women/81.jpg',
    'https://randomuser.me/api/portraits/women/12.jpg',
    'https://randomuser.me/api/portraits/women/32.jpg',
    'https://randomuser.me/api/portraits/women/43.jpg',
    'https://randomuser.me/api/portraits/women/63.jpg',
    'https://randomuser.me/api/portraits/men/73.jpg',
    'https://randomuser.me/api/portraits/women/83.jpg',
    'https://randomuser.me/api/portraits/men/93.jpg',
    'https://randomuser.meapi/portraits/women/34.jpg',
  ];

  // const { updatePatientData } = useUpdatePatient();

  // const [isEditing, setIsEditing] = useState(false);
  // const [editableData, setEditableData] = useState<PatientProfileData | null>(null);
  // const [patientData, setPatientData] = useState<PatientProfileData | null>(null);

  // useEffect(() => {
  //   if (patient) {
  //     // acá se transforma el paciente que manda backend
  //     // por el paciente que debo mostrar según diseño
  //     const transformed = transformPatientProfileData(patient);

  //     setPatientData(transformed);
  //   }
  // }, [patient]);

  // const handleChange = (field: keyof PatientProfileData, value: string) => {
  //   if (!editableData) return;
  //   setEditableData({ ...editableData, [field]: value });
  // };

  // const toggleEdit = () => {
  //   if (!isEditing && editableData) {
  //     setOriginalData(editableData);
  //   } else if (originalData) {
  //     setEditableData(originalData);
  //   }
  //   setIsEditing(!isEditing);
  // };

  // const handleSave = () => {
  //   if (!editableData) return;

  //   // TODO: Enviar editableData al backend
  //   if (patient) {
  //     const id = Number(patient.id);

  //     updatePatientData(id, editableData);
  //   }

  //   setOriginalData(editableData);
  //   setIsEditing(false);
  // };

  // if (!patient || !editableData) return <p>No se encontró el paciente.</p>;
  if (!patient)
    return (
      <div className="mt-20 text-center">
        <p className="text-3xl">No se encontró el paciente.</p>
      </div>
    );

  const handleEditClick = () => {
    router.push(`/dashboard/patientprofile/${patient.id}/edit`);
  };

  return (
    <div className="border-b border-gray-200 px-6 md:overflow-x-hidden">
      <div className="flex flex-col items-center md:flex-row lg:mb-20">
        {/* MOBILE ONLY */}
        <div className="flex flex-col justify-between md:flex-row lg:hidden">
          <h2 className="justify-start font-['Roboto'] text-xl leading-7 font-semibold text-black">
            Datos personales
          </h2>
        </div>

        <div className="mt-6 flex flex-col items-center lg:-mt-4 lg:mr-2.5 lg:ml-14 lg:pl-20">
          {/* Picture */}
          <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200 lg:h-32 lg:w-32">
            <Image
              src={obtenerElementoAleatorio(avatars)}
              alt="Foto de perfil"
              width={128}
              height={128}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <div className="px-4 py-2">
            <a className="cursor-pointer font-['Roboto'] text-sm leading-normal font-semibold text-[#0655D5] underline">
              Cambiar foto
            </a>
          </div>
        </div>

        <div>
          {/* DESKTOP ONLY */}
          <div className="hidden lg:mb-4 lg:ml-12 lg:flex lg:items-baseline lg:gap-4">
            <h2 className="justify-start font-['Roboto'] text-2xl leading-7 font-semibold text-black">
              Datos personales
            </h2>
          </div>

          <div className="grid h-auto w-80 gap-3 rounded-lg lg:ml-12 lg:w-[800px] lg:grid-cols-2">
            <span className="text-center font-['Roboto'] text-sm font-normal text-black lg:order-1 lg:col-span-1 lg:justify-start lg:text-left lg:text-base lg:leading-normal">
              Nombre y apellido: {patient.name} {patient.surname}
            </span>
            <span className="text-center font-['Roboto'] text-sm font-normal text-black lg:order-3 lg:col-span-1 lg:justify-start lg:text-left lg:text-base lg:leading-normal">
              Edad: {patient.age} años
            </span>
            <span className="text-center font-['Roboto'] text-sm font-normal text-black lg:order-5 lg:col-span-1 lg:justify-start lg:text-left lg:text-base lg:leading-normal">
              Fecha de nacimiento: {patient.birthdate}
            </span>
            <span className="text-center font-['Roboto'] text-sm font-normal text-black lg:order-7 lg:col-span-1 lg:justify-start lg:text-left lg:text-base lg:leading-normal">
              Nacionalidad: {patient.nationality}
            </span>
            <span className="text-center font-['Roboto'] text-sm font-normal text-black lg:order-9 lg:col-span-1 lg:justify-start lg:text-left lg:text-base lg:leading-normal">
              Tipo de documento: {patient.typeOfIdentification}
            </span>
            {/* SEGUNDA COLUMNA */}
            <span className="text-center font-['Roboto'] text-sm font-normal text-black lg:order-2 lg:col-span-1 lg:justify-start lg:text-left lg:text-base lg:leading-normal">
              N° de documento: {patient.identification}
            </span>
            <span className="text-center font-['Roboto'] text-sm font-normal text-black lg:order-4 lg:col-span-1 lg:justify-start lg:text-left lg:text-base lg:leading-normal">
              Sexo: {patient.sex}
            </span>
            <span className="text-center font-['Roboto'] text-sm font-normal text-black lg:order-6 lg:col-span-1 lg:justify-start lg:text-left lg:text-base lg:leading-normal">
              Email: {patient.email}
            </span>
            <span className="text-center font-['Roboto'] text-sm font-normal text-black lg:order-8 lg:col-span-1 lg:justify-start lg:text-left lg:text-base lg:leading-normal">
              Número móvil: {patient.phone}
            </span>
            <span className="text-center font-['Roboto'] text-sm font-normal text-black lg:order-10 lg:col-span-1 lg:justify-start lg:text-left lg:text-base lg:leading-normal">
              Fecha de ingreso: {patient.admissionDate}
            </span>
            <div className="mt-2 flex justify-center lg:hidden">
              <button
                onClick={handleEditClick}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-[#0655D5] underline"
              >
                Editar perfil del paciente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
