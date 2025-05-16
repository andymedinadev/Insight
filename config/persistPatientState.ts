import { Middleware } from '@reduxjs/toolkit';
import { HardcodedPatient } from '@/types';
import type { Action } from '@reduxjs/toolkit';

type PatientPartialState = {
  patients: {
    initialized: boolean;
    newListDemo: HardcodedPatient[];
  };
};

const actionsToPersist = [
  'setEntireState',
  'addMaterialToPatient',
  'addNoteToPatient',
  'addToNewListDemo',
  'editNewTypePatient',
  'editMaterialOfPatient',
  'editNoteOfPatient',
  'deleteNoteOfPatient',
  'deleteMaterialOfPatient',
  'toggleFiled',
];

// eslint-disable-next-line
export const persistPatientState: Middleware<{}, PatientPartialState> =
  (storeAPI) => (next) => (action) => {
    const result = next(action);

    const safeAction = action as Action;
    const actionType = safeAction.type?.split('/')?.pop();

    if (!actionType || !actionsToPersist.includes(actionType)) return result;

    const { patients } = storeAPI.getState();

    const toPersist = {
      initialized: patients.initialized,
      newListDemo: patients.newListDemo,
    };

    try {
      localStorage.setItem('patientState', JSON.stringify(toPersist));
    } catch (error) {
      console.warn('No se pudo guardar patientState en localStorage:', error);
    }

    return result;
  };
