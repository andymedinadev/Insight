// SearchBar.tsx
'use client';

import { useDispatch } from 'react-redux';
import { setSearchTerm } from '@/store/actions/patientActions';
import { AppDispatch } from '@/store';

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Buscar paciente"
      onChange={handleChange}
      className="rounded border px-3 py-1 text-sm text-black shadow"
    />
  );
}
