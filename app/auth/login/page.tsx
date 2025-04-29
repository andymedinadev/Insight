"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login con:", { email, password });
    alert("Login simulado. Revisar consola.");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full ml-36">
        <div className="bg-white p-10 flex flex-col justify-center w-full h-full"> {/* Formulario de inicio de sesión */}
          <h2 className="text-3xl font-medium font-['Inter'] text-black ">
            Comience su jornada
          </h2>
          <h3 className="text-2xl font-medium font-['Inter'] text-black mb-2 mt-16">
            Inicie sesión
          </h3>
          <p className="text-base font-normal text-black tracking-wide leading-tight font-['Inter'] max-w-md mt-7">
            Acceda a su cuenta para continuar acompañando a sus pacientes de manera segura y eficiente.
          </p>

          <p className="text-base font-normal text-black mb-5 mt-16">
            *Datos Requeridos
          </p>

          <form onSubmit={handleLogin} className="space-y-4 w-96 max-w-full">
            <div>
              <label className="block text-base font-['Inter'] text-black">
                Correo electrónico o usuario <span className="text-gray-400">*</span>
              </label>
              <input
                type="email"
                placeholder="Ingrese su correo o usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full h-12 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-base font-['Inter'] text-black">
                Contraseña <span className="text-gray-400">*</span>
              </label>
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full h-12 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm font-bold underline text-black font-['Inter']">
                ¿Olvidó su contraseña?
              </a>
            </div>

            <Button type="submit">
               Ingresar
              </Button>

            <div className="flex justify-center mt-4 text-sm text-black font-['Inter']">
              ¿No tiene cuenta?{" "}
              <a href="#" className="ml-1 font-bold underline">
                Registrarse
              </a>
            </div>
          </form>
        </div>

        <div className="hidden md:block bg-zinc-300 w-full h-full"></div>
      </div>
    </div>
  );
}
