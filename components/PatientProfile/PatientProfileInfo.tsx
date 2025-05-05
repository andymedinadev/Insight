'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { PatientProfilePic } from '@/public';
import { usePatientById } from '@/hooks/usePatientById';
import { transformPatientProfileData, backendResponse } from '@/utils/transformPatientProfileData';
import { useUpdatePatient } from '@/hooks/useUpdatePatient';

export function PatientProfileInfo() {
  const M: 'M' | 'F' = 'M';

  const initialFormValues = {
    name: '',
    surname: '',
    birthdate: '',
    sex: M,
    email: '',
    phone: '',
    modality: '',
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialFormValues);

  const { error, loading, patient, initialized, id } = usePatientById();
  const { updatePatientData } = useUpdatePatient();

  useEffect(() => {
    if (patient) {
      const data = transformPatientProfileData(patient as unknown as backendResponse);

      setFormData({
        name: data.fullName.split(' ')[0],
        surname: data.fullName.split(' ')[1],
        birthdate: data.birthdate.split('T')[0], // <- usamos solo fecha
        sex: 'M',
        email: data.email,
        phone: data.phone,
        modality: data.modality,
      });
    }
  }, [patient]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = async () => {
    if (!id) return;

    let formattedBirthdate = new Date(formData.birthdate).toISOString();

    if (formattedBirthdate === 'Invalid Date') {
      formattedBirthdate = '1990-01-01T00:00:00.000Z';
    }

    await updatePatientData(id, {
      ...formData,
      birthdate: formattedBirthdate,
    });

    setIsEditing(false);
  };

  if (!initialized) return <p>Cargando...</p>;
  if (loading) return <p>Cargando paciente...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!patient) return <p>No se encontró el paciente.</p>;

  const patientProfileData = transformPatientProfileData(patient as unknown as backendResponse);

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
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="font-bold text-gray-600 underline hover:cursor-pointer"
            >
              {isEditing ? 'Cancelar' : 'Editar'}
            </button>
            {isEditing && (
              <button
                onClick={handleEdit}
                className="ml-4 font-bold text-blue-600 underline hover:cursor-pointer"
              >
                Guardar
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2">
            <div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium lg:font-semibold">Apellido y nombre:</span>
                <p>{patientProfileData.fullName}</p>
              </div>

              <div className="mb-2 flex gap-2">
                <span className="font-medium">Edad:</span>
                <p>{patientProfileData.age}</p>
              </div>

              <div className="mb-2 flex gap-2">
                <span className="font-medium">Fecha de nacimiento:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.birthdate}
                    onChange={(e) => handleChange('birthdate', e.target.value)}
                    className="w-full rounded border px-2 py-1"
                  />
                ) : (
                  <p>{formData.birthdate}</p>
                )}
              </div>

              <div className="mb-2 flex gap-2">
                <span className="font-medium">Sexo:</span>
                <p>{patientProfileData.sex}</p>
              </div>
            </div>

            <div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Email:</span>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full rounded border px-2 py-1"
                  />
                ) : (
                  <p>{formData.email}</p>
                )}
              </div>

              <div className="mb-2 flex gap-2">
                <span className="font-medium">Número Móvil:</span>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full rounded border px-2 py-1"
                  />
                ) : (
                  <p>{formData.phone}</p>
                )}
              </div>

              <div className="mb-2 flex gap-2">
                <span className="font-medium">Modalidad de sesión:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.modality}
                    onChange={(e) => handleChange('modality', e.target.value)}
                    className="w-full rounded border px-2 py-1"
                  />
                ) : (
                  <p>{formData.modality}</p>
                )}
              </div>

              {isEditing ? (
                <></>
              ) : (
                <div className="mb-2 flex gap-2">
                  <span className="font-medium">Fecha de ingreso:</span>
                  <p>{patientProfileData.admissionDate}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <button
            onClick={handleEdit}
            className="rounded-md bg-gray-300 py-4 text-lg font-semibold transition-colors hover:cursor-pointer hover:bg-gray-400 lg:hidden"
          >
            Guardar
          </button>
        )}

        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="rounded-md bg-gray-300 py-4 text-lg font-semibold transition-colors hover:cursor-pointer hover:bg-gray-400 lg:hidden"
        >
          {isEditing ? 'Cancelar' : 'Editar Datos'}
        </button>
      </div>
    </div>
  );
}
