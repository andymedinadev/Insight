export { fetchAllMaterials, fetchOneMaterial } from './materialsThunks';

export {
  addNoteToPatient,
  deleteNoteOfPatient,
  editNoteOfPatient,
  fetchAllNotes,
  fetchOneNote,
} from './notesThunks';

export {
  createBackendPatient,
  fetchArchivedPatients,
  fetchOnePatient,
  fetchPatients,
} from './patientsThunks';

export { updateProfile } from './updateThunk';
