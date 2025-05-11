'use client';
import { NewPatient } from '@/types';
// import { createPatient } from '@/store/thunks';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '@/store';
// import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
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
          <label className="mb-1">Nacionalidad *</label>
          <input
            name="nationality"
            value={formik.values.nationality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
          {formik.touched.nationality && formik.errors.nationality && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.nationality}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Tipo de documento *</label>
          <input
            name="typeOfIdentification"
            value={formik.values.typeOfIdentification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
          {formik.touched.typeOfIdentification && formik.errors.typeOfIdentification && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.typeOfIdentification}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Número de documento *</label>
          <input
            name="identification"
            value={formik.values.identification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
          {formik.touched.identification && formik.errors.identification && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.identification}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-base font-medium text-gray-900">Sexo *</label>
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
        <h2 className="text-[18px] leading-[26px] font-semibold sm:text-[22px] sm:leading-[28px]">
          Motivo de consulta
        </h2>

        <div className="flex flex-col">
          <label className="mb-1">Motivo principal de consulta</label>
          <textarea
            name="motivoPrincipal"
            value={formik.values.motivosConsulta?.motivoPrincipal}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Síntomas actuales</label>
          <textarea
            name="sintomasActuales"
            value={formik.values.motivosConsulta?.sintomasActuales}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Eventos recientes relevantes</label>
          <textarea
            name="eventosRecientesRelevantes"
            value={formik.values.motivosConsulta?.eventosRecientesRelevantes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Diagnóstico previo</label>
          <textarea
            name="diagnosticoPrevio"
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
            name="observaciones"
            value={formik.values.historiaClinica?.observaciones}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Frases recurrentes / palabras clave</label>
          <textarea
            name="frasesRecurrentes"
            value={formik.values.historiaClinica?.frasesRecurrentes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Actos fallidos / asociaciones llamativas</label>
          <textarea
            name="actosFallidos"
            value={formik.values.historiaClinica?.actosFallidos}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Interconsultas / derivaciones realizadas</label>
          <textarea
            name="derivacionesRealizadas"
            value={formik.values.historiaClinica?.derivacionesRealizadas}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Evolución del paciente</label>
          <textarea
            name="evolucionPaciente"
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
            name="diaYHorario"
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
                  name="modalidad"
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
                  name="duracionSesion"
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
            name="frecuencia"
            value={formik.values.seguimiento?.frecuencia}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[48px] w-full rounded-lg border border-[#000D4D73] bg-white px-3"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Medio de contacto preferido</label>
          <input
            name="medioContactoPreferido"
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
