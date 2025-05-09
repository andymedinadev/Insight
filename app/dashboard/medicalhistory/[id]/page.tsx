'use client';
import { useState } from 'react';
import { MedicalHistoryHeader, MedicalHistoryList, MedicalHistoryNew } from '@/components';
import { useSearchParams } from 'next/navigation';

export default function MedicalHistory() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const isMaterial = from === 'material';

  const [showNewNote, setShowNewNote] = useState(false);

  return (
    <div>
      <div>
        <h1 className="mt-9 ml-10 justify-start font-sans text-3xl leading-[48px] font-semibold text-black">
          {isMaterial ? 'Material para el paciente' : 'Gestionar notas'}
        </h1>
      </div>

      {!showNewNote && (
        <div>
          <MedicalHistoryHeader onAddNewNote={() => setShowNewNote(true)} />
          <MedicalHistoryList />
        </div>
      )}

      {showNewNote && (
        <div>
          <MedicalHistoryNew onSaved={() => setShowNewNote(false)} />
        </div>
      )}
    </div>
  );
}
