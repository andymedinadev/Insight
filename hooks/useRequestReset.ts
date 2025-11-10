'use client';

import { useState } from 'react';

import { mockApi } from '@/mocks/mockBackend';

export function useRequestReset() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestReset = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      await mockApi.auth.requestPasswordReset(email);

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : JSON.stringify(err);

      setError(message);

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { requestReset, loading, error };
}
