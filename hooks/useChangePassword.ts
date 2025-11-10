'use client';

import { useState } from 'react';

import { mockApi } from '@/mocks/mockBackend';
import { ChangePasswordPayload } from '@/types';

export function useChangePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = async (payload: ChangePasswordPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await mockApi.auth.changePassword(payload);

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : JSON.stringify(err);

      setError(message);

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error };
}
