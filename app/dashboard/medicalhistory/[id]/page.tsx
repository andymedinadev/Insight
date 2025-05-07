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
        <h1 className="font-heading text-heading1 leading-heading1 font-semibold tracking-[-0.5px]">
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
