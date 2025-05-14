'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setToken } from '@/store/slices/authSlice';
import { BACKEND_BASE_URL } from '@/config';
import { VerifyPayload, VerifyResponse } from '@/types';

export function useVerification() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verify = async (data: VerifyPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BACKEND_BASE_URL}/api/User/verify-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseBody: VerifyResponse = await res.json();

      if (!res.ok) {
        throw new Error(responseBody.message || 'Error al verificar');
      }

      // Si la verificaión funcionó seteo token
      const token = responseBody.token;

      dispatch(setToken(token));
      sessionStorage.setItem('token', token);

      return true;
    } catch (err) {
      console.error(err);
      setError(JSON.stringify(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { verify, loading, error };
}
