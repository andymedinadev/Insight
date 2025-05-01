'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Props {
  variant?: 'home' | 'list';
}

export default function PatientList({ variant = 'home' }: Props) {
  const patients = useSelector((state: RootState) => state.patients.list);

  // Estado para detectar el tamaño de la ventana y definir si es Desktop o Mobile
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Establecemos los estados solo después de que se haya montado el componente en el cliente
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // 1024px es el umbral para Mobile
    };

    // Establecemos el tamaño inicial al montar
    handleResize();

    // Añadimos un event listener para ajustar cuando el tamaño cambie
    window.addEventListener('resize', handleResize);

    // Limpiamos el event listener al desmontar
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // **Mobile**: Estados para manejar "Ver más"
  const [mobileVisibleCount, setMobileVisibleCount] = useState(4);

  const loadMoreMobile = () => {
    setMobileVisibleCount((prev) => prev + 4); // Aumentamos la cantidad de pacientes en 4
  };

  // **Desktop**: Paginación independiente
  const [desktopPage, setDesktopPage] = useState(1);
  const desktopTotalPages = Math.ceil(patients.length / 8);

  const changePageDesktop = (pageNum: number) => {
    setDesktopPage(pageNum);
  };

  const renderPaginationDesktop = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, desktopPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > desktopTotalPages) {
      end = desktopTotalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => changePageDesktop(i)}
          className={`mx-1 rounded px-2 py-1 text-sm font-medium ${
            i === desktopPage ? 'bg-black text-white' : 'text-black underline'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="mt-4 hidden items-center justify-center lg:flex">
        <button
          onClick={() => desktopPage > 1 && changePageDesktop(desktopPage - 1)}
          disabled={desktopPage === 1}
          className="mx-2 text-sm font-medium text-black disabled:text-gray-400"
        >
          ← Anterior
        </button>

        {start > 1 && (
          <>
            <button
              onClick={() => changePageDesktop(1)}
              className="mx-1 text-sm font-medium text-black underline"
            >
              1
            </button>
            {start > 2 && <span className="mx-1 text-sm">...</span>}
          </>
        )}

        {pages}

        {end < desktopTotalPages && (
          <>
            {end < desktopTotalPages - 1 && <span className="mx-1 text-sm">...</span>}
            <button
              onClick={() => changePageDesktop(desktopTotalPages)}
              className="mx-1 text-sm font-medium text-black underline"
            >
              {desktopTotalPages}
            </button>
          </>
        )}

        <button
          onClick={() => desktopPage < desktopTotalPages && changePageDesktop(desktopPage + 1)}
          disabled={desktopPage === desktopTotalPages}
          className="mx-2 text-sm font-medium text-black disabled:text-gray-400"
        >
          Siguiente →
        </button>
      </div>
    );
  };

  // **Generamos los pacientes visibles para mobile y desktop**
  const patientsForMobile = patients.slice(0, mobileVisibleCount);
  const patientsForDesktop = patients.slice((desktopPage - 1) * 8, desktopPage * 8);

  return (
    <>
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
            {/* Mostrar pacientes dependiendo de la vista */}
            {(variant === 'list' && isMobile ? patientsForMobile : patientsForDesktop).map(
              (patient) => (
                <tr key={patient.id} className="relative border-b">
                  <td className="px-4 py-3">{patient.name}</td>
                  <td className="hidden px-4 py-3 lg:table-cell">{patient.email}</td>
                  <td className="px-4 py-3">{patient.lastSession}</td>
                  <td className="hidden px-4 py-3 lg:table-cell">{patient.category}</td>
                  <td className="px-4 py-3">
                    <button className="text-xl">...</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* **Vista Mobile**: Mostrar botón "Ver más" si estamos en la vista mobile */}
      {variant === 'list' && isMobile && (
        <div className="mt-4 flex justify-center lg:hidden">
          <button onClick={loadMoreMobile} className="text-base font-medium text-black underline">
            Ver más
          </button>
        </div>
      )}

      {/* **Vista Desktop**: Mostrar paginado si estamos en la vista desktop */}
      {variant === 'list' && !isMobile && renderPaginationDesktop()}
    </>
  );
}
