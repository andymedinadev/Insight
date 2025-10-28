import type { BackendMaterial, BackendNote, BackendPatient } from '@/types';

type ExpressNote = {
  _id?: string;
  noteId?: number;
  patientId?: number;
  title?: string;
  content?: string;
  creationDate?: string;
  __v?: number;
};

type ExpressMaterial = {
  _id?: string;
  materialId?: number;
  patientId?: number;
  title?: string;
  content?: string;
  creationDate?: string;
  __v?: number;
};

type ExpressPatient = {
  _id?: string;
  patientId?: number;
  name?: string;
  surname?: string;
  birthdate?: string;
  nationality?: string;
  typeOfIdentification?: string;
  identification?: string;
  sex?: string;
  email?: string;
  phone?: string;
  age?: number;
  ageRange?: string;
  rangoEtario?: string;
  isEnabled?: boolean;
  nextNoteId?: number;
  nextMaterialId?: number;
  admissionDate?: string;
  __v?: number;
  materials?: ExpressMaterial[];
  notes?: ExpressNote[];
  principalMotive?: string | null;
  actualSymptoms?: string | null;
  recentEvents?: string | null;
  previousDiagnosis?: string | null;
  profesionalObservations?: string | null;
  keyWords?: string | null;
  failedActs?: string | null;
  interconsulation?: string | null;
  patientEvolution?: string | null;
  sessionDay?: string | null;
  modality?: string | null;
  sessionDuration?: number | null;
  sessionFrequency?: string | null;
  preferedContact?: string | null;
};

export function mapExpressNoteToBackendNote(note: ExpressNote): BackendNote {
  const noteId = note.noteId ?? note.id ?? 0;

  return {
    _id: note._id,
    id: noteId,
    noteId,
    patientId: note.patientId ?? 0,
    title: note.title ?? '',
    content: note.content ?? '',
    creationDate: note.creationDate ?? new Date().toISOString(),
    __v: note.__v,
  };
}

export function mapExpressMaterialToBackendMaterial(material: ExpressMaterial): BackendMaterial {
  const materialId = material.materialId ?? material.id ?? 0;

  return {
    _id: material._id,
    id: materialId,
    materialId,
    patientId: material.patientId ?? 0,
    title: material.title ?? '',
    content: material.content ?? '',
    creationDate: material.creationDate ?? new Date().toISOString(),
    __v: material.__v,
  };
}

export function mapExpressPatientToBackendPatient(patient: ExpressPatient): BackendPatient {
  const patientId = patient.patientId ?? 0;
  const notes = patient.notes?.map(mapExpressNoteToBackendNote) ?? [];
  const materials = patient.materials?.map(mapExpressMaterialToBackendMaterial) ?? [];
  const rangoEtario = patient.ageRange ?? patient.rangoEtario ?? '';

  return {
    _id: patient._id,
    id: patientId,
    patientId,
    name: patient.name ?? '',
    surname: patient.surname ?? '',
    birthdate: patient.birthdate ?? new Date().toISOString(),
    nationality: patient.nationality ?? '',
    typeOfIdentification: patient.typeOfIdentification ?? '',
    identification: patient.identification ?? '',
    sex: patient.sex ?? '',
    email: patient.email ?? '',
    phone: patient.phone ?? '',
    age: patient.age ?? 0,
    ageRange: patient.ageRange ?? '',
    rangoEtario,
    isEnabled: patient.isEnabled ?? true,
    nextNoteId: patient.nextNoteId ?? 0,
    nextMaterialId: patient.nextMaterialId ?? 0,
    admissionDate: patient.admissionDate ?? new Date().toISOString(),
    __v: patient.__v,
    materials,
    notes,
    principalMotive: patient.principalMotive ?? null,
    actualSymptoms: patient.actualSymptoms ?? null,
    recentEvents: patient.recentEvents ?? null,
    previousDiagnosis: patient.previousDiagnosis ?? null,
    profesionalObservations: patient.profesionalObservations ?? null,
    keyWords: patient.keyWords ?? null,
    failedActs: patient.failedActs ?? null,
    interconsulation: patient.interconsulation ?? null,
    patientEvolution: patient.patientEvolution ?? null,
    sessionDay: patient.sessionDay ?? null,
    modality: patient.modality ?? null,
    sessionDuration: patient.sessionDuration ?? null,
    sessionFrequency: patient.sessionFrequency ?? null,
    preferedContact: patient.preferedContact ?? null,
  };
}
