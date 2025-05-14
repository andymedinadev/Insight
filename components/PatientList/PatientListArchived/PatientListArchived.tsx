'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchPatients } from '@/store/thunks';
// import { selectFilteredPatients } from '@/store/selectors/patientSelectors';
import { flechaAbajoLista, flechaArribaLista, puntosFiltros, Archive, Edit } from '@/public';
import { usePathname } from 'next/navigation';
import { newSelectFilteredPatients } from '@/store/selectors/patientSelectors';
import Left from '../../../public/icons/Left.svg';
import Right from '../../../public/icons/Right.svg';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toggleFiled } from '@/store/actions/patientActions';

interface Props {
  variant?: 'home' | 'list';
}

export default function PatientListArchived({ variant = 'home' }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const initialized = useSelector((state: RootState) => state.patients.initialized);
  // const patients = useSelector(selectFilteredPatients);
  const patients = useSelector(newSelectFilteredPatients);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isListVisible, setIsListVisible] = useState(true); // Nuevo estado para manejar la visibilidad

  const pathname = usePathname();
  const isDashboardHome = pathname === '/dashboard/home';

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

  // **Generamos los pacientes visibles para mobile y desktop**
  const filteredPatients = patients.filter((p) => p.filed === true);

  const [desktopPage, setDesktopPage] = useState(1);
  const desktopTotalPages = Math.ceil(filteredPatients.length / 8);

  const patientsForMobile = filteredPatients.slice(0, mobileVisibleCount);
  const patientsForDesktop = filteredPatients.slice((desktopPage - 1) * 8, desktopPage * 8);

  function getPaginationRange(current: number, total: number): (number | string)[] {
    const delta = 1;
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

  const renderPaginationDesktop = () => {
    const range = getPaginationRange(desktopPage, desktopTotalPages);
    const startIndex = (desktopPage - 1) * 8;

    return (
      <div className="mt-4 hidden items-center justify-center lg:flex">
        <div className="flex w-full flex-row items-center justify-between space-x-1">
          <div className="ml-24 flex flex-row gap-x-5">
            <button
              onClick={() => setDesktopPage(Math.max(desktopPage - 1, 1))}
              disabled={desktopPage === 1}
              className="flex h-10 w-[94px] items-center justify-center gap-2 rounded-lg border-white pr-1 text-sm leading-tight font-normal text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              <Image src={Left} alt="Anterior" width={18} height={18} /> Anterior
            </button>

            {range.map((page, idx) =>
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
                  onClick={() => setDesktopPage(Number(page))}
                  className={`h-10 w-10 rounded-lg border px-[10px] py-[11px] text-center text-sm leading-tight font-normal ${
                    desktopPage === page
                      ? 'border-blue-600 text-blue-600'
                      : 'border-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => setDesktopPage(Math.min(desktopPage + 1, desktopTotalPages))}
              disabled={desktopPage === desktopTotalPages}
              className="flex h-10 w-[94px] items-center justify-center gap-2 rounded-lg border-white pr-1 text-sm leading-tight font-normal text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              Siguiente <Image src={Right} alt="Siguiente" width={18} height={18} />
            </button>
          </div>
        </div>
        <div className="mr-24">
          <p className="h-[20px] w-[156px] text-center text-sm leading-tight font-normal text-gray-600">
            Mostrando {startIndex + 1} - {Math.min(startIndex + 8, filteredPatients.length)} de{' '}
            {filteredPatients.length}
          </p>
        </div>
      </div>
    );
  };

  const router = useRouter();
  const handleRedirect = (id: number) => {
    router.push(`/dashboard/patientprofile/${id}`);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-screen text-left text-sm text-gray-600 lg:w-full">
          <thead className="bg-[#F2F6FD] text-base leading-normal font-semibold text-black">
            <tr>
              <th className="px-4 py-3">Nombre del paciente</th>
              <th className="hidden px-4 py-3 lg:table-cell">Email</th>
              <th className="px-4 py-3">Fecha ultima sesión</th>
              <th className="hidden px-4 py-3 lg:table-cell">Categoría</th>
              <th className="px-4 py-3">Acciones</th>
              {!isDashboardHome && (
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
              )}
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
                    {/* <td className="hidden px-4 py-3 lg:table-cell">{patient.category}</td> */}
                    <td className="hidden px-4 py-3 lg:table-cell">{patient.rangoEtario}</td>
                    <td className="relative px-5 py-3">
                      <button
                        className="cursor-pointer"
                        onClick={() =>
                          setOpenMenuId((prev) =>
                            prev === String(patient.id) ? null : String(patient.id)
                          )
                        }
                      >
                        <Image src={puntosFiltros} alt="puntos de filtro" width={22} height={22} />
                      </button>

                      {openMenuId === String(patient.id) && (
                        <div className="absolute right-10 z-10 mt-3 w-2xs rounded-md border border-gray-200 bg-white shadow-md lg:right-32">
                          <ul className="py-1 text-xl font-normal text-[#000F27E5]">
                            <li>
                              <button
                                onClick={() =>
                                  router.push(`/dashboard/patientprofile/${patient.id}/edit`)
                                }
                                className="mt-2.5 mb-6 flex w-full cursor-pointer flex-row text-left hover:bg-gray-100"
                              >
                                <div>
                                  <Image
                                    src={Edit}
                                    alt="archivar"
                                    width={22}
                                    height={22}
                                    className="mr-5 ml-8 inline-block"
                                  />
                                </div>
                                <div>Editar paciente</div>
                              </button>
                            </li>
                            <li>
                              <button
                                className="mt-2.5 mb-2.5 flex w-full cursor-pointer flex-row text-left hover:bg-gray-100"
                                onClick={() => dispatch(toggleFiled(patient.id))}
                              >
                                <div>
                                  <Image
                                    src={Archive}
                                    alt="archivar"
                                    width={22}
                                    height={22}
                                    className="mr-5 ml-8 inline-block"
                                  />
                                </div>
                                <div>Archivar paciente</div>
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
              <tr className="bg-white text-base leading-normal font-normal text-white">
                <td className="px-4 py-3 hover:cursor-pointer">
                  <div className="flex flex-row items-center gap-2">
                    <div>IM</div>
                    <div>Juan</div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 lg:table-cell">juan.paredes@example.com</td>
                <td className="px-4 py-3">04/01/2025</td>
                {/* <td className="hidden px-4 py-3 lg:table-cell">{patient.category}</td> */}
                <td className="hidden px-4 py-3 lg:table-cell">Adulto</td>
                <td className="relative px-5 py-3">
                  <button>. . . . .</button>
                </td>
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
