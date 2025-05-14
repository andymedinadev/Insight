'use client';

import { useState } from 'react';

import { transformFormDataToSignupPayload } from '@/utils';
import { BACKEND_BASE_URL } from '@/config';
import { SignupFormData } from '@/types';

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (formData: SignupFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);

    const signupPayload = transformFormDataToSignupPayload(formData);

    try {
      const res = await fetch(`${BACKEND_BASE_URL}/api/User/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupPayload),
      });

      if (!res.ok) {
        const responseBody = await res.json();
        throw new Error(responseBody.message || 'Error al registrarse');
      }

      // Si el registro funcionó guardo el email temporalmente para verificar cuenta
      sessionStorage.setItem('signupEmail', signupPayload.email);

      return true;
    } catch (err) {
      console.error(err);
      setError(JSON.stringify(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
}
