'use client';
import { useState } from 'react';
import {
  MedicalHistoryHeader,
  MedicalHistoryList,
  MedicalHistoryNew,
  MedicalHistoryView,
} from '@/components';
import { useSearchParams } from 'next/navigation';
import { Note } from '@/types';

export default function MedicalHistory() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const isMaterial = from === 'material';

  const [showNewNote, setShowNewNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  return (
    <div>
      <div className="px-4 pt-9 sm:px-6 md:px-10">
        <h1 className="font-sans text-2xl leading-[48px] font-semibold text-black sm:text-2xl md:text-2xl lg:text-3xl">
          {isMaterial ? 'Material para el paciente' : 'Gestionar notas'}
        </h1>
      </div>

      {!showNewNote && !selectedNote && (
        <div>
          <MedicalHistoryHeader onAddNewNote={() => setShowNewNote(true)} />
          <MedicalHistoryList onSelectedNote={(note) => setSelectedNote(note)} />
        </div>
      )}

      {showNewNote && (
        <div>
          <MedicalHistoryNew onSaved={() => setShowNewNote(false)} />
        </div>
      )}

      {selectedNote && (
        <div>
          <MedicalHistoryView note={selectedNote} />
        </div>
      )}
    </div>
  );
}
