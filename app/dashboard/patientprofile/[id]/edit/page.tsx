'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { EditPatientForm } from '@/components';
import { ArrowBack } from '@/public';

export default function Page() {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);

  return (
    <div>
      <Link href={`/dashboard/patientprofile/${id}`}>
        <div className="mt-2.5 mb-7 ml-4 flex h-10 w-60 items-center gap-3 lg:mt-12 lg:ml-7 lg:w-[258px] lg:text-nowrap">
          <Image src={ArrowBack} width={24} height={24} alt="Flecha Atrás" className="lg:hidden" />
          <Image
            src={ArrowBack}
            width={40}
            height={40}
            alt="Flecha Atrás"
            className="hidden lg:block"
          />
          <p className="justify-start font-['Roboto'] text-sm leading-normal font-normal text-blue-700 underline lg:text-base">
            Volver
          </p>
        </div>
      </Link>

      <h1 className="mt-4 mb-0 ml-5 justify-start font-['Roboto'] text-3xl leading-10 font-semibold text-black lg:mt-8 lg:ml-8">
        Perfil del paciente
      </h1>

      <EditPatientForm />
    </div>
  );
}
