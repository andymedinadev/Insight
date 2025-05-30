'use client';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { InputField, ValidationError } from '@/components';
import { initialValues, backendNewPatientValidationSchema } from '@/schemas/backendNewPatient';
import { createBackendPatient } from '@/store/thunks';
import { AppDispatch } from '@/store';
import { BackendNewPatient } from '@/types';

export default function FormPatient() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const sessionOptions = [
    { label: '30 min', value: 30 },
    { label: '45 min', value: 45 },
    { label: '50 min', value: 50 },
    { label: '60 min', value: 60 },
  ];
  const modalityOptions = [
    { label: 'Presencial', value: 'Presencial' },
    { label: 'Virtual', value: 'Virtual' },
    { label: 'Híbrido', value: 'Hibrido' },
  ];
  const sexOptions = [
    { value: 'Femenino', label: 'Femenino' },
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Transgenero', label: 'Transgénero' },
    { value: 'NoBinario', label: 'No binario' },
    { value: 'Bigenero', label: 'Bigénero' },
    { value: 'Intersexual', label: 'Intersexual' },
    { value: 'Otros', label: 'Otro' },
  ];

  const formik = useFormik({
    initialValues,
    validationSchema: backendNewPatientValidationSchema,
    onSubmit: async (values) => {
      const patientToSend: BackendNewPatient = {
        ...values,
        birthdate: new Date(values.birthdate).toISOString(),
        sessionDay: values.sessionDay ? new Date(values.sessionDay).toISOString() : '',
        userId: 0,
        modality: values.modality ? values.modality : 'Presencial',
        sessionDuration: values.sessionDuration ? values.sessionDuration : 0,
        identification: values.identification.toString(),
      };

      try {
        await dispatch(createBackendPatient(patientToSend)).unwrap();
        router.push('/dashboard/patientlist');
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'detail' in error &&
          typeof error.detail === 'string'
        ) {
          const errorMessage = (error as { detail: string }).detail;

          if (errorMessage.includes('identificación')) {
            formik.setFieldError('identification', errorMessage);
          } else if (errorMessage.includes('correo electrónico')) {
            formik.setFieldError('email', errorMessage);
          } else {
            formik.setStatus({ general: errorMessage });
          }
        } else {
          formik.setStatus({ general: 'Ocurrió un error inesperado' });
        }
      }
    },
  });

  return (
    <div className="mx-auto max-w-xl p-8">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-6">
        {/* Datos personales */}
        <h2 className="text-[18px] leading-[26px] font-semibold sm:text-[22px] sm:leading-[28px]">
          Datos personales
        </h2>

        <p className="text-[12px] sm:text-[14px] sm:leading-[16px]">*Datos requeridos</p>

        <div className="flex flex-col">
          <InputField
            id="name"
            label="Nombre/s"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese sus nombre/s"
            required
            hasError={formik.touched.name && Boolean(formik.errors.name)}
            errorMessage={formik.touched.name ? formik.errors.name : undefined}
          />
        </div>

        <div className="flex flex-col">
          <InputField
            id="surname"
            label="Apellido/s"
            value={formik.values.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese sus apellido/s"
            required
            hasError={formik.touched.surname && Boolean(formik.errors.surname)}
            errorMessage={formik.touched.surname ? formik.errors.surname : undefined}
          />
        </div>

        <div className="flex flex-col">
          <InputField
            id="birthdate"
            label="Fecha de nacimiento"
            type="date"
            value={formik.values.birthdate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese su fecha de nacimiento"
            required
            hasError={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
            errorMessage={formik.touched.birthdate ? formik.errors.birthdate : undefined}
          />
        </div>

        <div className="flex flex-col">
          <InputField
            id="nationality"
            label="Nacionalidad"
            value={formik.values.nationality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese su nacionalidad"
            required
            hasError={formik.touched.nationality && Boolean(formik.errors.nationality)}
            errorMessage={formik.touched.nationality ? formik.errors.nationality : undefined}
          />
        </div>

        <div className="flex flex-col">
          <InputField
            id="typeOfIdentification"
            label="Tipo de documento"
            value={formik.values.typeOfIdentification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese el tipo de documento"
            required
            hasError={
              formik.touched.typeOfIdentification && Boolean(formik.errors.typeOfIdentification)
            }
            errorMessage={
              formik.touched.typeOfIdentification ? formik.errors.typeOfIdentification : undefined
            }
          />
        </div>

        <div className="flex flex-col">
          <InputField
            id="identification"
            label="Número de documento"
            value={formik.values.identification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese el número de documento"
            required
            hasError={formik.touched.identification && Boolean(formik.errors.identification)}
            errorMessage={formik.touched.identification ? formik.errors.identification : undefined}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-base font-medium text-gray-900">
            Sexo <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col gap-y-2">
            {sexOptions.map(({ value, label }) => (
              <label
                key={value}
                className="flex h-[32px] w-[118px] cursor-pointer items-center gap-x-3"
              >
                <input
                  type="radio"
                  name="sex"
                  value={value}
                  checked={formik.values.sex === value}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-5 w-5 border border-[#000D4D73] accent-indigo-600"
                />
                <span className="text-base text-gray-900">{label}</span>
              </label>
            ))}
          </div>
          {formik.errors.sex ? <ValidationError label={formik.errors.sex} /> : null}
        </div>

        <div className="flex flex-col">
          <InputField
            id="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese su Email"
            required
            hasError={formik.touched.email && Boolean(formik.errors.email)}
            errorMessage={formik.touched.email ? formik.errors.email : undefined}
          />
        </div>

        <div className="flex flex-col">
          <InputField
            id="phone"
            label="Número de celular"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese su número de celular"
            required
            hasError={formik.touched.phone && Boolean(formik.errors.phone)}
            errorMessage={formik.touched.phone ? formik.errors.phone : undefined}
          />
        </div>

        <br />

        {/* Motivo de consulta */}
        <h2 className="text-[18px] leading-[26px] font-semibold sm:text-[22px] sm:leading-[28px]">
          Motivo de consulta
        </h2>

        <div className="flex flex-col">
          <label className="mb-1">Motivo principal de consulta</label>
          <textarea
            name="principalMotive"
            value={formik.values.principalMotive ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Síntomas actuales</label>
          <textarea
            name="actualSymptoms"
            value={formik.values.actualSymptoms ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Eventos recientes relevantes</label>
          <textarea
            name="recentEvents"
            value={formik.values.recentEvents ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Diagnóstico previo</label>
          <textarea
            name="previousDiagnosis"
            value={formik.values.previousDiagnosis ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>
        <br />

        {/* Historia clínica */}
        <h2 className="text-[18px] leading-[26px] font-semibold sm:text-[22px] sm:leading-[28px]">
          Historia clínica
        </h2>

        <div className="flex flex-col">
          <label className="mb-1">Observaciones del profesional</label>
          <textarea
            name="profesionalObservations"
            value={formik.values.profesionalObservations ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Frases recurrentes / palabras clave</label>
          <textarea
            name="keyWords"
            value={formik.values.keyWords ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Actos fallidos / asociaciones llamativas</label>
          <textarea
            name="failedActs"
            value={formik.values.failedActs ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Interconsultas / derivaciones realizadas</label>
          <textarea
            name="interconsulation"
            value={formik.values.interconsulation ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Evolución del paciente</label>
          <textarea
            name="patientEvolution"
            value={formik.values.patientEvolution ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>
        <br />

        {/* Organización y seguimineto */}
        <h2 className="text-[18px] leading-[26px] font-semibold sm:text-[22px] sm:leading-[28px]">
          Organización y seguimineto
        </h2>

        <div className="flex flex-col">
          <label className="mb-1">Día y horario de la sesión</label>
          <input
            name="sessionDay"
            value={formik.values.sessionDay}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-base font-medium text-gray-900">Modalidad de atención</label>
          <div className="flex flex-col gap-y-2">
            {modalityOptions.map(({ value, label }) => (
              <label
                key={value}
                className="flex h-[32px] w-[118px] cursor-pointer items-center gap-x-3"
              >
                <input
                  type="radio"
                  name="modality"
                  value={value}
                  checked={formik.values.modality === value}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-5 w-5 border border-[#000D4D73] accent-indigo-600"
                />
                <span className="text-base text-gray-900">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-base font-medium text-gray-900">
            Duración aproximada de la sesión
          </label>
          <div className="flex flex-col gap-y-2">
            {sessionOptions.map(({ label, value }) => (
              <label
                key={value}
                className="flex h-[32px] w-[118px] cursor-pointer items-center gap-x-3"
              >
                <input
                  type="radio"
                  name="sessionDuration"
                  value={value}
                  checked={formik.values.sessionDuration === value}
                  onChange={(e) => formik.setFieldValue('sessionDuration', Number(e.target.value))}
                  onBlur={formik.handleBlur}
                  className="h-5 w-5 border border-[#000D4D73] accent-indigo-600"
                />
                <span className="text-base text-gray-900">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Frecuencia (semanal, mensual, etc)</label>
          <input
            name="sessionFrequency"
            value={formik.values.sessionFrequency ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Medio de contacto preferido</label>
          <input
            name="preferedContact"
            value={formik.values.preferedContact ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <button
          type="submit"
          className="mb-12 inline-flex h-12 cursor-pointer items-center justify-center self-stretch rounded-lg bg-[#0655D5]"
        >
          <p className="cursor-pointer justify-start text-center font-['Roboto'] text-base leading-normal font-semibold text-white">
            Crear paciente
          </p>
        </button>
      </form>
    </div>
  );
}
