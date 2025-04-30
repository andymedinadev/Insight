'use client';
import { useState } from 'react';

export default function FilterButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mr-2 ml-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-md px-3 py-2"
      >
        <span>⌨️</span>
        <span className="text-sm">Filtro</span>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-lg">
          <ul className="py-1 text-sm text-gray-700">
            <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">Ejemplo 1</li>
            <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">Ejemplo 2</li>
          </ul>
        </div>
      )}
    </div>
  );
}
