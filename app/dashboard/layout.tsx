"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { Navbar, Sidebar } from "@/components";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <div className="">
        {" "}
        {/* Usa un div en lugar de html/body */}
        <div>
          <Navbar /> {/* Navbar solo se renderiza en el dashboard */}
        </div>
        <main>
          <div className="flex flex-row">
            <div>
              <Sidebar /> {/* Sidebar solo se renderiza en el dashboard */}
            </div>
            <div>{children}</div>
          </div>
        </main>{" "}
        {/* El contenido específico de cada página en el dashboard */}
      </div>
    </Provider>
  );
}
