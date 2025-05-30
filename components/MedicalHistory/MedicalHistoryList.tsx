'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPage } from '@/store/selectors/paginationSelectors';
import { setTotalPages } from '@/store/slices/paginationSlice';
// import { useNewPatientById } from '@/hooks';
import { Note } from '@/types';
// import { selectSearchTerm } from '@/store/selectors/patientSelectors';
import { RootState } from '@/store';
import { isSameWeek, subWeeks, isSameMonth, parseISO } from 'date-fns';
import Pagination from '../Pagination/Pagination';
import Empty from '../MedicalHistory/Empty';

const itemsPerPage = 5;

interface Props {
  onSelectedNote: (note: Note) => void;
}

export default function MedicalHistoryList({ onSelectedNote }: Props) {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const isMaterial = searchParams.get('from') === 'material';

  // const { patient } = useNewPatientById();
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  // const searchTerm = useSelector(selectSearchTerm);
  const searchTerm = 'DELETE';

  // const patientData = isMaterial ? patient?.materials : patient?.notes;
  // const data = patientData ?? [];
  const data: Note[] = [];

  const currentDate = useSelector((state: RootState) => state.backendPatients.filters.creationDate);
  const selectedDate = Array.isArray(currentDate) ? currentDate[0] : currentDate;
  console.log(currentDate);

  const filterByDate = (dateString: string) => {
    if (!dateString) return false;

    const date = parseISO(dateString);
    const now = new Date();

    switch (selectedDate) {
      case 'Esta semana':
        return isSameWeek(date, now, { weekStartsOn: 1 });
      case 'Última semana':
        const lastWeek = subWeeks(now, 1);
        return isSameWeek(date, lastWeek, { weekStartsOn: 1 });
      case 'Este mes':
        return isSameMonth(date, now);
      default:
        return true;
    }
  };

  const filteredData = data.filter((item: Note) => {
    const lowerSearch = searchTerm.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(lowerSearch) ||
      item.content.toLowerCase().includes(lowerSearch);

    const matchesDate = filterByDate(item.date);

    return matchesSearch && matchesDate;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const total = Math.ceil(filteredData.length / itemsPerPage);
    dispatch(setTotalPages(total));
  }, [filteredData.length, dispatch]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (data.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Empty type={isMaterial ? 'material' : 'nota'} />
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
        {paginatedData.map((item: Note) => (
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
