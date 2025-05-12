'use client';
import { NewPatient } from '@/types';
// import { createPatient } from '@/store/thunks';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '@/store';
// import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import { ValidationError } from '../ui/ValidationError';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues: NewPatient = {
  id: 0,
  name: '',
  surname: '',
  birthdate: '',
  nationality: '',
  typeOfIdentification: '',
  identification: '',
  sex: '',
  email: '',
  phone: '',
  admissionDate: '',
  motivosConsulta: {
    motivoPrincipal: '',
    sintomasActuales: '',
    eventosRecientesRelevantes: '',
    diagnosticoPrevio: '',
  },
  historiaClinica: {
    observaciones: '',
    frasesRecurrentes: '',
    actosFallidos: '',
    derivacionesRealizadas: '',
    evolucionPaciente: '',
  },
  seguimiento: {
    diaYHorario: '',
    modalidad: '',
    duracionSesion: '',
    frecuencia: '',
    medioContactoPreferido: '',
  },
};

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre es obligatorio'),
  surname: Yup.string().required('El apellido es obligatorio'),
  birthdate: Yup.date()
    .max(new Date(), 'La fecha de nacimiento no puede ser futura')
    .required('La fecha de nacimiento es obligatoria'),
  nationality: Yup.string().required('La nacionalidad es obligatoria'),
  typeOfIdentification: Yup.string().required('El tipo de documento es obligatorio'),
  identification: Yup.string().required('El número de documento es obligatorio'),
  sex: Yup.string().required('El género es obligatorio'),
  email: Yup.string().email('Email inválido').required('El email es obligatorio'),
  phone: Yup.string()
    .matches(/^[0-9+]+$/, 'El número solo puede contener dígitos y el símbolo +')
    .required('El número móvil es obligatorio'),
  admissionDate: Yup.string().required('La fecha de ingreso es obligatoria'),
});

export default function FormPatient() {
  // const dispatch = useDispatch<AppDispatch>();
  // const router = useRouter();

  const formik = useFormik<NewPatient>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('Datos del formulario:', values);
      const newPatient = {
        id: 0,
        name: values.name,
        surname: values.surname,
        birthdate: values.birthdate,
        nationality: values.nationality,
        typeOfIdentification: values.typeOfIdentification,
        identification: values.identification,
        sex: values.sex,
        email: values.email,
        phone: values.phone,
        admissionDate: values.admissionDate,
        //Motivos de consulta
        motivoPrincipal: values.motivosConsulta?.motivoPrincipal,
        sintomasActuales: values.motivosConsulta?.sintomasActuales,
        eventosRecientesRelevantes: values.motivosConsulta?.eventosRecientesRelevantes,
        diagnosticoPrevio: values.motivosConsulta?.diagnosticoPrevio,
        //Historia clínica
        observaciones: values.historiaClinica?.observaciones,
        frasesRecurrentes: values.historiaClinica?.frasesRecurrentes,
        actosFallidos: values.historiaClinica?.actosFallidos,
        derivacionesRealizadas: values.historiaClinica?.derivacionesRealizadas,
        evolucionPaciente: values.historiaClinica?.evolucionPaciente,
        //Seguimiento
        diaYHorario: values.seguimiento?.diaYHorario,
        modalidad: values.seguimiento?.modalidad,
        duracionSesion: values.seguimiento?.duracionSesion,
        frecuencia: values.seguimiento?.frecuencia,
        medioContactoPreferido: values.seguimiento?.medioContactoPreferido,
      };
      console.log(newPatient);

      // try {
      //   const resultAction = await dispatch(createPatient(newPatient));

      //   if (createPatient.fulfilled.match(resultAction)) {
      //     router.push('/dashboard/patientlist');
      //   } else {
      //     console.error('Error al crear el paciente:', resultAction);
      //   }
      // } catch (error) {
      //   console.error('Error inesperado:', error);
      // }
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
            label="Fecha de nacimineto"
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
            {[
              'Femenino',
              'Masculino',
              'Transgénero',
              'No binario',
              'Bigénero',
              'Intersexual',
              'Otro',
            ].map((option) => (
              <label
                key={option}
                className="flex h-[32px] w-[118px] cursor-pointer items-center gap-x-3"
              >
                <input
                  type="radio"
                  name="sex"
                  value={option}
                  checked={formik.values.sex === option}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-5 w-5 border border-[#000D4D73] accent-indigo-600"
                />
                <span className="text-base text-gray-900">{option}</span>
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
        <br />

        {/* Motivo de consulta */}
        <h2 className="text-[18px] leading-[26px] font-semibold sm:text-[22px] sm:leading-[28px]">
          Motivo de consulta
        </h2>

        <div className="flex flex-col">
          <label className="mb-1">Motivo principal de consulta</label>
          <textarea
            name="motivosConsulta.motivoPrincipal"
            value={formik.values.motivosConsulta?.motivoPrincipal}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Síntomas actuales</label>
          <textarea
            name="motivosConsulta.sintomasActuales"
            value={formik.values.motivosConsulta?.sintomasActuales}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Eventos recientes relevantes</label>
          <textarea
            name="motivosConsulta.eventosRecientesRelevantes"
            value={formik.values.motivosConsulta?.eventosRecientesRelevantes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Diagnóstico previo</label>
          <textarea
            name="motivosConsulta.diagnosticoPrevio"
            value={formik.values.motivosConsulta?.diagnosticoPrevio}
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
            name="historiaClinica.observaciones"
            value={formik.values.historiaClinica?.observaciones}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Frases recurrentes / palabras clave</label>
          <textarea
            name="historiaClinica.frasesRecurrentes"
            value={formik.values.historiaClinica?.frasesRecurrentes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Actos fallidos / asociaciones llamativas</label>
          <textarea
            name="historiaClinica.actosFallidos"
            value={formik.values.historiaClinica?.actosFallidos}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Interconsultas / derivaciones realizadas</label>
          <textarea
            name="historiaClinica.derivacionesRealizadas"
            value={formik.values.historiaClinica?.derivacionesRealizadas}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Evolución del paciente</label>
          <textarea
            name="historiaClinica.evolucionPaciente"
            value={formik.values.historiaClinica?.evolucionPaciente}
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
            name="seguimiento.diaYHorario"
            value={formik.values.seguimiento?.diaYHorario}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-base font-medium text-gray-900">Modalidad de atención</label>
          <div className="flex flex-col gap-y-2">
            {['Presencial', 'Virtual', 'Híbrido'].map((option) => (
              <label
                key={option}
                className="flex h-[32px] w-[118px] cursor-pointer items-center gap-x-3"
              >
                <input
                  type="radio"
                  name="seguimiento.modalidad"
                  value={option}
                  checked={formik.values.seguimiento?.modalidad === option}
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
                  name="seguimiento.duracionSesion"
                  value={option}
                  checked={formik.values.seguimiento?.duracionSesion === option}
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
            name="seguimiento.frecuencia"
            value={formik.values.seguimiento?.frecuencia}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Medio de contacto preferido</label>
          <input
            name="seguimiento.medioContactoPreferido"
            value={formik.values.seguimiento?.medioContactoPreferido}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <Button type="submit">Crear paciente</Button>
      </form>
    </div>
  );
}
