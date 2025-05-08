'use client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import Image from 'next/image';
import { UpdateProfilePayload } from '@/types/Profile/profileTypes';

export default function ProfilePage() {
  const { updateProfileAction } = useUpdateProfile();

  // Obtener el perfil del estado de Redux
  const { user, status, error } = useSelector((state: RootState) => state.profile);

  // Estado local para el formulario
  const [formData, setFormData] = useState<UpdateProfilePayload>({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    specialty: user.specialty,
    avatarUrl: user.avatarUrl,
  });

  // Estado para controlar si el campo está en modo edición
  const [editMode, setEditMode] = useState<Record<keyof UpdateProfilePayload, boolean>>({
    name: false,
    lastName: false,
    email: false,
    phone: false,
    specialty: false,
    avatarUrl: false,
    password: false, // Agregar estas propiedades si no están en uso
    identification: false, // Lo mismo aquí
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null); // Estado para la foto de perfil

  useEffect(() => {
    // Actualiza el formulario con los datos del usuario cuando cambie el estado de Redux
    setFormData({
      name: user.name,
      lastName: user.lastName,
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

  // Maneja el cambio de la foto de perfil
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);

      // Si estás subiendo la imagen a un servidor, aquí deberías manejar el upload.
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const response = await fetch('/api/upload-avatar', {
          // Ruta de subida de imagen
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        if (result.url) {
          // Suponiendo que el servidor retorna una URL
          setFormData((prevState) => ({
            ...prevState,
            avatarUrl: result.url, // Actualiza la URL en el estado
          }));
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
      }
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFormData = { ...formData };
    if (avatarFile) {
      // Si hay una nueva foto de perfil, agrega el archivo al formulario (necesitarás manejar esto en tu hook o backend)
      updatedFormData.avatarUrl = URL.createObjectURL(avatarFile);
    }
    updateProfileAction(updatedFormData);
  };

  // Función para activar/desactivar el modo edición de un campo
  const handleEditClick = (field: keyof UpdateProfilePayload) => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: !prevState[field], // Cambia el estado (activar/desactivar edición)
    }));
  };

  const fields: [string, keyof UpdateProfilePayload][] = [
    ['Nombre', 'name'],
    ['Apellido', 'lastName'],
    ['Correo electrónico', 'email'],
    ['Número telefónico', 'phone'],
    ['Especialidad', 'specialty'],
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 overflow-y-auto p-10">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Mi perfil</h2>

          <div className="flex gap-4">
            <button
              type="button"
              className="h-9 w-28 cursor-pointer rounded-lg bg-[#F5F5F5] hover:bg-[#E0E0E0]"
              onClick={() => setFormData(user)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="profile-form"
              className="h-9 w-28 cursor-pointer rounded-lg bg-[#F5F5F5] hover:bg-[#E0E0E0]"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold">Datos Personales</h3>
        </div>

        <div className="flex flex-wrap gap-16">
          <div className="flex flex-col items-center">
            <Image
              src={formData.avatarUrl || '/default-avatar.jpg'}
              alt="Foto de perfil"
              className="mb-4 rounded-full object-cover"
              width={192}
              height={192}
            />
            <button
              className="h-9 w-52 cursor-pointer rounded-lg bg-[#F5F5F5] hover:bg-[#E0E0E0]"
              onClick={() => document.getElementById('avatar-upload')?.click()}
            >
              Editar foto de perfil
            </button>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="flex-1">
            <form id="profile-form" className="space-y-[53px]" onSubmit={handleSubmit}>
              {fields.map(([label, name]) => (
                <div key={name} className="flex flex-col">
                  <label className="mb-1 font-medium">{label}</label>

                  {editMode[name] ? (
                    <input
                      type="text"
                      name={name}
                      value={formData[name] || ''}
                      onChange={handleChange}
                      className="w-64 rounded border border-gray-300 bg-white p-2"
                    />
                  ) : (
                    <div className="flex w-64 items-center justify-between rounded border border-gray-300 bg-gray-100 p-2">
                      <span>{formData[name]}</span>
                      <button
                        type="button"
                        onClick={() => handleEditClick(name)}
                        className="text-sm text-blue-500 hover:underline"
                      >
                        Editar
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {status === 'failed' && (
                <div className="mt-4 text-red-500">
                  {/* Verificar si error es un objeto o un string */}
                  {typeof error === 'string' ? error : error?.message || 'Error desconocido'}
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
