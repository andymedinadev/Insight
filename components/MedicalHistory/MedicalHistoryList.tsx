'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPage } from '@/store/selectors/paginationSelectors';
import { setTotalPages } from '@/store/slices/paginationSlice';
import Pagination from '../Pagination/Pagination';

import { usePatientById } from '@/hooks';

const itemsPerPage = 5;

export default function MedicalHistoryList() {
  const searchParams = useSearchParams();
  const isMaterial = searchParams.get('from') === 'material';

  const { patient } = usePatientById();
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);

  const fallbackItem = [
    {
      id: 1,
      date: '20/03/2025',
      title: `${isMaterial ? 'Material' : 'Nota'} N° 1`,
      content:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
    },
  ];

  const patientData = isMaterial ? patient?.materials : patient?.notes;
  const data = patientData ?? fallbackItem;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const total = Math.ceil(data.length / itemsPerPage);
    dispatch(setTotalPages(total));
  }, [data.length, dispatch]);

  return (
    <div className="p-10">
      {/* Lista de notas o materiales */}
      <div className="space-y-4">
        {paginatedData.map((item) => (
          <div key={item.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-gray-500">{item.date}</p>
            <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
            <p className="text-gray-500">{item.content}</p>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <Pagination itemsPerPage={itemsPerPage} totalItems={data.length} />
    </div>
  );
}
