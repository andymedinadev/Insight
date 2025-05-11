'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import {
  setFilterModalidad,
  setFilterGenero,
  setFilterRangoEtario,
} from '@/store/actions/patientActions';
import { RootState } from '@/store';
import { CheckFiltroOn, CheckFiltroOff, X } from '@/public';

interface Props {
  onClose?: () => void;
}

export default function PatientFilterDropdown({ onClose }: Props) {
  const dispatch = useDispatch();

  const currentModalidad = useSelector((state: RootState) => state.patients.filters.modalidad);
  const currentGenero = useSelector((state: RootState) => state.patients.filters.genero);
  const currentRangoEtario = useSelector((state: RootState) => state.patients.filters.rangoEtario);

  // Estados locales para acumular cambios antes de aplicar
  const [modalidad, setModalidad] = useState<string[]>(currentModalidad);
  const [genero, setGenero] = useState<string[]>(currentGenero);
  const [rangoEtario, setRangoEtario] = useState<string[]>(currentRangoEtario);

  const modalidadOptions = ['Presencial', 'Online', 'Híbrido'];
  const generoOptions = ['Femenino', 'Masculino', 'Otro'];
  const rangoEtarioOptions = ['0-12 años', '13-17 años', 'Más de 18 años'];

  const toggleValue = (
    array: string[],
    value: string,
    setArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (array.includes(value)) {
      setArray(array.filter((item) => item !== value));
    } else {
      setArray([...array, value]);
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

  const handleApplyFilters = () => {
    dispatch(setFilterModalidad(modalidad));
    dispatch(setFilterGenero(genero));
    dispatch(setFilterRangoEtario(rangoEtario));
    onClose?.(); // Cerrar dropdown
  };

  const handleClearFilters = () => {
    setModalidad([]);
    setGenero([]);
    setRangoEtario([]);
    dispatch(setFilterModalidad([]));
    dispatch(setFilterGenero([]));
    dispatch(setFilterRangoEtario([]));
    onClose?.(); // Cerrar dropdown
  };

  return (
    <div className="flex flex-col py-1 text-sm text-gray-700">
      <div className="mt-6 mb-6 ml-6 flex flex-row items-center justify-between">
        <h1 className="text-xl font-semibold text-black">Filtros</h1>
        <Image
          src={X}
          alt="Cerrar"
          width={24}
          height={24}
          className="mr-9 cursor-pointer"
          onClick={onClose}
        />
      </div>

      {/* Modalidad */}
      <div>
        <h3 className="mb-7 ml-5.5 text-base leading-normal font-normal text-[#000F27E5]">
          Modalidad
        </h3>
        <ul className="text-base leading-normal font-normal text-[#000F27E5]">
          {modalidadOptions.map((option) => renderOption(option, modalidad, setModalidad))}
        </ul>
      </div>

      {/* Género */}
      <div>
        <h3 className="mb-7 ml-5.5 text-base leading-normal font-normal text-[#000F27E5]">Sexo</h3>
        <ul className="text-base leading-normal font-normal text-[#000F27E5]">
          {generoOptions.map((option) => renderOption(option, genero, setGenero))}
        </ul>
      </div>

      {/* Rango Etario */}
      <div>
        <h3 className="mb-7 ml-5.5 text-base leading-normal font-normal text-[#000F27E5]">
          Rango Etario
        </h3>
        <ul className="text-base leading-normal font-normal text-[#000F27E5]">
          {rangoEtarioOptions.map((option) => renderOption(option, rangoEtario, setRangoEtario))}
        </ul>
      </div>

      {/* Botones */}
      <div className="flex flex-row items-center justify-between">
        <button
          onClick={handleApplyFilters}
          className="mr-2 mb-12 ml-5.5 inline-flex h-12 w-36 cursor-pointer items-center justify-center rounded-lg bg-[#0655D5] text-base leading-normal font-semibold text-white shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.08)] lg:mr-0"
        >
          Aplicar filtros
        </button>
        <div>
          <button
            onClick={handleClearFilters}
            className="mr-12 mb-12 cursor-pointer text-base leading-7 font-semibold text-[#0655D5] underline"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
