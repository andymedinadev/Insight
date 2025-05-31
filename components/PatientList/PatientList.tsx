'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchPatients } from '@/store/thunks';
import { flechaAbajoLista, flechaArribaLista, puntosFiltros } from '@/public';
import { usePathname } from 'next/navigation';
import Left from '../../public/icons/Left.svg';
import Right from '../../public/icons/Right.svg';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PatientOptionsMenu from './PatientListArchived/PatientOptionsMenu';
import Toast from './Toast';

interface Props {
  variant?: 'home' | 'list';
}

export default function PatientList({ variant = 'home' }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const router = useRouter();

  // Estados y selectors
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isListVisible, setIsListVisible] = useState(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(4);
  const [desktopPage, setDesktopPage] = useState(1);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const patients = useSelector((state: RootState) => state.backendPatients.patients) || [];
  const loading = useSelector(
    (state: RootState) => state.backendPatients.status.fetchPatients.loading
  );
  const error = useSelector((state: RootState) => state.backendPatients.status.fetchPatients.error);
  const searchTerm = useSelector((state: RootState) =>
    state.backendPatients.searchTerm.toLowerCase()
  );
  const modalidadFilter = useSelector(
    (state: RootState) => state.backendPatients.filters.modalidad
  );
  const generoFilter = useSelector((state: RootState) => state.backendPatients.filters.genero);
  const rangoEtarioFilter = useSelector(
    (state: RootState) => state.backendPatients.filters.rangoEtario
  );
  const isDashboardHome = pathname === '/dashboard/home';
  const filteredPatients = patients.filter((patient) => {
    const matchesName = patient.name.toLowerCase().includes(searchTerm);

    const matchesModalidad =
      modalidadFilter.length === 0 ||
      (patient.modality != null && modalidadFilter.includes(patient.modality));

    const matchesGenero = generoFilter.length === 0 || generoFilter.includes(patient.sex);

    const matchesRangoEtario =
      rangoEtarioFilter.length === 0 || rangoEtarioFilter.includes(patient.rangoEtario);

    return matchesName && matchesModalidad && matchesGenero && matchesRangoEtario;
  });

  const avatars = [
    'https://res.cloudinary.com/dwc1rj9tj/image/upload/v1747278017/AvatarGeneral_hq0avb.svg',
  ];

  const closeMenuAndResetList = () => {
    setOpenMenuId(null);
  };
  const handlePatientUpdated = () => {
    dispatch(fetchPatients());
  };

  // useEffects

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

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 1024);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadMoreMobile = () => {
    setMobileVisibleCount((prev) => prev + 4);
  };

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

    if (loading) return <div>Cargando pacientes...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="mt-4 hidden items-center justify-center lg:flex">
        <div className="flex w-full flex-row items-center justify-between space-x-1">
          <div className="mb-6 ml-24 flex flex-row gap-x-5">
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
        <div className="mt-[-1.5rem] mr-24">
          <p className="h-[20px] w-[156px] text-center text-sm leading-tight font-normal text-gray-600">
            Mostrando {startIndex + 1} - {Math.min(startIndex + 8, filteredPatients.length)} de{' '}
            {filteredPatients.length}
            {patients.length}
          </p>
        </div>
      </div>
    );
  };

  const desktopTotalPages = Math.ceil(filteredPatients.length / 8);

  const patientsForMobile = filteredPatients.slice(0, mobileVisibleCount);
  const patientsForDesktop = filteredPatients.slice((desktopPage - 1) * 8, desktopPage * 8);

  const handleRedirect = (id: number) => {
    router.push(`/dashboard/patientprofile/${id}`);
  };

  if (loading) return <div>Cargando pacientes...</div>;
  if (error) return <div>Error al cargar pacientes: {error}</div>;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-screen text-left text-sm text-gray-600 lg:w-full">
          <thead className="bg-[#F2F6FD] text-base leading-normal font-semibold text-black">
            <tr>
              <th className="px-4 py-3">Nombre del paciente</th>
              <th className="hidden px-4 py-3 lg:table-cell">Email</th>

              <th className="hidden px-4 py-3 lg:table-cell">Categoría</th>
              <th className="px-4 py-3">Acciones</th>
              {!isDashboardHome && (
                <th className="px-4 py-3" onClick={() => setIsListVisible(!isListVisible)}>
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
                    <td className="hidden px-4 py-3 lg:table-cell">
                      {patient.rangoEtario.replace('�', 'ñ')}
                    </td>
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
                        <div className="relative overflow-visible">
                          <PatientOptionsMenu
                            patientId={String(patient.id)}
                            isArchived={false}
                            onClose={closeMenuAndResetList}
                            showToast={(message, type) => {
                              setToastMessage(message);
                              setToastType(type);
                            }}
                            onPatientUpdated={handlePatientUpdated}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr className="bg-white text-base leading-normal font-normal text-white">
                <td className="px-4 py-3">
                  <div className="flex flex-row items-center gap-2">
                    <div>IM</div>
                    <div>Juan</div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 lg:table-cell">juan.paredes@example.com</td>
                <td className="px-4 py-3">04/01/2025</td>

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
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      )}
    </>
  );
}
