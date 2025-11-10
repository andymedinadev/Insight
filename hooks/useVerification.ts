'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setToken } from '@/store/slices/authSlice';
import { mockApi } from '@/mocks/mockBackend';
import { VerifyPayload } from '@/types';

export function useVerification() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verify = async (data: VerifyPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const { token } = await mockApi.auth.verifyRegistration(data);

      dispatch(setToken(token));

      sessionStorage.setItem('token', token);

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : JSON.stringify(err);

      setError(message);

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { verify, loading, error };
}
