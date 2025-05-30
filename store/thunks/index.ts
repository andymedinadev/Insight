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
  deleteBackendPatient,
  editBackendPatient,
  fetchArchivedPatients,
  fetchOnePatient,
  fetchPatients,
  submitEditedPatient,
} from './patientsThunks';

export { updateProfile } from './updateThunk';
