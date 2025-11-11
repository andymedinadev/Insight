import type { AlertData } from '@/types';

export const authAlerts = {
  successLogin: {
    title: 'Inicio de sesión correcto',
    type: 'success',
    description: 'Puedes comenzar a utilizar Insight.',
  },
  errorInvalidCredentials: {
    title: 'El email y/o la contraseña son incorrectos',
    type: 'error',
    description: 'Revisa el email y/o la contraseña ingresados e inténtalo nuevamente.',
  },
  errorMissingFields: {
    title: 'Credenciales inválidas',
    type: 'error',
    description: 'Debes ingresar un email y una contraseña válidos.',
  },
  errorDemoLogin: {
    title: 'No se pudo iniciar sesión en modo demo',
    type: 'error',
    description: 'Inténtalo nuevamente en unos segundos.',
  },
} as const satisfies Record<string, AlertData>;

export type AuthAlertKey = keyof typeof authAlerts;
export type AuthAlert = (typeof authAlerts)[AuthAlertKey];

export function isAlertData(x: unknown): x is AlertData {
  return (
    typeof x === 'object' &&
    x !== null &&
    'title' in x &&
    'type' in x &&
    typeof (x as any).title === 'string' &&
    typeof (x as any).type === 'string'
  );
}
