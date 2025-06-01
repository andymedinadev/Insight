'use client';

import { useState } from 'react';

import { useAppDispatch } from '@/hooks';
import { updateUser } from '@/store/thunks';

interface UserProfile {
  nombre: string;
  nacionalidad: string;
  email: string;
  titulo: string;
}

interface Props {
  user: UserProfile;
  onCancel: (success?: boolean) => void;
}

const profileFields = [
  { key: 'nombre', label: 'Nombre completo' },
  { key: 'nacionalidad', label: 'Nacionalidad' },
  { key: 'email', label: 'Email' },
  { key: 'titulo', label: 'Título' },
];

const UserProfileEdit = ({ user, onCancel }: Props) => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      await dispatch(updateUser(form)).unwrap();
      onCancel(true);
    } catch (error: unknown) {
      setError(String(error) || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-10">
      {profileFields.map(({ key, label }) => (
        <div key={key}>
          <label className="flex flex-col text-xl font-normal text-[#000F27E5]">{label}</label>
          <div className="inline-flex h-9 w-80 items-center justify-start gap-2 self-stretch rounded-lg bg-[#F5F7FA] text-base font-normal text-black">
            <div className="flex flex-1 items-center justify-start gap-2 self-stretch rounded-lg px-4">
              <input
                type="text"
                name={key}
                value={form[key as keyof UserProfile]}
                onChange={handleChange}
                className="w-full bg-transparent text-[#000F27E5] outline-none"
              />
            </div>
          </div>
        </div>
      ))}

      {error && <p className="text-red-600">{error}</p>}

      <div className="mb-5 flex flex-col gap-4">
        <button
          onClick={handleSave}
          disabled={loading}
          className="text-Text-Inverse-strong mt-4 flex h-9 w-80 flex-row items-center justify-center rounded-lg bg-[#0655D5] px-4 py-2 text-base leading-normal font-semibold text-white hover:bg-blue-700"
        >
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
        <button
          onClick={() => onCancel()}
          disabled={loading}
          className="text-sm leading-normal font-bold text-blue-700 underline"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default UserProfileEdit;
