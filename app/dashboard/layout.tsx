'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { Navbar, Sidebar } from '@/components';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Sidebar fija al lado izquierdo */}
        <div className="fixed top-0 left-0 z-20 h-full w-64">
          <Sidebar />
        </div>

        {/* Contenido general: navbar + children */}
        <div className="ml-64 flex w-[calc(100%-16rem)] flex-1 flex-col">
          {/* Navbar empieza al lado de la sidebar */}
          <Navbar />

          {/* Contenido scrollable debajo de la navbar */}
          <main className="flex-1 overflow-y-auto bg-white">{children}</main>
        </div>
      </div>
    </Provider>
  );
}
