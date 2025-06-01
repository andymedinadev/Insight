'use client';

import { createContext, useCallback, useContext, useState } from 'react';

import { Alert } from '@/components';

type AlertType = 'error' | 'info' | 'success';

type ShowAlertParams = {
  title: string;
  type: AlertType;
  description?: string;
  duration?: number;
};

type AlertContextType = {
  showAlert: (params: ShowAlertParams) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<AlertType>('info');
  const [visible, setVisible] = useState(false);

  const showAlert = useCallback(
    ({ title, type, description = '', duration = 7000 }: ShowAlertParams) => {
      setMessage(title);
      setDescription(description);
      setType(type);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, duration);
    },
    []
  );

  return (
    <AlertContext.Provider value={{ showAlert }}>
      <Alert
        title={message}
        type={type}
        description={description}
        visible={visible}
        onClose={() => setVisible(false)}
        position="bottom-left"
      />
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within a AlertProvider');
  return context;
}
