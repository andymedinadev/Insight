'use client';
import { useState } from 'react';
import {
  MedicalHistoryHeader,
  MedicalHistoryList,
  MedicalHistoryNew,
  MedicalHistoryView,
  MedicalHistoryEdit,
} from '@/components';
import { useSearchParams } from 'next/navigation';
import { Note } from '@/types';
import { useDispatch } from 'react-redux';
import { deleteMaterialOfPatient, deleteNoteOfPatient } from '@/store/slices/patientSlice';
import { useNewPatientById } from '@/hooks';

export default function MedicalHistory() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const isMaterial = from === 'material';

  const dispatch = useDispatch();
  const { id } = useNewPatientById();

  const [showNewNote, setShowNewNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (!selectedNote) return;

    if (isMaterial) {
      dispatch(deleteMaterialOfPatient({ patientId: id, materialId: selectedNote.id }));
    } else {
      dispatch(deleteNoteOfPatient({ patientId: id, noteId: selectedNote.id }));
    }

    setSelectedNote(null);
    setIsEditing(false);
  };

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

      {selectedNote && !isEditing && (
        <div>
          <MedicalHistoryView
            note={selectedNote}
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
          />
        </div>
      )}

      {selectedNote && isEditing && (
        <div>
          <MedicalHistoryEdit
            note={selectedNote}
            onSaved={() => {
              setIsEditing(false);
              setSelectedNote(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
