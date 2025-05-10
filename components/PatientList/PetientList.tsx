'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchPatients, deletePatient } from '@/store/thunks';
import { selectFilteredPatients } from '@/store/selectors/patientSelectors';
import { flechaAbajoLista, flechaArribaLista, puntosFiltros } from '@/public';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Props {
  variant?: 'home' | 'list';
}

export default function PatientList({ variant = 'home' }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const initialized = useSelector((state: RootState) => state.patients.initialized);
  const patients = useSelector(selectFilteredPatients);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isListVisible, setIsListVisible] = useState(true); // Nuevo estado para manejar la visibilidad

  const avatars = [
    'https://randomuser.me/api/portraits/men/11.jpg',
    'https://randomuser.me/api/portraits/women/21.jpg',
    'https://randomuser.me/api/portraits/men/31.jpg',
    'https://randomuser.me/api/portraits/women/41.jpg',
    'https://randomuser.me/api/portraits/men/51.jpg',
    'https://randomuser.me/api/portraits/women/61.jpg',
    'https://randomuser.me/api/portraits/men/71.jpg',
    'https://randomuser.me/api/portraits/women/81.jpg',
    'https://randomuser.me/api/portraits/men/91.jpg',
    'https://randomuser.me/api/portraits/women/12.jpg',
    'https://randomuser.me/api/portraits/men/22.jpg',
    'https://randomuser.me/api/portraits/women/32.jpg',
    'https://randomuser.me/api/portraits/men/42.jpg',
    'https://randomuser.me/api/portraits/women/52.jpg',
    'https://randomuser.me/api/portraits/men/62.jpg',
    'https://randomuser.me/api/portraits/women/72.jpg',
    'https://randomuser.me/api/portraits/men/82.jpg',
    'https://randomuser.me/api/portraits/women/92.jpg',
    'https://randomuser.me/api/portraits/men/13.jpg',
    'https://randomuser.me/api/portraits/women/23.jpg',
    'https://randomuser.me/api/portraits/men/33.jpg',
    'https://randomuser.me/api/portraits/women/43.jpg',
    'https://randomuser.me/api/portraits/men/53.jpg',
    'https://randomuser.me/api/portraits/women/63.jpg',
    'https://randomuser.me/api/portraits/men/73.jpg',
    'https://randomuser.me/api/portraits/women/83.jpg',
    'https://randomuser.me/api/portraits/men/93.jpg',
    'https://randomuser.me/api/portraits/women/14.jpg',
    'https://randomuser.me/api/portraits/men/24.jpg',
    'https://randomuser.me/api/portraits/women/34.jpg',
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('td')) {
        setOpenMenuId(null);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Al montar, hacemos fetch
  useEffect(() => {
    if (!initialized) {
      dispatch(fetchPatients());
    }
  }, [dispatch, initialized]);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // 1024px es el umbral para Mobile
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [mobileVisibleCount, setMobileVisibleCount] = useState(4);

  const loadMoreMobile = () => {
    setMobileVisibleCount((prev) => prev + 4);
  };

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

  const router = useRouter();
  const handleRedirect = (id: number) => {
    router.push(`/dashboard/patientprofile/${id}`);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-screen text-left text-sm text-gray-600 lg:w-full">
          <thead className="bg-[#F2F6FD] text-base leading-normal font-semibold text-black uppercase">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="hidden px-4 py-3 lg:table-cell">Email</th>
              <th className="px-4 py-3">Últ. sesión</th>
              <th className="hidden px-4 py-3 lg:table-cell">Categoría</th>
              <th className="px-4 py-3">Acción</th>
              <th
                className="cursor-pointer px-4 py-3"
                onClick={() => setIsListVisible(!isListVisible)}
              >
                <Image
                  src={isListVisible ? flechaAbajoLista : flechaArribaLista}
                  alt="puntos de filtro"
                  width={22}
                  height={22}
                />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-base leading-normal font-normal text-black">
            {/* Mostrar pacientes dependiendo de la vista */}
            {isListVisible ? (
              (variant === 'list' && isMobile ? patientsForMobile : patientsForDesktop).map(
                (patient, index) => (
                  <tr key={patient.id} className="relative border-b border-[#CDDDF7]">
                    <td
                      className="px-4 py-3 hover:cursor-pointer"
                      onClick={() => handleRedirect(patient.id)}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <div>
                          <Image
                            src={avatars[index % avatars.length]}
                            alt="avatar"
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full object-cover"
                            unoptimized
                          />
                        </div>
                        <div>{patient.name}</div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 lg:table-cell">{patient.email}</td>
                    <td className="px-4 py-3">{patient.lastSession}</td>
                    <td className="hidden px-4 py-3 lg:table-cell">{patient.category}</td>
                    <td className="relative px-8 py-3">
                      <button
                        onClick={() =>
                          setOpenMenuId((prev) =>
                            prev === String(patient.id) ? null : String(patient.id)
                          )
                        }
                      >
                        <Image src={puntosFiltros} alt="puntos de filtro" width={22} height={22} />
                      </button>

                      {openMenuId === String(patient.id) && (
                        <div className="absolute right-0 z-10 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-md">
                          <ul className="py-1 text-sm text-gray-700">
                            <li>
                              <button
                                onClick={() => handleRedirect(patient.id)}
                                className="w-full px-4 py-2 text-left hover:cursor-pointer hover:bg-gray-100"
                              >
                                Ver detalles
                              </button>
                            </li>
                            <li>
                              <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                                Editar
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                                onClick={() => dispatch(deletePatient(patient.id))}
                              >
                                Eliminar
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td>asdasdasdasdasd</td>
                <td>asdasdasdasdasd</td>
                <td>asdasdasdasdasd</td>
                <td>asdasdasdasdasd</td>
                <td>asdasdasdasdasd</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* **Vista Mobile**: Mostrar botón "Ver más" si estamos en la vista mobile */}
      {variant === 'list' && isMobile && isListVisible && (
        <div className="mt-4 flex justify-center lg:hidden">
          <button onClick={loadMoreMobile} className="text-base font-medium text-black underline">
            Ver más
          </button>
        </div>
      )}

      {/* **Vista Desktop**: Mostrar paginado si estamos en la vista desktop */}
      {variant === 'list' && !isMobile && isListVisible && renderPaginationDesktop()}
    </>
  );
}
