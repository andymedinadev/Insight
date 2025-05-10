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
      <div>
        <h1 className="mt-9 ml-10 justify-start font-sans text-3xl leading-[48px] font-semibold text-black">
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
