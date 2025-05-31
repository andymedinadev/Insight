'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/slices/userSlice';
import { fetchUser } from '@/store/thunks';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { User } from '@/types';

const UserName = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useSelector(selectUser) as {
    data: User | null;
    loading: boolean;
    error: string | null;
  };

  useEffect(() => {
    if (!data) {
      dispatch(fetchUser());
    }
  }, [dispatch, data]);

  if (loading)
    return (
      <span className="text-3xl leading-10 font-semibold text-black lg:text-3xl lg:leading-[48px] lg:font-semibold">
        Cargando...
      </span>
    );
  if (error)
    return (
      <span className="text-3xl leading-10 font-semibold text-red-500 lg:text-3xl lg:leading-[48px] lg:font-semibold">
        Error
      </span>
    );
  if (!data)
    return (
      <span className="text-3xl leading-10 font-semibold text-gray-400 lg:text-3xl lg:leading-[48px] lg:font-semibold">
        Usuario
      </span>
    );

  return (
    <span className="text-3xl leading-10 font-semibold text-black lg:text-3xl lg:leading-[48px] lg:font-semibold">
      {data.name} {data.surname}
    </span>
  );
};

export default UserName;
