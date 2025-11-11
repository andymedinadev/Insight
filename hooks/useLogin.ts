'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setToken } from '@/store/slices/authSlice';
import { mockApi } from '@/mocks/mockBackend';

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
      const { token } = await mockApi.auth.login(email, password);

      dispatch(setToken(token));

      sessionStorage.setItem('token', token);

      return { success: true, alert: alertSuccess };
    } catch {
      return { success: false, alert: alertError };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
