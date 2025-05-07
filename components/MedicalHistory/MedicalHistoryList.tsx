'use client';
import { Note } from '@/types';
import { useState } from 'react';

const notes: Note[] = [
  {
    id: 15,
    date: '20/03/2025',
    title: 'Nota N° 15',
    content:
      'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
  },
  {
    id: 14,
    date: '20/03/2025',
    title: 'Nota N° 14',
    content:
      'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
  },
  {
    id: 13,
    date: '20/03/2025',
    title: 'Nota N° 13',
    content:
      'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
  },
  {
    id: 12,
    date: '20/03/2025',
    title: 'Nota N° 12',
    content:
      'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
  },
  {
    id: 11,
    date: '20/03/2025',
    title: 'Nota N° 11',
    content:
      'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
  },
  {
    id: 10,
    date: '20/03/2025',
    title: 'Nota N° 10',
    content:
      'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
  },
  {
    id: 9,
    date: '20/03/2025',
    title: 'Nota N° 9',
    content:
      'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
  },
  {
    id: 8,
    date: '20/03/2025',
    title: 'Nota N° 8',
    content:
      'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
  },
  {
    id: 7,
    date: '20/03/2025',
    title: 'Nota N° 7',
    content:
      'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
  },
  {
    id: 6,
    date: '20/03/2025',
    title: 'Nota N° 6',
    content:
      'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
  },
  {
    id: 5,
    date: '20/03/2025',
    title: 'Nota N° 5',
    content:
      'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
  },
  {
    id: 4,
    date: '20/03/2025',
    title: 'Nota N° 4',
    content:
      'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
  },
  {
    id: 3,
    date: '20/03/2025',
    title: 'Nota N° 3',
    content:
      'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
  },
  {
    id: 2,
    date: '20/03/2025',
    title: 'Nota N° 2',
    content:
      'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
  },
  {
    id: 1,
    date: '20/03/2025',
    title: 'Nota N° 1',
    content:
      'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Etiam finibus blan dit euismod.',
  },
];

const itemsPerPage = 4;

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

export default function MedicalHistoryList() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(notes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNotes = notes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6">
      {/* Lista de notas */}
      <div className="space-y-4">
        {paginatedNotes.map((note) => (
          <div key={note.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-500">{note.date}</p>
            <h2 className="text-lg font-bold text-gray-800">{note.title}</h2>
            <p className="text-gray-500">{note.content}</p>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 px-15 md:flex-row">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex h-10 w-[94px] items-center justify-center gap-2 rounded-lg border-white pr-1 text-sm leading-tight font-normal text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            ← Anterior
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
                onClick={() => setCurrentPage(Number(page))}
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex h-10 w-[94px] items-center justify-center gap-2 rounded-lg border-white pr-1 text-sm leading-tight font-normal text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>

        {/* Texto de rango */}
        <p className="h-[20px] w-[156px] text-center text-sm leading-tight font-normal text-gray-600">
          Mostrando {startIndex + 1} - {Math.min(startIndex + itemsPerPage, notes.length)} de{' '}
          {notes.length}
        </p>
      </div>
    </div>
  );
}
