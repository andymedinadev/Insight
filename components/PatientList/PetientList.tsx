'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function PatientList() {
  const patients = useSelector((state: RootState) => state.patients.list);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-screen text-left text-sm text-gray-600 lg:w-full">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="hidden px-4 py-3 lg:table-cell">Email</th>
            <th className="px-4 py-3">Últ. sesión</th>
            <th className="hidden px-4 py-3 lg:table-cell">Categoría</th>
            <th className="px-4 py-3">Acción</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {patients.slice(0, 4).map((patient) => (
            <tr key={patient.id} className="relative border-b">
              <td className="px-4 py-3">{patient.name}</td>
              <td className="hidden px-4 py-3 lg:table-cell">{patient.email}</td>
              <td className="px-4 py-3">{patient.lastSession}</td>
              <td className="hidden px-4 py-3 lg:table-cell">{patient.category}</td>
              <td className="px-4 py-3">
                <button onClick={() => toggleMenu(patient.id)} className="text-xl">
                  ...
                </button>
                {openMenuId === patient.id && (
                  <div className="absolute right-4 z-10 mt-2 w-32 rounded border border-gray-200 bg-white shadow-md">
                    <ul className="text-sm text-gray-700">
                      <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">Editar</li>
                      <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">Eliminar</li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
