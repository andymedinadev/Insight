// SearchBar.tsx
'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm, resetFilters } from '@/store/slices/patientSlice';
import { AppDispatch } from '@/store';
import Image from 'next/image';
import { Search } from '@/public';

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  // Efecto para limpiar filtros al desmontar
  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch]);

  return (
    <div className="flex h-12 w-72 flex-row items-center rounded-lg border border-[#001F5273] lg:h-12 lg:w-80">
      <Image src={Search} alt="Buscar paciente" width={24} height={24} className="mr-2 ml-4" />
      <input
        type="text"
        placeholder="Buscar paciente"
        onChange={handleChange}
        className="lg:24px text-gray-400 placeholder-gray-400 focus:outline-none lg:w-3xs"
      />
    </div>
  );
}
