import { EditPatientForm } from '@/components';

export default function Page() {
  return (
    <div>
      <h1 className="mt-4 mb-0 ml-5 justify-start font-['Roboto'] text-3xl leading-10 font-semibold text-black lg:mt-8 lg:ml-8">
        Perfil del paciente
      </h1>

      <EditPatientForm />
    </div>
  );
}
