export interface BackendNote {
  _id?: string;
  id: number;
  noteId: number;
  patientId: number;
  title: string;
  content: string;
  creationDate: string;
  __v?: number;
}
