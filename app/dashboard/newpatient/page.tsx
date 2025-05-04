'use client';
import React from 'react';
import Button from '@/components/ui/Button';
import { createPatient } from '@/store/slices/patientSlice';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { TypeNewPatient } from '@/types';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre es obligatorio'),
  surname: Yup.string().required('El apellido es obligatorio'),
  birthdate: Yup.date()
    .max(new Date(), 'La fecha de nacimiento no puede ser futura')
    .required('La fecha de nacimiento es obligatoria'),
  sex: Yup.string().required('El género es obligatorio'),
  email: Yup.string().email('Email inválido').required('El email es obligatorio'),
  phone: Yup.string()
    .matches(/^[0-9+]+$/, 'El número solo puede contener dígitos y el símbolo +')
    .required('El número es obligatorio'),
  admissionDate: Yup.string().required('La fecha de ingreso es obligatoria'),
});

export default function NewPatient() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const initialValues: TypeNewPatient = {
    id: 0,
    name: '',
    surname: '',
    birthdate: '',
    sex: '',
    email: '',
    phone: '',
    admissionDate: '',
    reason: '',
    symptoms: '',
    events: '',
    diagnosis: '',
    observations: '',
    keywords: '',
    failedActs: '',
    interconsultations: '',
    evolution: '',
    meetingTime: '',
    frequency: '',
    modality: '',
    time: '',
    contact: '',
  };

  const formik = useFormik<TypeNewPatient>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('Datos del formulario:', values);
      // Aquí modifico el objeto de acuerdo con el back actual
      const newPatient = {
        name: values.name,
        surname: values.surname,
        birthdate: values.birthdate,
        identification: 12345678,
        sex: values.sex,
        modality: values.modality,
        email: values.email,
        phone: values.phone,
        diagnosis: values.diagnosis,
        institution: 'Clínica Central',
      };
      console.log(newPatient);

      try {
        const resultAction = await dispatch(createPatient(newPatient));

        if (createPatient.fulfilled.match(resultAction)) {
          router.push('/dashboard/patientlist');
        } else {
          console.error('Error al crear el paciente:', resultAction);
        }
      } catch (error) {
        console.error('Error inesperado:', error);
      }
    },
  });

  return (
    <div>
      <h1 className="mt-8 mb-8 ml-10 text-[26px] leading-[26px] font-semibold">
        Formulario paciente nuevo
      </h1>

      <div className="mx-auto max-w-xl p-8">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-6">
          {/* Datos personales */}
          <h2 className="text-[20px] leading-[28px] font-semibold">Datos personales</h2>

          <p className="text-[14px] leading-[20px] font-semibold">*Datos requeridos</p>

          <div className="flex flex-col">
            <label className="mb-1">Nombre/s *</label>
            <input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Apellido/s *</label>
            <input
              name="surname"
              value={formik.values.surname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
            {formik.touched.surname && formik.errors.surname && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.surname}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Fecha de nacimineto *</label>
            <span className="mb-1 text-sm text-gray-500">(dd/mm/yyyy)</span>
            <input
              name="birthdate"
              type="date"
              max={new Date().toISOString().split('T')[0]}
              value={formik.values.birthdate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
            {formik.touched.birthdate && formik.errors.birthdate && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.birthdate}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-base font-medium text-gray-900">Sexo *</label>
            <div className="flex flex-col gap-y-2">
              {['Femenino', 'Masculino', 'Otros'].map((option) => (
                <label
                  key={option}
                  className="flex h-[32px] w-[118px] cursor-pointer items-center gap-x-3"
                >
                  <input
                    type="radio"
                    name="sex"
                    value={option.charAt(0)}
                    checked={formik.values.sex === option.charAt(0)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="h-5 w-5 border border-[#000D4D73] accent-indigo-600"
                  />
                  <span className="text-base text-gray-900">{option}</span>
                </label>
              ))}
            </div>
            {formik.touched.sex && formik.errors.sex && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.sex}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Email *</label>
            <input
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Numero de celular *</label>
            <input
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Fecha de ingreso *</label>
            <span className="mb-1 text-sm text-gray-500">(dd/mm/yyyy)</span>
            <input
              name="admissionDate"
              type="date"
              value={formik.values.admissionDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
            {formik.touched.admissionDate && formik.errors.admissionDate && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.admissionDate}</p>
            )}
          </div>
          <br />

          {/* Motivo de consulta */}
          <h2 className="text-[20px] leading-[28px] font-semibold">Motivo de consulta</h2>

          <div className="flex flex-col">
            <label className="mb-1">Motivo principal de consulta</label>
            <textarea
              name="reason"
              value={formik.values.reason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Síntomas actuales</label>
            <textarea
              name="symptoms"
              value={formik.values.symptoms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Eventos recientes relevantes</label>
            <textarea
              name="events"
              value={formik.values.events}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Diagnóstico previo</label>
            <textarea
              name="diagnosis"
              value={formik.values.diagnosis}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              value={formik.values.observations}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Frases recurrentes / palabras clave</label>
            <textarea
              name="keywords"
              value={formik.values.keywords}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Actos fallidos / asociaciones llamativas</label>
            <textarea
              name="failedActs"
              value={formik.values.failedActs}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Interconsultas / derivaciones realizadas</label>
            <textarea
              name="interconsultations"
              value={formik.values.interconsultations}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Evolución del paciente</label>
            <textarea
              name="evolution"
              value={formik.values.evolution}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              value={formik.values.meetingTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-base font-medium text-gray-900">
              Modalidad de atención
            </label>
            <div className="flex flex-col gap-y-2">
              {['Online', 'Presencial', 'Híbrido'].map((option) => (
                <label
                  key={option}
                  className="flex h-[32px] w-[118px] cursor-pointer items-center gap-x-3"
                >
                  <input
                    type="radio"
                    name="modality"
                    value={option}
                    checked={formik.values.modality === option}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
            <div className="flex flex-col gap-y-2">
              {['30 min', '45 min', '50 min', '60 min'].map((option) => (
                <label
                  key={option}
                  className="flex h-[32px] w-[118px] cursor-pointer items-center gap-x-3"
                >
                  <input
                    type="radio"
                    name="time"
                    value={option}
                    checked={formik.values.time === option}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="h-5 w-5 border border-[#000D4D73] accent-indigo-600"
                  />
                  <span className="text-base text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Frecuencia (semanal, mensual, etc)</label>
            <input
              name="frequency"
              value={formik.values.frequency}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Medio de contacto preferido (email, WhatsApp, etc)</label>
            <input
              name="contact"
              value={formik.values.contact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
