'use client';
import { useDispatch } from 'react-redux';
import {
  setFilterModalidad,
  setFilterGenero,
  setFilterRangoEtario,
} from '@/store/actions/patientActions';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function PatientFilterDropdown() {
  const dispatch = useDispatch();
  const modalidad = useSelector((state: RootState) => state.patients.filters.modalidad);
  const genero = useSelector((state: RootState) => state.patients.filters.genero);
  const rangoEtario = useSelector((state: RootState) => state.patients.filters.rangoEtario);
  // Opciones de los filtros
  const modalidadOptions = ['Presencial', 'Online', 'Híbrido'];
  const generoOptions = ['Femenino', 'Masculino', 'Otro'];
  const rangoEtarioOptions = ['0-12 años', '13-17 años', 'Más de 18 años'];

  // Lógica para manejar los clics y despachar acciones
  const handleModalidadClick = (value: string) => {
    const newModalidad = modalidad.includes(value)
      ? modalidad.filter((item) => item !== value)
      : [...modalidad, value];

    dispatch(setFilterModalidad(newModalidad)); // Aplica filtro de modalidad
  };

  const handleGeneroClick = (value: string) => {
    const newGenero = genero.includes(value)
      ? genero.filter((item) => item !== value)
      : [...genero, value];
    dispatch(setFilterGenero(newGenero));
  };

  const handleRangoEtarioClick = (value: string) => {
    const newRango = rangoEtario.includes(value)
      ? rangoEtario.filter((item) => item !== value)
      : [...rangoEtario, value];
    dispatch(setFilterRangoEtario(newRango));
  };

  const handleClearFilters = () => {
    console.log('[Limpiar Filtros]');
    dispatch(setFilterModalidad([]));
    dispatch(setFilterGenero([]));
    dispatch(setFilterRangoEtario([]));
  };

  return (
    <div className="py-1 text-sm text-gray-700">
      {/* Modalidad */}
      <div className="mb-2">
        <h3 className="font-semibold">Modalidad</h3>
        <ul>
          {modalidadOptions.map((option) => (
            <li
              key={option}
              onClick={() => handleModalidadClick(option)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      {/* Género */}
      <div className="mb-2">
        <h3 className="font-semibold">Sexo</h3>
        <ul>
          {generoOptions.map((option) => (
            <li
              key={option}
              onClick={() => handleGeneroClick(option)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      {/* Rango Etario */}
      <div className="mb-2">
        <h3 className="font-semibold">Rango Etario</h3>
        <ul>
          {rangoEtarioOptions.map((option) => (
            <li
              key={option}
              onClick={() => handleRangoEtarioClick(option)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      {/* Depuración */}
      <div className="mt-4 rounded bg-gray-100 p-2 text-sm">
        <h4 className="mb-1 font-semibold">🧪 Filtros activos:</h4>
        <p>
          <strong>Modalidad:</strong> {modalidad.join(', ') || '—'}
        </p>
        <p>
          <strong>Género:</strong> {genero.join(', ') || '—'}
        </p>
        <p>
          <strong>Rango Etario:</strong> {rangoEtario.join(', ') || '—'}
        </p>
      </div>

      {/* Limpiar filtros */}
      <div className="mt-4">
        <button onClick={handleClearFilters} className="text-red-500 hover:text-red-700">
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
