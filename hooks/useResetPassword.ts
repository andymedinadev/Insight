'use client';

import { useState } from 'react';

import { mockApi } from '@/mocks/mockBackend';
import { ResetPasswordPayload } from '@/types';

export function useResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetPassword = async (payload: ResetPasswordPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await mockApi.auth.resetPassword(payload);

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : JSON.stringify(err);

      setError(message);

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error };
}
