export type AlertType = 'error' | 'info' | 'success';

export interface AlertData {
  title: string;
  type: AlertType;
  description?: string;
}

export type AlertCatalog<T extends Record<string, AlertData>> = T;
export type AlertKey<T extends AlertCatalog<any>> = keyof T;
export type AlertValue<T extends AlertCatalog<any>> = T[AlertKey<T>];
