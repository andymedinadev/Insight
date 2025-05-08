'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { mockNotes, mockMaterials } from '@/mocks';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPage } from '@/store/selectors/paginationSelectors';
import { setTotalPages } from '@/store/slices/paginationSlice';
import Pagination from '../Pagination/Pagination';

const itemsPerPage = 4;

export default function MedicalHistoryList() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const isMaterial = from === 'material';

  const data = isMaterial ? mockMaterials : mockNotes;
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const total = Math.ceil(data.length / itemsPerPage);
    dispatch(setTotalPages(total));
  }, [data.length, dispatch]);

  return (
    <div className="p-6">
      {/* Lista de notas o materiales */}
      <div className="space-y-4">
        {paginatedData.map((item) => (
          <div key={item.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
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
