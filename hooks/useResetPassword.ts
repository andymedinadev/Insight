'use client';

import { useState } from 'react';

import { BACKEND_BASE_URL } from '@/config';
import { ResetPasswordPayload } from '@/types';

export function useResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetPassword = async (payload: ResetPasswordPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BACKEND_BASE_URL}/api/Auth/verify-password-reset-code`, {
        method: 'POST',
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
      setError(JSON.stringify(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error };
}
