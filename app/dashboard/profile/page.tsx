'use client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { UpdateProfilePayload } from '@/types/Profile/profileTypes';

export default function ProfilePage() {
  const updateProfileAction = useUpdateProfile();

  // Obtener el perfil del estado de Redux
  const { user, status, error } = useSelector((state: RootState) => state.profile);

  // Estado local para el formulario
  const [formData, setFormData] = useState<UpdateProfilePayload>({
    name: user.name,
    email: user.email,
    phone: user.phone,
    specialty: user.specialty,
    avatarUrl: user.avatarUrl,
  });

  // Estado para controlar si el campo está en modo edición
  const [editMode, setEditMode] = useState<{
    name: boolean;
    email: boolean;
    phone: boolean;
    specialty: boolean;
  }>({
    name: false,
    email: false,
    phone: false,
    specialty: false,
  });

  useEffect(() => {
    // Actualiza el formulario con los datos del usuario cuando cambie el estado de Redux
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      specialty: user.specialty,
      avatarUrl: user.avatarUrl,
    });
  }, [user]);

  // Maneja el cambio de los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileAction(formData);
  };

  // Función para activar/desactivar el modo edición de un campo
  const handleEditClick = (field: keyof Omit<UpdateProfilePayload, 'avatarUrl'>) => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: !prevState[field], // Cambia el estado (activar/desactivar edición)
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-10">
        <h2 className="mb-8 text-2xl font-bold">Mi perfil</h2>

        <div className="flex flex-wrap gap-16">
          {/* Foto */}
          <div className="flex flex-col items-center">
            <img
              src={formData.avatarUrl || '/default-avatar.jpg'}
              alt="Foto de perfil"
              className="mb-4 rounded-full object-cover"
              width={192}
              height={192}
            />
            <button className="h-9 w-52 cursor-pointer rounded-lg bg-neutral-100 hover:bg-neutral-200">
              Editar foto de perfil
            </button>
          </div>

          {/* Datos */}
          <div className="flex-1">
            {/* Título y botones alineados */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-['Inter'] text-2xl font-medium text-black">Datos personales</h3>
              {/* Botones de acción alineados a la derecha */}
              <div className="flex gap-4">
                <button
                  type="button"
                  className="h-9 w-28 cursor-pointer rounded-lg bg-neutral-100 hover:bg-neutral-200"
                >
                  Cancelar
                </button>
                {/* El botón de guardar está dentro del formulario */}
                <button
                  type="submit"
                  className="h-9 w-28 cursor-pointer rounded-lg bg-neutral-100 hover:bg-neutral-200"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </div>

            {/* Formulario */}
            <form className="space-y-[53px]" onSubmit={handleSubmit}>
              {[
                ['Nombre completo', 'name'],
                ['Correo electrónico', 'email'],
                ['Número telefónico', 'phone'],
                ['Especialidad', 'specialty'],
              ].map(([label, name]) => (
                <div key={name} className="flex flex-col">
                  <label className="mb-1 font-['Inter'] text-xl font-medium text-black">
                    {label}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      name={name}
                      value={formData[name as keyof UpdateProfilePayload]} // Usamos UpdateProfilePayload aquí
                      onChange={handleChange}
                      className="w-full max-w-sm rounded-lg border border-gray-300 bg-[#F5F5F5] px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      disabled={!editMode[name as keyof Omit<UpdateProfilePayload, 'avatarUrl'>]} // Corregido
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleEditClick(name as keyof Omit<UpdateProfilePayload, 'avatarUrl'>)
                      }
                      className="cursor-pointer font-['Inter'] text-sm font-normal text-black"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </form>

            {/* Mensaje de error */}
            {status === 'failed' && <div className="mt-4 text-red-500">{error}</div>}
          </div>
        </div>
      </main>
    </div>
  );
}
