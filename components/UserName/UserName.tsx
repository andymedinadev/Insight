// components/UserName.tsx
'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/slices/userSlice';

const UserName = () => {
  const { data, loading, error } = useSelector(selectUser);

  if (loading) return <span className="text-sm text-gray-400">Cargando...</span>;
  if (error) return <span className="text-sm text-red-500">Error</span>;
  if (!data) return <span className="text-sm text-gray-400">Usuario</span>;

  return (
    <span className="text-3xl leading-10 font-semibold text-black lg:text-3xl lg:leading-[48px] lg:font-semibold">
      {data.name} {data.surname}
    </span>
  );
};

export default UserName;
