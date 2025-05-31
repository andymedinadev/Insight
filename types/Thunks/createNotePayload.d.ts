export interface CreateNotePayload {
  patientId: number;
  noteData: {
    title: string;
    content: string;
    date: string;
  };
}
