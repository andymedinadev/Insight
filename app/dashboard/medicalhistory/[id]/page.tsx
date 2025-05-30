'use client';

import { useState } from 'react';
import {
  MedicalHistoryHeader,
  MedicalHistoryList,
  MedicalHistoryNew,
  MedicalHistoryView,
  MedicalHistoryEdit,
} from '@/components';
import { useSearchParams, useRouter } from 'next/navigation';
import { BackendNote } from '@/types';
import { useDispatch } from 'react-redux';
import { deleteNote, deleteMaterial } from '@/store/thunks';
// import { useBackPatientById } from '@/hooks';
import { useBackendPatientById } from '@/hooks';
import { AppDispatch } from '@/store';
import Image from 'next/image';
import ArrowBack from '../../../../public/icons/ArrowBack.svg';

export default function MedicalHistory() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get('from');
  const isMaterial = from === 'material';

  const dispatch = useDispatch<AppDispatch>();

  const { id } = useBackendPatientById();

  const [showNewNote, setShowNewNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState<BackendNote | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (!selectedNote) return;

    if (isMaterial) {
      dispatch(
        deleteMaterial({ patientId: id.toString(), materialId: selectedNote.id.toString() })
      );
    } else {
      dispatch(deleteNote({ patientId: id.toString(), noteId: selectedNote.id.toString() }));
    }

    setSelectedNote(null);
    setIsEditing(false);
  };

  const getTitle = () => {
    if (isMaterial) {
      if (isEditing && !showNewNote) return 'Editar Material';
      if (!isEditing && showNewNote) return 'Agregar nuevo material';
      return 'Material para el paciente';
    } else {
      if (isEditing && !showNewNote) return 'Editar Nota';
      if (!isEditing && showNewNote) return 'Agregar nueva nota';
      return 'Gestionar notas';
    }
  };

  return (
    <div>
      {selectedNote && !isEditing && (
        <div className="px-4 pt-9 sm:px-6 md:px-10">
          <button
            onClick={() => {
              setSelectedNote(null);
              setIsEditing(false);
            }}
            className="font-roboto flex cursor-pointer items-center gap-2 text-[#0655D5] underline"
          >
            <Image src={ArrowBack} alt="Volver" width={38} height={38} />
            Volver
          </button>
        </div>
      )}
      <div className="px-4 pt-8 sm:px-6 md:px-10">
        <h1 className="text-2xlleading-[48px] font-sans font-semibold text-black sm:text-2xl md:text-2xl lg:text-3xl">
          {getTitle()}
        </h1>
      </div>

      {!showNewNote && !selectedNote && (
        <div>
          <MedicalHistoryHeader
            onAddNewNote={() => {
              setShowNewNote(true);
              router.replace(`?from=${from}&mode=new`);
            }}
          />
          <MedicalHistoryList onSelectedNote={(note) => setSelectedNote(note)} />
        </div>
      )}

      {showNewNote && (
        <div>
          <MedicalHistoryNew
            onSaved={() => setShowNewNote(false)}
            goBack={() => {
              setShowNewNote(false);
              router.replace(`?from=${from}&mode=view`);
            }}
          />
        </div>
      )}

      {selectedNote && !isEditing && (
        <div>
          <MedicalHistoryView
            note={selectedNote}
            onEdit={() => {
              setIsEditing(true);
              router.replace(`?from=${from}&mode=edit`);
            }}
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
              router.replace(`?from=${from}&mode=view`);
            }}
            goBack={() => {
              setIsEditing(false);
              router.replace(`?from=${from}&mode=view`);
            }}
          />
        </div>
      )}
    </div>
  );
}
