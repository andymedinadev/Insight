'use client';

import { useState } from 'react';
import Image from 'next/image';

import { FlechaBaja } from '@/public';
// import { useNewPatientById } from '@/hooks';

export function PatientProfileLorem() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  // const { patient } = useNewPatientById();

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  if (!patient) {
    return null;
  }

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
                {patient.motivosConsulta?.motivoPrincipal || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">Síntomas actuales</h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.motivosConsulta?.sintomasActuales || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">
                Eventos recientes relevantes
              </h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.motivosConsulta?.eventosRecientesRelevantes || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">Diagnóstico previo</h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.motivosConsulta?.diagnosticoPrevio || '(vacío)'}
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
                {patient.historiaClinica?.observaciones || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">
                Frases recurrentes / palabras clave
              </h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.historiaClinica?.frasesRecurrentes || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">
                Actos fallidos / asociaciones llamativas
              </h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.historiaClinica?.actosFallidos || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">
                Interconsultas / derivaciones realizadas
              </h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.historiaClinica?.derivacionesRealizadas || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">Evolución del paciente</h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {patient.historiaClinica?.evolucionPaciente || '(vacío)'}
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
                {patient.seguimiento?.diaYHorario || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">Modalidad de atención</h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {' '}
                {patient.seguimiento?.modalidad || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">
                Duración aproximada de la sesión
              </h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {' '}
                {patient.seguimiento?.duracionSesion || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">Frecuencia de la sesión</h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {' '}
                {patient.seguimiento?.frecuencia || '(vacío)'}
              </p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold text-[#59616F] lg:text-lg">
                Medio de contacto preferido
              </h3>
              <p className="text-base text-[#59616f] lg:text-lg">
                {' '}
                {patient.seguimiento?.medioContactoPreferido || '(vacío)'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// BORRAR Y CORREGIR
const patient = {
  id: 1,
  name: 'Juan',
  surname: 'Paredes',
  birthdate: '1995-04-12',
  identification: '12345678',
  sex: 'Masculino',
  email: 'juan.paredes@example.com',
  phone: '123456789',
  admissionDate: '2019-02-22',
  age: 30,
  nationality: 'Mexicano',
  typeOfIdentification: 'NIE',
  rangoEtario: 'Adulto',
  lastSession: '04/01/2025',
  materials: [],
  notes: [],
  motivosConsulta: {
    motivoPrincipal:
      'Ansiedad generalizada que interfiere con el trabajo y las relaciones personales.',
    sintomasActuales:
      'Dificultad para dormir, pensamientos recurrentes, tensión muscular y llanto frecuente.',
    eventosRecientesRelevantes: 'Ruptura de pareja hace dos meses y cambio de empleo reciente.',
    diagnosticoPrevio:
      'No cuenta con diagnóstico previo, aunque realizó terapia cognitiva brevemente en 2022.',
  },
  historiaClinica: {
    observaciones:
      'Se muestra cooperativo/a, con buen contacto con la realidad. Preocupación marcada por el futuro.',
    frasesRecurrentes: '"No puedo con todo", "me exijo demasiado", "tengo que rendir".',
    actosFallidos: 'Confunde constantemente fechas importantes. Asocia descanso con culpa.',
    derivacionesRealizadas:
      'Pendiente evaluación psiquiátrica para posible tratamiento farmacológico.',
    evolucionPaciente:
      'En las primeras tres sesiones mostró mayor conciencia emocional. Mejor adherencia al tratamiento.',
  },
  seguimiento: {
    diaYHorario: 'Martes a las 18:30 hs',
    modalidad: 'Presencial',
    duracionSesion: '50 min',
    frecuencia: 'Semanal',
    medioContactoPreferido: 'WhatsApp',
  },
  filed: false,
};
