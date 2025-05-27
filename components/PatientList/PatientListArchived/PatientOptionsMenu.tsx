'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Edit, Archive } from '@/public';
import { toggleFiled } from '@/store/slices/patientSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';

type Props = {
  patientId: string;
};

export default function PatientOptionsMenu({ patientId }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className="absolute right-10 z-50 mt-3 w-2xs rounded-md border border-gray-200 bg-white shadow-md lg:right-32">
      <ul className="py-1 text-xl font-normal text-[#000F27E5]">
        <li>
          <button
            className="mt-2.5 mb-6 flex w-full cursor-pointer flex-row text-left hover:bg-gray-100"
            onClick={() => router.push(`/dashboard/patientprofile/${patientId}/edit`)}
          >
            <div>
              <Image
                src={Edit}
                alt="editar"
                width={22}
                height={22}
                className="mr-5 ml-8 inline-block"
              />
            </div>
            <div>Editar paciente</div>
          </button>
        </li>
        <li>
          <button
            className="mt-2.5 mb-2.5 flex w-full cursor-pointer flex-row text-left hover:bg-gray-100"
            onClick={() => dispatch(toggleFiled(Number(patientId)))}
          >
            <div>
              <Image
                src={Archive}
                alt="archivar"
                width={22}
                height={22}
                className="mr-5 ml-8 inline-block"
              />
            </div>
            <div>Archivar paciente</div>
          </button>
        </li>
      </ul>
    </div>
  );
}
