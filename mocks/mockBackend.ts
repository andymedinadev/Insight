import { formatISO } from 'date-fns';

import {
  clone,
  delay,
  getNextId,
  normalizePatientAge,
  sanitizeNumber,
  sanitizeText,
  toIsoDate,
} from '@/utils';

import {
  demoUser,
  initialArchivedPatients,
  initialMaterials,
  initialNotes,
  initialPatients,
} from '@/mocks/data';

import { removePatientFromCollection, updatePatientInCollection } from '@/mocks/helpers';

import type {
  BackendMaterial,
  BackendNewPatient,
  BackendNote,
  BackendPatient,
  ChangePasswordPayload,
  ResetPasswordPayload,
  SignupPayload,
  VerifyPayload,
} from '@/types';

let patients = [...initialPatients];
let archivedPatients = [...initialArchivedPatients];
let notes = [...initialNotes];
let materials = [...initialMaterials];

let pendingSignupEmail: string | null = null;

let currentUser = { ...demoUser };

const mockAuthService = {
  async login(email: string, password: string) {
    await delay();

    if (!email || !password) {
      throw new Error('Credenciales inválidas');
    }

    return { token: 'mock-token' } as const;
  },
  async signup(payload: SignupPayload) {
    await delay();

    pendingSignupEmail = payload.email;

    return { success: true } as const;
  },
  async verifyRegistration({ email, verificationCode }: VerifyPayload) {
    await delay();

    if (!pendingSignupEmail || pendingSignupEmail !== email) {
      throw new Error('No hay registros pendientes para ese email');
    }

    if (!verificationCode || verificationCode.trim().length < 4) {
      throw new Error('Código de verificación inválido');
    }

    pendingSignupEmail = null;

    return { token: 'mock-token' } as const;
  },
  async requestPasswordReset(email: string) {
    await delay();

    if (!email) {
      throw new Error('Email requerido');
    }

    return { success: true } as const;
  },
  async resetPassword(payload: ResetPasswordPayload) {
    await delay();

    if (!payload.email || !payload.newPassword) {
      throw new Error('Datos incompletos');
    }

    if (payload.newPassword.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    return { success: true } as const;
  },
  async changePassword(payload: ChangePasswordPayload) {
    await delay();

    if (!payload.newPassword || payload.newPassword.length < 6) {
      throw new Error('La nueva contraseña es demasiado corta');
    }

    if (payload.newPassword !== payload.confirmNewPassword) {
      throw new Error('Las contraseñas no coinciden');
    }

    return { success: true } as const;
  },
};

const mockPatientsService = {
  async list() {
    await delay();

    return patients.map((patient) => clone(normalizePatientAge(patient)));
  },
  async listArchived() {
    await delay();

    return archivedPatients.map((patient) => clone(normalizePatientAge(patient)));
  },
  async get(id: number) {
    await delay();

    const patient = findPatientById(id);

    if (!patient) {
      throw new Error('Paciente no encontrado');
    }

    return clone(normalizePatientAge(patient));
  },
  async create(payload: BackendNewPatient) {
    await delay();

    const newPatient = buildPatientFromNew(payload);

    patients = [...patients, newPatient];

    return clone(newPatient);
  },
  async update(payload: BackendPatient) {
    await delay();

    const normalized = normalizePatientAge(payload);

    const updated =
      updatePatientInCollection(patients, normalized) ||
      updatePatientInCollection(archivedPatients, normalized);

    if (!updated) {
      throw new Error('Paciente no encontrado');
    }

    return clone(normalized);
  },
  async remove(id: number) {
    await delay();

    const removed =
      removePatientFromCollection(patients, id) ||
      removePatientFromCollection(archivedPatients, id);

    if (!removed) {
      throw new Error('Paciente no encontrado');
    }

    notes = notes.filter((note) => note.patientId !== id);
    materials = materials.filter((material) => material.patientId !== id);

    return { id } as const;
  },
  async archive(id: number) {
    await delay();

    const removed = removePatientFromCollection(patients, id);

    if (!removed) {
      throw new Error('Paciente no encontrado');
    }

    archivedPatients = [...archivedPatients, removed];
  },
  async unarchive(id: number) {
    await delay();

    const removed = removePatientFromCollection(archivedPatients, id);

    if (!removed) {
      throw new Error('Paciente no encontrado');
    }

    patients = [...patients, removed];
  },
};

const mockNotesService = {
  async list(patientId: number) {
    await delay();

    return notes
      .filter((note) => note.patientId === patientId)
      .map((note) => clone({ ...note, creationDate: toIsoDate(note.creationDate) }));
  },

  async get(patientId: number, noteId: number) {
    await delay();

    const note = notes.find((item) => item.patientId === patientId && item.id === noteId);

    if (!note) {
      throw new Error('Nota no encontrada');
    }

    return clone({ ...note, creationDate: toIsoDate(note.creationDate) });
  },
  async create(patientId: number, data: { title: string; content: string; date: string }) {
    await delay();

    const note: BackendNote = {
      id: getNextId(notes),
      patientId,
      title: data.title,
      content: data.content,
      creationDate: toIsoDate(data.date),
    };

    notes = [...notes, note];

    return clone(note);
  },
  async update(
    patientId: number,
    noteId: number,
    data: { title: string; content: string; date: string }
  ) {
    await delay();

    const index = notes.findIndex((item) => item.patientId === patientId && item.id === noteId);

    if (index === -1) {
      throw new Error('Nota no encontrada');
    }

    notes[index] = {
      id: noteId,
      patientId,
      title: data.title,
      content: data.content,
      creationDate: toIsoDate(data.date),
    };

    return clone(notes[index]);
  },
  async remove(patientId: number, noteId: number) {
    await delay();

    const index = notes.findIndex((item) => item.patientId === patientId && item.id === noteId);

    if (index === -1) {
      throw new Error('Nota no encontrada');
    }

    notes.splice(index, 1);

    return { id: noteId } as const;
  },
};

const mockMaterialsService = {
  async list(patientId: number) {
    await delay();

    return materials
      .filter((material) => material.patientId === patientId)
      .map((material) => clone({ ...material, creationDate: toIsoDate(material.creationDate) }));
  },
  async get(patientId: number, materialId: number) {
    await delay();

    const material = materials.find(
      (item) => item.patientId === patientId && item.id === materialId
    );

    if (!material) {
      throw new Error('Material no encontrado');
    }

    return clone({ ...material, creationDate: toIsoDate(material.creationDate) });
  },
  async create(patientId: number, data: { title: string; content: string; date: string }) {
    await delay();

    const material: BackendMaterial = {
      id: getNextId(materials),
      patientId,
      title: data.title,
      content: data.content,
      creationDate: toIsoDate(data.date),
    };

    materials = [...materials, material];

    return clone(material);
  },
  async update(
    patientId: number,
    materialId: number,
    data: { title: string; content: string; date: string }
  ) {
    await delay();

    const index = materials.findIndex(
      (item) => item.patientId === patientId && item.id === materialId
    );

    if (index === -1) {
      throw new Error('Material no encontrado');
    }

    materials[index] = {
      id: materialId,
      patientId,
      title: data.title,
      content: data.content,
      creationDate: toIsoDate(data.date),
    };

    return clone(materials[index]);
  },
  async remove(patientId: number, materialId: number) {
    await delay();

    const index = materials.findIndex(
      (item) => item.patientId === patientId && item.id === materialId
    );

    if (index === -1) {
      throw new Error('Material no encontrado');
    }

    materials.splice(index, 1);

    return { id: materialId } as const;
  },
};

const mockUserService = {
  async get() {
    await delay();

    return clone(currentUser);
  },
  async update(update: { name: string; surname: string; email: string; title: string }) {
    await delay();

    const updated = {
      ...currentUser,
      name: update.name,
      surname: update.surname,
      email: update.email,
      title: update.title,
    };

    return clone(updated);
  },
};

function findPatientById(id: number): BackendPatient | null {
  const active = patients.find((patient) => patient.id === id);

  if (active) return active;

  const archived = archivedPatients.find((patient) => patient.id === id);

  return archived ?? null;
}

function buildPatientFromNew(payload: BackendNewPatient): BackendPatient {
  const now = new Date();

  return normalizePatientAge({
    id: getNextId([...patients, ...archivedPatients]),
    name: payload.name,
    surname: payload.surname,
    birthdate: payload.birthdate,
    typeOfIdentification: payload.typeOfIdentification,
    identification: payload.identification,
    sex: payload.sex ?? 'Otro',
    email: payload.email,
    phone: payload.phone,
    admissionDate: formatISO(now),
    rangoEtario: 'Adulto',
    age: 0,
    nationality: payload.nationality,
    principalMotive: sanitizeText(payload.principalMotive),
    actualSymptoms: sanitizeText(payload.actualSymptoms),
    recentEvents: sanitizeText(payload.recentEvents),
    previousDiagnosis: sanitizeText(payload.previousDiagnosis),
    profesionalObservations: sanitizeText(payload.profesionalObservations),
    keyWords: sanitizeText(payload.keyWords),
    failedActs: sanitizeText(payload.failedActs),
    interconsulation: sanitizeText(payload.interconsulation),
    patientEvolution: sanitizeText(payload.patientEvolution),
    sessionDay: sanitizeText(payload.sessionDay),
    modality: sanitizeText(payload.modality) ?? 'Presencial',
    sessionDuration: sanitizeNumber(payload.sessionDuration),
    sessionFrequency: sanitizeText(payload.sessionFrequency),
    preferedContact: sanitizeText(payload.preferedContact),
  });
}

export const mockApi = {
  auth: mockAuthService,
  user: mockUserService,
  patients: mockPatientsService,
  notes: mockNotesService,
  materials: mockMaterialsService,
};

export type MockApi = typeof mockApi;
