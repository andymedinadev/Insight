'use client';

import { Provider } from 'react-redux';

import { store } from '@/store';
import { ReduxHydration } from '@/config';
import { Navbar, Sidebar } from '@/components';

// como este es el primer componente cliente, acá voy a hidratar el estado

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ReduxHydration />
      <div className="lg:flex lg:h-screen lg:w-screen lg:overflow-hidden">
        {/* Sidebar fija al lado izquierdo */}
        <div className="lg:fixed lg:top-0 lg:left-0 lg:z-20 lg:h-full lg:w-64">
          <Sidebar />
        </div>

        {/* Contenido general: navbar + children */}
        <div className="lg:ml-64 lg:flex lg:w-[calc(100%-16rem)] lg:flex-1 lg:flex-col">
          {/* Navbar empieza al lado de la sidebar */}
          <Navbar />

          {/* Contenido scrollable debajo de la navbar */}
          <main className="lg:flex-1 lg:overflow-y-auto lg:bg-white">{children}</main>
        </div>
      </div>
    </Provider>
  );
}
