'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { usePatientById, useUpdatePatient } from '@/hooks';
import { PatientProfilePic } from '@/public';
import { transformPatientProfileData } from '@/utils';
import type { PatientProfileData } from '@/types';

export function PatientProfileInfo() {
  const { patient } = usePatientById();
  const { updatePatientData } = useUpdatePatient();

  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState<PatientProfileData | null>(null);
  const [originalData, setOriginalData] = useState<PatientProfileData | null>(null);

  useEffect(() => {
    if (patient) {
      const transformed = transformPatientProfileData(patient);
      setEditableData(transformed);
      setOriginalData(transformed);
    }
  }, [patient]);

  const handleChange = (field: keyof PatientProfileData, value: string) => {
    if (!editableData) return;
    setEditableData({ ...editableData, [field]: value });
  };

  const toggleEdit = () => {
    if (!isEditing && editableData) {
      setOriginalData(editableData);
    } else if (originalData) {
      setEditableData(originalData);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (!editableData) return;

    // TODO: Enviar editableData al backend
    if (patient) {
      const id = Number(patient.id);

      updatePatientData(id, editableData);
    }

    setOriginalData(editableData);
    setIsEditing(false);
  };

  if (!patient || !editableData) return <p>No se encontró el paciente.</p>;

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
              onClick={() => toggleEdit()}
              className="font-bold text-gray-600 underline hover:cursor-pointer"
            >
              {isEditing ? 'Cancelar' : 'Editar'}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="ml-4 font-bold text-blue-600 underline hover:cursor-pointer"
              >
                Guardar
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2">
            <div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Apellido y nombre:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableData.fullName ?? ''}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="rounded border px-2 py-1"
                  />
                ) : (
                  <p>{editableData.fullName}</p>
                )}
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Edad:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableData.age ?? ''}
                    onChange={(e) => handleChange('age', e.target.value)}
                    className="rounded border px-2 py-1"
                  />
                ) : (
                  <p>{editableData.age}</p>
                )}
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Fecha de nacimiento:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableData.birthdate ?? ''}
                    onChange={(e) => handleChange('birthdate', e.target.value)}
                    className="rounded border px-2 py-1"
                  />
                ) : (
                  <p>{editableData.birthdate}</p>
                )}
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Sexo:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableData.sex ?? ''}
                    onChange={(e) => handleChange('sex', e.target.value)}
                    className="rounded border px-2 py-1"
                  />
                ) : (
                  <p>{editableData.sex}</p>
                )}
              </div>
            </div>

            <div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Email:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableData.email ?? ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="rounded border px-2 py-1"
                  />
                ) : (
                  <p>{editableData.email}</p>
                )}
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Número Móvil:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableData.phone ?? ''}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="rounded border px-2 py-1"
                  />
                ) : (
                  <p>{editableData.phone}</p>
                )}
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Modalidad de sesión:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableData.modality ?? ''}
                    onChange={(e) => handleChange('modality', e.target.value)}
                    className="rounded border px-2 py-1"
                  />
                ) : (
                  <p>{editableData.modality}</p>
                )}
              </div>
              <div className="mb-2 flex gap-2">
                <span className="font-medium">Fecha de ingreso:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableData.admissionDate ?? ''}
                    onChange={(e) => handleChange('admissionDate', e.target.value)}
                    className="rounded border px-2 py-1"
                  />
                ) : (
                  <p>{editableData.admissionDate}</p>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <button
              onClick={handleSave}
              className="rounded-md bg-gray-300 py-4 text-lg font-semibold transition-colors hover:cursor-pointer hover:bg-gray-400 lg:hidden"
            >
              Guardar
            </button>
          )}

          <button
            onClick={() => toggleEdit()}
            className="rounded-md bg-gray-300 py-4 text-lg font-semibold transition-colors hover:cursor-pointer hover:bg-gray-400 lg:hidden"
          >
            {isEditing ? 'Cancelar' : 'Editar Datos'}
          </button>
        </div>
      </div>
    </div>
  );
}
