'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPage } from '@/store/selectors/paginationSelectors';
import { setTotalPages } from '@/store/slices/paginationSlice';
import { useNewPatientById } from '@/hooks';
import { Note } from '@/types';
import { selectSearchTerm } from '@/store/selectors/patientSelectors';
import Pagination from '../Pagination/Pagination';

const itemsPerPage = 5;

interface Props {
  onSelectedNote: (note: Note) => void;
}

export default function MedicalHistoryList({ onSelectedNote }: Props) {
  const searchParams = useSearchParams();
  const isMaterial = searchParams.get('from') === 'material';

  const { patient } = useNewPatientById();
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const searchTerm = useSelector(selectSearchTerm);

  const patientData = isMaterial ? patient?.materials : patient?.notes;
  const data = patientData ?? [];

  const filteredData = data.filter((item) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(lowerSearch) ||
      item.content.toLowerCase().includes(lowerSearch)
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const total = Math.ceil(filteredData.length / itemsPerPage);
    dispatch(setTotalPages(total));
  }, [filteredData.length, dispatch]);

  if (data.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg text-gray-500">{isMaterial ? 'Sin materiales' : 'Sin notas'}</p>
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg text-gray-500">No hay resultados</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-6 md:px-10">
      {/* Lista de notas o materiales */}
      <div className="cursor-pointer space-y-4">
        {paginatedData.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectedNote(item)}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-semibold text-gray-500">{item.date}</p>
            <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
            <p className="text-gray-500">{item.content}</p>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <Pagination itemsPerPage={itemsPerPage} totalItems={filteredData.length} />
    </div>
  );
}
