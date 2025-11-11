'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LoginHeader } from '@/components';
import { useAlert } from '@/contexts/AlertContext';
import { useLogin } from '@/hooks';
import { DEMO_EMAIL, DEMO_PASSWORD } from '@/mocks/data';

export function LoginHeaderContainer() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { login, loading } = useLogin();

  const [redirecting, setRedirecting] = useState(false);
  const isLoading = loading || redirecting;

  const handleDemoLogin = async () => {
    const result = await login(DEMO_EMAIL, DEMO_PASSWORD);
    showAlert(result.alert);

    if (result.success) {
      setRedirecting(true);
      router.push('/dashboard/home');
    }
  };

  return <LoginHeader isLoading={isLoading} onDemoLogin={handleDemoLogin} />;
}
