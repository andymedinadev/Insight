'use client';
import { MedicalHistoryHeader, MedicalHistoryList } from '@/components';
import { useSearchParams } from 'next/navigation';

export default function MedicalHistory() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const isMaterial = from === 'material';

  return (
    <div>
      <div>
        <h1 className="mt-9 ml-10 justify-start font-sans text-3xl leading-[48px] font-semibold text-black">
          {isMaterial ? 'Material para el paciente' : 'Gestionar notas'}
        </h1>
      </div>
      <div>
        <MedicalHistoryHeader />

        <MedicalHistoryList />
      </div>
    </div>
  );
}
