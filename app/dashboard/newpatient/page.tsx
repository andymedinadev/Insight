'use client';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { TypeNewPatient } from '@/types';

export default function NewPatient() {
  const [formValues, setFormValues] = useState({
    name: '',
    lastname: '',
    age: '',
    birthdate: '',
    gender: '',
    email: '',
    phone: '',
    date: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const createPatient = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as TypeNewPatient;

    console.log('Datos del formulario:', data);
  };

  return (
    <div>
      <h1 className="mt-8 mb-8 ml-10 text-[26px] leading-[26px] font-semibold">
        Formulario paciente nuevo
      </h1>

      <div className="mx-auto max-w-xl p-8">
        <form onSubmit={createPatient} className="flex flex-col gap-y-6">
          {/* Datos personales */}
          <h2 className="text-[20px] leading-[28px] font-semibold">Datos personales</h2>

          <p className="text-[14px] leading-[20px] font-normal text-gray-600">*Datos requeridos</p>

          <div className="flex flex-col">
            <label className="mb-1">Nombre/s *</label>
            <input
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              required
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Apellido/s *</label>
            <input
              name="lastname"
              value={formValues.lastname}
              onChange={handleInputChange}
              required
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Edad *</label>
            <input
              name="age"
              value={formValues.age}
              onChange={handleInputChange}
              required
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Fecha de nacimineto *</label>
            <span className="mb-1 text-sm text-gray-500">(dd/mm/yyyy)</span>
            <input
              name="birthdate"
              type="date"
              value={formValues.birthdate}
              onChange={handleInputChange}
              required
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-base font-medium text-gray-900">Sexo *</label>
            <div className="flex flex-col gap-y-4">
              {['Femenino', 'Masculino', 'Otros'].map((option) => (
                <label
                  key={option}
                  className="flex h-[32px] w-[118px] cursor-pointer items-center gap-x-3"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option.toLowerCase()}
                    checked={formValues.gender === option.toLowerCase()}
                    onChange={handleInputChange}
                    required
                    className="h-5 w-5 border border-[#000D4D73] accent-indigo-600"
                  />
                  <span className="text-base text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Email *</label>
            <input
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
              required
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Numero de celular *</label>
            <input
              name="phone"
              type="tel"
              value={formValues.phone}
              onChange={handleInputChange}
              required
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Fecha de ingreso *</label>
            <span className="mb-1 text-sm text-gray-500">(dd/mm/yyyy)</span>
            <input
              name="date"
              type="date"
              value={formValues.date}
              onChange={handleInputChange}
              required
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>
          <br />

          {/* Motivo de consulta */}
          <h2 className="text-[20px] leading-[28px] font-semibold">Motivo de consulta</h2>

          <div className="flex flex-col">
            <label className="mb-1">Motivo principal de consulta</label>
            <textarea
              name="reason"
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Síntomas actuales</label>
            <textarea
              name="symptoms"
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Eventos recientes relevantes</label>
            <textarea
              name="events"
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Diagnóstico previo</label>
            <textarea
              name="diagnosis"
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>
          <br />

          {/* Historia clínica */}
          <h2 className="text-[20px] leading-[28px] font-semibold">Historia clínica</h2>

          <div className="flex flex-col">
            <label className="mb-1">Observaciones del profesional</label>
            <textarea
              name="observations"
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Frases recurrentes / palabras clave</label>
            <textarea
              name="keywords"
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Actos fallidos / asociaciones llamativas</label>
            <textarea
              name="failedActs"
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Interconsultas / derivaciones realizadas</label>
            <textarea
              name="interconsultations"
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Evolución del paciente</label>
            <textarea
              name="evolution"
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>
          <br />

          {/* Organización y seguimineto */}
          <h2 className="text-[20px] leading-[28px] font-semibold">Organización y seguimineto</h2>

          <div className="flex flex-col">
            <label className="mb-1">Día y horario de la sesión</label>
            <input
              name="meetingTime"
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Frecuencia (semanal, mensual, etc)</label>
            <input
              name="frequency"
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-base font-medium text-gray-900">
              Modalidad de atención
            </label>
            <div className="flex flex-col gap-y-4">
              {['Online', 'Presencial', 'Híbrido'].map((option) => (
                <label
                  key={option}
                  className="flex h-[32px] w-[118px] cursor-pointer items-center gap-x-3"
                >
                  <input
                    type="radio"
                    name="careModality"
                    value={option.toLowerCase()}
                    className="h-5 w-5 border border-[#000D4D73] accent-indigo-600"
                  />
                  <span className="text-base text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-base font-medium text-gray-900">
              Duración aproximada de la sesión
            </label>
            <div className="flex flex-col gap-y-4">
              {['30 min', '45 min', '50 min', '60 min'].map((option) => (
                <label
                  key={option}
                  className="flex h-[32px] w-[118px] cursor-pointer items-center gap-x-3"
                >
                  <input
                    type="radio"
                    name="time"
                    value={option.toLowerCase()}
                    className="h-5 w-5 border border-[#000D4D73] accent-indigo-600"
                  />
                  <span className="text-base text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Medio de contacto preferido</label>
            <input
              name="contact"
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <Button
            type="submit"
            // disabled={!name || !lastname}
          >
            Crear paciente
          </Button>
        </form>
      </div>
    </div>
  );
}
