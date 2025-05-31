'use client';

import { useState } from 'react';
import Image from 'next/image';

import { FlechaBaja } from '@/public';
import type { FrontendPatient } from '@/types';

export function PatientProfileLorem({ patient }: { patient: FrontendPatient }) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div>
      {/* Motivo de consulta */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('motivo')}
          className="flex w-full items-center justify-between p-6 transition-colors hover:cursor-pointer hover:bg-gray-50"
        >
          <h2 className="justify-start font-['Roboto'] text-xl leading-7 font-semibold text-[#000F27]/90 lg:text-2xl">
            Motivo de consulta
          </h2>
          <Image
            src={FlechaBaja}
            alt="Flecha Baja"
            className={`h-6 w-6 text-gray-500 transition-transform duration-200 ${
              openSection === 'motivo' ? 'rotate-180 transform' : ''
            }`}
          />
        </button>
        {openSection === 'motivo' && (
          <div className="animate-accordion-down px-6 pb-6">
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">
                Motivo principal de consulta
              </h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.principalMotive || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">Síntomas actuales</h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.actualSymptoms || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">
                Eventos recientes relevantes
              </h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.recentEvents || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">Diagnóstico previo</h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.previousDiagnosis || '(vacío)'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Historial clínico */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('historial')}
          className="flex w-full items-center justify-between p-6 transition-colors hover:cursor-pointer hover:bg-gray-50"
        >
          <h2 className="justify-start font-['Roboto'] text-xl leading-7 font-semibold text-[#000F27]/90 lg:text-2xl">
            Historia clínica
          </h2>
          <Image
            src={FlechaBaja}
            alt="Flecha Baja"
            className={`h-6 w-6 text-gray-500 transition-transform duration-200 ${
              openSection === 'historial' ? 'rotate-180 transform' : ''
            }`}
          />
        </button>
        {openSection === 'historial' && (
          <div className="animate-accordion-down px-6 pb-6">
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">Observaciones</h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.profesionalObservations || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">
                Frases recurrentes / palabras clave
              </h3>
              <p className="text-base text-[#59616f] lg:text-lg">{patient.keyWords || '(vacío)'}</p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">
                Actos fallidos / asociaciones llamativas
              </h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.failedActs || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">
                Interconsultas / derivaciones realizadas
              </h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.interconsulation || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">Evolución del paciente</h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.patientEvolution || '(vacío)'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Organización y seguimiento */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('organizacion')}
          className="flex w-full items-center justify-between p-6 transition-colors hover:cursor-pointer hover:bg-gray-50"
        >
          <h2 className="justify-start font-['Roboto'] text-xl leading-7 font-semibold text-[#000F27]/90 lg:text-2xl">
            Organización y seguimiento
          </h2>
          <Image
            src={FlechaBaja}
            alt="Flecha Baja"
            className={`h-6 w-6 text-gray-500 transition-transform duration-200 ${
              openSection === 'organizacion' ? 'rotate-180 transform' : ''
            }`}
          />
        </button>
        {openSection === 'organizacion' && (
          <div className="animate-accordion-down px-6 pb-6">
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">
                Día y horario de la sesión
              </h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.sessionDay || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">Modalidad de atención</h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {' '}
                {patient.modality || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">
                Duración aproximada de la sesión
              </h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {' '}
                {patient.sessionDuration || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">Frecuencia de la sesión</h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {' '}
                {patient.sessionFrequency || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">
                Medio de contacto preferido
              </h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {' '}
                {patient.preferedContact || '(vacío)'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
