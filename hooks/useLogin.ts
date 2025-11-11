'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setToken } from '@/store/slices/authSlice';
import { mockApi } from '@/mocks/mockBackend';
import { authAlerts } from '@/constants';
import { AlertData } from '@/types';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; alert: AlertData }> => {
    setLoading(true);

    try {
      const { token } = await mockApi.auth.login(email, password);

      dispatch(setToken(token));

      sessionStorage.setItem('token', token);

      return { success: true, alert: authAlerts.successLogin };
    } catch {
      return { success: false, alert: authAlerts.errorInvalidCredentials };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
