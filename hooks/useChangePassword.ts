'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import { BACKEND_BASE_URL } from '@/config';
import { ChangePasswordPayload } from '@/types';
import type { RootState } from '@/store';

export function useChangePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);

  const changePassword = async (payload: ChangePasswordPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      if (!token) throw new Error('Token no disponible');

      const res = await fetch(`${BACKEND_BASE_URL}/api/User/me/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const message = await res.text();
        setError(message || 'Error desconocido');
        return false;
      }

      return true;
    } catch (err) {
      void error;
      setError(JSON.stringify(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error };
}
