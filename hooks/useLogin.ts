'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setToken } from '@/store/slices/authSlice';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://proyecto-foo-production.up.railway.app/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Obtengo el token y lo guardo
      const data = await res.json();
      const token = data.token;

      dispatch(setToken(token));
      localStorage.setItem('token', token);

      router.push('/dashboard/home');
    } catch (err) {
      console.error(err);
      setError(JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
