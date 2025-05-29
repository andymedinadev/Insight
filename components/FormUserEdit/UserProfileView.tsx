'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchUser } from '@/store/slices/userSlice';
import UserProfileEdit from './UserProfileEdit';
import { iconEdit, CheckIcon } from '@/public';
import Image from 'next/image';

const UserProfileView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: user, loading, error } = useSelector((state: RootState) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saved]);

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!user) return <p>No se encontró el perfil del usuario.</p>;

  const userProfile = {
    nombre: `${user.name} ${user.surname}`,
    nacionalidad: 'Argentina',
    email: user.email,
    titulo: user.title || 'Sin título',
  };

  const profileFields = [
    { key: 'nombre', label: 'Nombre completo' },
    { key: 'nacionalidad', label: 'Nacionalidad' },
    { key: 'email', label: 'Email' },
    { key: 'titulo', label: 'Título' },
  ];

  if (isEditing) {
    return (
      <UserProfileEdit
        user={userProfile}
        onCancel={(wasSaved) => {
          setIsEditing(false);
          if (wasSaved) setSaved(true);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col space-y-10">
      {saved && (
        <div className="flex h-10 w-full flex-row items-center justify-center gap-x-4 bg-[#F2FCF9]">
          <Image src={CheckIcon} alt="Icono de edición" height={24} width={24} />
          <p className="text-2xl leading-7 font-semibold text-[#000F27E5]">
            Los cambios fueron guardados correctamente
          </p>
        </div>
      )}

      {profileFields.map(({ key, label }) => (
        <div key={key} className="flex flex-col">
          <label className="text-xl font-normal text-[#000F27E5]">{label}</label>
          <div className="inline-flex h-9 w-80 items-center justify-start gap-2 self-stretch rounded-lg bg-[#F5F7FA] text-base font-normal text-black">
            <div className="flex flex-1 items-center justify-start gap-2 self-stretch rounded-lg px-4 text-[#000F27E5]">
              {userProfile[key as keyof typeof userProfile]}
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => setIsEditing(true)}
        className="mt-4 mb-11 flex h-9 w-80 flex-row items-center justify-center rounded-lg bg-[#0655D5] px-4 py-2 text-white hover:bg-blue-700"
      >
        <div className="mr-2.5">
          <Image src={iconEdit} alt="Icono de edición" height={20} width={20} />
        </div>
        <div className="text-Text-Inverse-strong text-base leading-normal font-semibold">
          Editar información
        </div>
      </button>
    </div>
  );
};

export default UserProfileView;
