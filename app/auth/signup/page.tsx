"use client";

import { useState } from "react";
import Link from "next/link";

import { Button, InputField } from "@/components";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos registro:", { ...formData });
    alert("Registro existoso"); //simulación
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full ml-36">
        <div className="bg-white p-10 flex flex-col justify-center w-full h-full">
          <h2 className="text-3xl font-medium  text-black ">Bienvenido/a</h2>
          <h3 className="text-2xl font-medium  text-black mb-2 mt-16">
            Cree su cuenta
          </h3>
          <p className="text-base font-normal text-black tracking-wide leading-tight  max-w-md mt-7">
            Desde aquí podrá gestionar sus pacientes, registrar observaciones y
            brindar un seguimiento personalizado y organizado.
          </p>
          <p className="text-base font-normal text-black mb-5 mt-16">
            *Datos Requeridos
          </p>
          <form onSubmit={handleSignup} className="space-y-4 w-96 max-w-full">
            <InputField
              id="name"
              label="Nombre/s"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingrese sus nombre/s"
              required
            />

            <InputField
              id="lastname"
              label="Apellido/s"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Ingrese sus apellido/s"
              required
            />
            <InputField
              id="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingrese su email"
              required
            />

            <InputField
              id="password"
              label="Contraseña"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              required
            />

            <Button type="submit">Crear cuenta</Button>

            <div className="flex justify-center mt-4 text-sm text-black ">
              ¿Ya tiene una cuenta?{" "}
              <Link href="/auth/login" className="ml-1 font-bold underline">
                Iniciar sesión
              </Link>
            </div>
          </form>
        </div>

        {/* Background */}
        <div className="hidden md:block bg-zinc-300 w-full h-full"></div>
      </div>
    </div>
  );
}
