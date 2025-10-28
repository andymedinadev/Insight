'use client';

import { useState } from 'react';
import { BACKEND_BASE_URL } from '@/config';
import { ChangePasswordPayload } from '@/types';

export function useChangePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = async (payload: ChangePasswordPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BACKEND_BASE_URL}/api/users/me/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
