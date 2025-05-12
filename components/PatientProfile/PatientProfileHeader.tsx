'use client';
import { useRouter } from 'next/navigation';
import { usePatientById } from '@/hooks';

export function PatientProfileHeader() {
  const { patient } = usePatientById();
  const router = useRouter();

  const handleRedirect = (id: number, queryParam?: string) => {
    let path = `/dashboard/medicalhistory/${id}`;
    if (queryParam) {
      path += `?from=${queryParam}`;
    }
    router.push(path);
  };

  return (
    <div className="mb-6 border-b border-gray-200 px-5 pt-3.5 md:overflow-x-hidden lg:border-none">
      {/* Header */}
      <h1 className="mt-4 mb-3.5 font-['Roboto'] text-3xl leading-10 font-semibold text-black lg:mx-8 lg:mb-0 lg:font-bold">
        Perfil del paciente
      </h1>
      {/* Botones */}
      <div className="mx-auto mt-3.5 flex w-[352px] flex-col items-center gap-2 pb-2 lg:mx-8 lg:mt-8 lg:w-full lg:flex-row lg:gap-8">
        <button
          onClick={() => {
            if (patient?.id !== undefined) {
              handleRedirect(patient?.id, 'material');
            }
          }}
          className="h-12 w-[352px] rounded-lg border border-[#0655D5] bg-white/0 outline-1 outline-offset-[-1px] outline-[#0655D5]/80 lg:w-[205px]"
        >
          <p className="justify-start text-center font-['Roboto'] text-base leading-normal font-semibold text-[#0655D5]">
            Material para el paciente
          </p>
        </button>
        <button
          onClick={() => {
            if (patient?.id !== undefined) {
              handleRedirect(patient?.id, 'notes');
            }
          }}
          className="h-12 w-[352px] rounded-lg border border-[#0655D5] bg-white/0 outline-1 outline-offset-[-1px] outline-[#0655D5]/80 lg:w-[205px]"
        >
          <p className="justify-start text-center font-['Roboto'] text-base leading-normal font-semibold text-[#0655D5]">
            Gestionar notas
          </p>
        </button>
      </div>
    </div>
  );
}
