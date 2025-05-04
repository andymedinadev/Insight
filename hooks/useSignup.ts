'use client';

import { useState } from 'react';

import { useLogin } from './useLogin';
import { transformFormDataToSignupPayload } from '@/utils';
import { RegisterResponse, SignupFormData } from '@/types';

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useLogin();

  const signup = async (formData: SignupFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);

    const signupPayload = transformFormDataToSignupPayload(formData);

    try {
      const res = await fetch('https://proyecto-foo-production.up.railway.app/api/User/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupPayload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error al registrarse');
      }

      const data: RegisterResponse = await res.json();

      // Si el registro funcionó, inicio sesión
      if (data.id) {
        await login(signupPayload.email, signupPayload.password);
      }

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
