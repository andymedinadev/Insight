'use client';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CheckFiltroOn, CheckFiltroOff, X } from '@/public';
import {
  setCreationDateFilter,
  resetCreationDateFilter,
} from '@/store/slices/backendPatientsSlice';
import { RootState } from '@/store';
import Image from 'next/image';

interface Props {
  onClose?: () => void;
}

export default function FilterDropdown({ onClose }: Props) {
  const dispatch = useDispatch();
  const dateOptions = ['Esta semana', 'Última semana', 'Este mes'];

  const currentDate = useSelector((state: RootState) => state.backendPatients.filters.creationDate);
  console.log('currentDate = ', currentDate);

  const [date, setDate] = useState<string[]>(currentDate);

  const toggleValue = (
    array: string[],
    value: string,
    setArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (array.includes(value)) {
      setArray([]);
    } else {
      setArray([value]);
    }
  };

  const renderOption = (
    value: string,
    selectedArray: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => (
    <li
      key={value}
      onClick={() => toggleValue(selectedArray, value, setArray)}
      className="mb-5.5 ml-5.5 flex cursor-pointer items-center gap-3 hover:bg-gray-100"
    >
      <Image
        src={selectedArray.includes(value) ? CheckFiltroOn : CheckFiltroOff}
        alt={selectedArray.includes(value) ? 'Seleccionado' : 'No seleccionado'}
        width={20}
        height={20}
      />
      <span>{value}</span>
    </li>
  );

  const handleApplyFilter = () => {
    console.log('handleApplyFilter ejecutado');
    dispatch(setCreationDateFilter(date));
    console.log('date = ', date);
    onClose?.();
  };

  const handleClearFilter = () => {
    setDate([]);
    dispatch(resetCreationDateFilter());
    onClose?.();
  };

  return (
    <div className="flex flex-col py-1 text-sm text-gray-700">
      <div className="mt-6 mb-6 ml-6 flex flex-row items-center justify-between">
        <h1 className="text-xl font-semibold text-black">Filtro</h1>
        <Image
          src={X}
          alt="Cerrar"
          width={24}
          height={24}
          className="mr-9 cursor-pointer"
          onClick={onClose}
        />
      </div>

      <div>
        <h3 className="mb-7 ml-5.5 text-base leading-normal font-normal text-[#000F27E5]">
          Fecha de creación
        </h3>
        <ul className="text-base leading-normal font-normal text-[#000F27E5]">
          {dateOptions.map((option) => renderOption(option, date, setDate))}
        </ul>
      </div>

      <div className="flex flex-row items-center justify-between">
        <button
          onClick={handleApplyFilter}
          className="mr-2 mb-12 ml-5.5 inline-flex h-12 w-36 cursor-pointer items-center justify-center rounded-lg bg-[#0655D5] text-base leading-normal font-semibold text-white shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.08)] lg:mr-0"
        >
          Aplicar filtros
        </button>
        <div>
          <button
            onClick={handleClearFilter}
            className="mr-12 mb-12 cursor-pointer text-base leading-7 font-semibold text-[#0655D5] underline"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
