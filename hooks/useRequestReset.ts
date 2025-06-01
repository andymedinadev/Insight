'use client';

import { useState } from 'react';

import { BACKEND_BASE_URL } from '@/config';

export function useRequestReset() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestReset = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BACKEND_BASE_URL}/api/Auth/request-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
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

  return { requestReset, loading, error };
}
