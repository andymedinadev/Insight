'use client';

import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';

import { InputField, ValidationError } from '@/components';
import { useAppDispatch, useBackendPatientById, useClearSelectedPatientOnUnmount } from '@/hooks';
import { editBackendPatient } from '@/store/thunks';
import { editPatientFormValidationSchema } from '@/schemas';
import { mapBackendPatientToEditPatient } from '@/utils';
import { modalityOptions, sessionOptions, sexOptions } from '@/constants';
import { BackendEditPatient } from '@/types';

const defaultInitialValues: BackendEditPatient = {
  id: 0,
  name: '',
  surname: '',
  birthdate: '',
  typeOfIdentification: '',
  identification: '',
  sex: '',
  email: '',
  phone: '',
  age: 0,
  admissionDate: '',
  rangoEtario: '',
  nationality: '',
  principalMotive: '',
  actualSymptoms: '',
  recentEvents: '',
  previousDiagnosis: '',
  profesionalObservations: '',
  keyWords: '',
  failedActs: '',
  interconsulation: '',
  patientEvolution: '',
  sessionDay: '',
  modality: '',
  sessionDuration: 0,
  sessionFrequency: '',
  preferedContact: '',
};

export function EditPatientForm() {
  const dispatch = useAppDispatch();
  const { patient } = useBackendPatientById();
  const router = useRouter();

  const initialValues: BackendEditPatient = patient
    ? mapBackendPatientToEditPatient(patient)
    : defaultInitialValues;

  const formik = useFormik<BackendEditPatient>({
    enableReinitialize: true,
    initialValues,
    validationSchema: editPatientFormValidationSchema,
    onSubmit: (values) => {
      const editedPatient = { ...patient, ...values };

      dispatch(editBackendPatient(editedPatient));

      router.push('/dashboard/patientlist');
    },
  });

  // Limpiar paciente seleccionado al desmontar
  useClearSelectedPatientOnUnmount();

  return (
    <div className="mt-2.5 max-w-xl flex-col lg:mx-auto lg:mt-6 lg:flex lg:w-1/3">
      {/* Datos personales */}
      <h2 className="ml-7 justify-start self-stretch font-['Roboto'] text-xl leading-loose font-semibold text-black lg:ml-0 lg:text-2xl">
        Datos personales
      </h2>

      <div className="mt-6 ml-7 justify-start self-stretch lg:ml-0">
        <span className="font-['Roboto'] text-xs leading-tight font-semibold text-[#C73A3A] lg:text-base">
          *
        </span>
        <span className="font-['Roboto'] text-xs leading-tight font-semibold text-black lg:text-base">
          Datos Requeridos
        </span>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="mx-auto flex w-[350px] flex-col gap-6 lg:w-full"
      >
        <div className="mt-7">
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

        <div className="flex flex-col">
          <InputField
            id="admissionDate"
            label="Fecha de ingreso"
            type="date"
            value={formik.values.admissionDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ingrese la fecha de ingreso"
            required
            hasError={formik.touched.admissionDate && Boolean(formik.errors.admissionDate)}
            errorMessage={formik.touched.admissionDate ? formik.errors.admissionDate : undefined}
          />
        </div>

        {/* Motivo de consulta */}
        <h2 className="justify-start self-stretch font-['Roboto'] text-xl leading-loose font-semibold text-black">
          Motivo de consulta
        </h2>

        <div className="flex flex-col">
          <label className="mb-1">Motivo principal de consulta</label>
          <textarea
            name="principalMotive"
            value={formik.values.principalMotive}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full resize-none rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Síntomas actuales</label>
          <textarea
            name="actualSymptoms"
            value={formik.values.actualSymptoms}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full resize-none rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Eventos recientes relevantes</label>
          <textarea
            name="recentEvents"
            value={formik.values.recentEvents}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full resize-none rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Diagnóstico previo</label>
          <textarea
            name="previousDiagnosis"
            value={formik.values.previousDiagnosis}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full resize-none rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        {/* Historia clínica */}
        <h2 className="justify-start self-stretch font-['Roboto'] text-xl leading-loose font-semibold text-black">
          Historia clínica
        </h2>

        <div className="flex flex-col">
          <label className="mb-1">Observaciones del profesional</label>
          <textarea
            name="profesionalObservations"
            value={formik.values.profesionalObservations}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full resize-none rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Frases recurrentes / palabras clave</label>
          <textarea
            name="keyWords"
            value={formik.values.keyWords}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full resize-none rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Actos fallidos / asociaciones llamativas</label>
          <textarea
            name="failedActs"
            value={formik.values.failedActs}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full resize-none rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Interconsultas / derivaciones realizadas</label>
          <textarea
            name="interconsulation"
            value={formik.values.interconsulation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full resize-none rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Evolución del paciente</label>
          <textarea
            name="patientEvolution"
            value={formik.values.patientEvolution}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full resize-none rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        {/* Organización y seguimineto */}
        <h2 className="justify-start self-stretch font-['Roboto'] text-xl leading-loose font-semibold text-black">
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
            {sessionOptions.map(({ value, label }) => (
              <label
                key={value}
                className="flex h-[32px] w-[118px] cursor-pointer items-center gap-x-3"
              >
                <input
                  type="radio"
                  name="sessionDuration"
                  value={value}
                  checked={String(formik.values.sessionDuration) === String(value)}
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
          <label className="mb-1">Frecuencia (semanal, mensual, etc)</label>
          <input
            name="sessionFrequency"
            value={formik.values.sessionFrequency}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Medio de contacto preferido</label>
          <input
            name="preferedContact"
            value={formik.values.preferedContact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <button
          type="submit"
          className="mb-12 inline-flex h-12 cursor-pointer items-center justify-center self-stretch rounded-lg bg-[#0655D5]"
        >
          <p className="justify-start text-center font-['Roboto'] text-base leading-normal font-semibold text-white">
            Guardar cambios
          </p>
        </button>
      </form>
    </div>
  );
}
