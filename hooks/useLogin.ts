'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setToken } from '@/store/slices/authSlice';
import { BACKEND_BASE_URL } from '@/config';

type AlertType = 'error' | 'info' | 'success';

type AlertData = {
  title: string;
  type: AlertType;
  description?: string;
};

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; alert: AlertData }> => {
    setLoading(true);

    const alertSuccess: AlertData = {
      title: 'Inicio de sesión correcto',
      type: 'success',
      description: 'Puedes comenzar a utilizar Insight.',
    };

    const alertError: AlertData = {
      title: 'El email y/o la contraseña son incorrectos',
      type: 'error',
      description: 'Revisa el email y/o la contraseña ingresados e inténtalo nuevamente.',
    };

    try {
      const res = await fetch(`${BACKEND_BASE_URL}/api/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 401) {
        return { success: false, alert: alertError };
      }

      if (res.status === 200) {
        const data = await res.json();
        const token = data.token;

        dispatch(setToken(token));
        sessionStorage.setItem('token', token);

        return { success: true, alert: alertSuccess };
      }

      return {
        success: false,
        alert: {
          title: 'Error inesperado',
          type: 'error',
          description: 'Ocurrió un error inesperado al iniciar sesión.',
        },
      };
    } catch {
      return {
        success: false,
        alert: {
          title: 'Error de conexión',
          type: 'error',
          description: 'No se pudo conectar con el servidor.',
        },
      };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
