import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPage, selectTotalPages } from '@/store/selectors/paginationSelectors';
import { setCurrentPage } from '@/store/slices/paginationSlice';
import Image from 'next/image';
import Left from '../../public/icons/Left.svg';
import Right from '../../public/icons/Right.svg';
import PaginationProps from '@/types/paginationProps';

function getPaginationRange(current: number, total: number): (number | string)[] {
  const delta = 1; // páginas adyacentes a mostrar
  const range: (number | string)[] = [];

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    } else if (range[range.length - 1] !== '...') {
      range.push('...');
    }
  }

  return range;
}

export default function Pagination({ itemsPerPage, totalItems }: PaginationProps) {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 px-15 md:flex-row">
      <div className="flex items-center space-x-1">
        <button
          onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))}
          disabled={currentPage === 1}
          className="flex h-10 w-[94px] items-center justify-center gap-2 rounded-lg border-white pr-1 text-sm leading-tight font-normal text-gray-600 hover:bg-gray-100 disabled:opacity-50"
        >
          <Image src={Left} alt="Anterior" width={18} height={18} /> Anterior
        </button>

        {getPaginationRange(currentPage, totalPages).map((page, idx) =>
          page === '...' ? (
            <span
              key={idx}
              className="flex h-10 w-10 items-center justify-center text-sm text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => dispatch(setCurrentPage(Number(page)))}
              className={`h-10 w-10 rounded-lg border px-[10px] py-[11px] text-center text-sm leading-tight font-normal ${
                currentPage === page
                  ? 'border-blue-600 text-blue-600'
                  : 'border-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))}
          disabled={currentPage === totalPages}
          className="flex h-10 w-[94px] items-center justify-center gap-2 rounded-lg border-white pr-1 text-sm leading-tight font-normal text-gray-600 hover:bg-gray-100 disabled:opacity-50"
        >
          Siguiente <Image src={Right} alt="Siguiente" width={18} height={18} />
        </button>
      </div>

      {/* Texto de rango */}
      <p className="h-[20px] w-[156px] text-center text-sm leading-tight font-normal text-gray-600">
        Mostrando {startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)} de{' '}
        {totalItems}
      </p>
    </div>
  );
}
