import React from 'react';
export default function ProfilePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-10">
        <h2 className="mb-8 text-2xl font-bold">Mi perfil</h2>

        <div className="flex flex-wrap gap-16">
          {/* Foto */}
          <div className="flex flex-col items-center">
            <img
              src="/profile.jpg"
              alt="Foto de perfil"
              className="mb-4 h-32 w-32 rounded-full object-cover"
            />
            <button className="rounded bg-gray-100 px-4 py-1 text-sm hover:bg-gray-200">
              Editar foto de perfil
            </button>
          </div>

          {/* Datos */}
          <div className="flex-1">
            {/* Título y botones */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Datos personales</h3>
              <div className="flex gap-4">
                <button className="rounded bg-gray-200 px-6 py-2">Cancelar</button>
                <button className="rounded bg-gray-700 px-6 py-2 text-white">Guardar</button>
              </div>
            </div>

            {/* Inputs */}
            <form className="space-y-6">
              {[
                ['Nombre completo', 'Maria Haynes'],
                ['Correo electrónico', 'mariahaynes@gmail.com'],
                ['Número telefónico', '+54 9-888888888'],
                ['Especialidad', 'Lorem Ipsum Lorem Ipsum'],
              ].map(([label, placeholder]) => (
                <div key={label} className="flex flex-col">
                  <label className="mb-1 font-['Inter'] text-xl font-medium text-black">
                    {label}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={placeholder}
                      className="w-full max-w-sm rounded border border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button type="button" className="font-['Inter'] text-sm font-normal text-black">
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
