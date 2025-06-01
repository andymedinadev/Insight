'use client';

import { Provider } from 'react-redux';

import { AlertProvider } from '@/contexts/AlertContext';
import { store } from '@/store';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AlertProvider>{children}</AlertProvider>
    </Provider>
  );
}
