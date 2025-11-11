'use client';

import { useState } from 'react';

import { transformFormDataToSignupPayload } from '@/utils';
import { mockApi } from '@/mocks/mockBackend';
import { SignupFormData } from '@/types';

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (formData: SignupFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);

    const signupPayload = transformFormDataToSignupPayload(formData);

    try {
      await mockApi.auth.signup(signupPayload);

      sessionStorage.setItem('signupEmail', signupPayload.email);

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : JSON.stringify(err);

      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
}
