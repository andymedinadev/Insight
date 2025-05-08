import Link from 'next/link';
import Image from 'next/image';
import { UserplusButton } from '@/public';

export default function AddPatientButton() {
  return (
    <Link href="/dashboard/newpatient" className="w-80">
      <button className="flex h-12 w-full max-w-md items-center justify-center rounded-lg bg-[#0655D5] px-4 lg:w-60">
        <div className="mr-1.5">
          <Image src={UserplusButton} alt="Agregar paciente" width={20} height={20} />
        </div>
        <p className="text-base leading-normal font-semibold text-white">Agregar paciente nuevo</p>
      </button>
    </Link>
  );
}
