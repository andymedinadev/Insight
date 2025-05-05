'use client';

import { useState } from 'react';
import Image from 'next/image';

import { FlechaBaja } from '@/public';

export function PatientProfileLorem() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };
  return (
    <div>
      {/* Collapsible Sections as Accordions */}
      <div className="border-b border-gray-200">
        {/* Motivo de consulta */}
        <button
          onClick={() => toggleSection('motivo')}
          className="flex w-full items-center justify-between p-6 transition-colors hover:cursor-pointer hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold lg:text-2xl">Motivo de consulta</h2>
          <Image
            src={FlechaBaja}
            alt="Flecha Baja"
            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
              openSection === 'motivo' ? 'rotate-180 transform' : ''
            }`}
          />
        </button>
        {openSection === 'motivo' && (
          <div className="animate-accordion-down px-6 pb-6">
            <div className="mb-2">
              <h3 className="font-semibold lg:text-lg">Motivo principal de consulta</h3>
              <p className="text-base text-gray-600 lg:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime iste ipsa explicabo
                ipsum debitis nam perferendis velit, ad atque esse?
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold lg:text-lg">Síntomas actuales</h3>
              <p className="text-base text-gray-600 lg:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, aliquam nam! Deleniti
                adipisci, autem perspiciatis vitae voluptate molestias tempore dolorem.
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold lg:text-lg">Eventos recientes relevantes</h3>
              <p className="text-base text-gray-600 lg:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dignissimos maxime
                eligendi quo illum id, commodi libero. Neque, ducimus ipsa.
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold lg:text-lg">Diagnóstico previo</h3>
              <p className="text-base text-gray-600 lg:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ab laborum inventore
                et a iste qui itaque sunt expedita cumque!
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
          <h2 className="text-xl font-semibold lg:text-2xl">Historia clínica</h2>
          <Image
            src={FlechaBaja}
            alt="Flecha Baja"
            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
              openSection === 'historial' ? 'rotate-180 transform' : ''
            }`}
          />
        </button>
        {openSection === 'historial' && (
          <div className="animate-accordion-down px-6 pb-6">
            <div className="mb-2">
              <h3 className="font-semibold lg:text-lg">Observaciones</h3>
              <p className="text-base text-gray-600 lg:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vero voluptatum
                laboriosam dolorem totam, assumenda magni at enim inventore illo?
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold lg:text-lg">Frases recurrentes / palabras clave</h3>
              <p className="text-base text-gray-600 lg:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique consectetur
                aliquam praesentium, numquam accusamus quis nisi adipisci vitae obcaecati illum.
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold lg:text-lg">Actos fallidos / asociaciones llamativas</h3>
              <p className="text-base text-gray-600 lg:text-lg">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta corporis velit
                dignissimos est praesentium omnis ullam amet rerum repellat libero.
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold lg:text-lg">Interconsultas / derivaciones realizadas</h3>
              <p className="text-base text-gray-600 lg:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, placeat. Iure fuga
                voluptatibus fugiat ipsa quos reiciendis neque nam possimus?
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold lg:text-lg">Evolución del paciente</h3>
              <p className="text-base text-gray-600 lg:text-lg">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. A fugiat at earum maxime
                obcaecati doloremque sunt adipisci aspernatur enim eveniet?
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
          <h2 className="text-xl font-semibold lg:text-2xl">Organización y seguimiento</h2>
          <Image
            src={FlechaBaja}
            alt="Flecha Baja"
            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
              openSection === 'organizacion' ? 'rotate-180 transform' : ''
            }`}
          />
        </button>
        {openSection === 'organizacion' && (
          <div className="animate-accordion-down px-6 pb-6">
            <div className="mb-2">
              <h3 className="font-semibold lg:text-lg">Día y horario de la sesión</h3>
              <p className="text-base text-gray-600 lg:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, at.
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold lg:text-lg">Modalidad de atención</h3>
              <p className="text-base text-gray-600 lg:text-lg">Presencial</p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold lg:text-lg">Duración aproximada de la sesión</h3>
              <p className="text-base text-gray-600 lg:text-lg">30 min</p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold lg:text-lg">Frecuencia de la sesión</h3>
              <p className="text-base text-gray-600 lg:text-lg">Semanal</p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold lg:text-lg">Medio de contacto preferido</h3>
              <p className="text-base text-gray-600 lg:text-lg">Whatsapp</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
