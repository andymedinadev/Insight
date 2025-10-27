'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Edit, Archive } from '@/public';
import { useState } from 'react';
import { BACKEND_BASE_URL } from '@/config';

type Props = {
  patientId: string;
  isArchived: boolean;
  onClose: () => void;
  showToast: (message: string, type: 'success' | 'error') => void;
  onPatientUpdated: () => void;
};

export default function PatientOptionsMenu({
  patientId,
  isArchived,
  onClose,
  showToast,
  onPatientUpdated,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const archivePatient = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/api/patients/${patientId}/archive`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Error al archivar');
      router.refresh();
      showToast('El paciente fue archivado', 'success');
      onPatientUpdated();
    } catch (error) {
      void error;
      showToast('No se pudo archivar el paciente', 'error');
    } finally {
      setLoading(false);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const unarchivePatient = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/api/patients/${patientId}/unarchive`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Error al desarchivar');
      router.refresh();
      showToast('El paciente fue desarchivado', 'success');
      onPatientUpdated();
    } catch (error) {
      void error;
      showToast('No se pudo archivar el paciente', 'error');
    } finally {
      setLoading(false);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="absolute right-10 z-50 mt-3 w-2xs rounded-md border border-gray-200 bg-white shadow-md lg:right-32">
      <ul className="py-1 text-xl font-normal text-[#000F27E5]">
        <li>
          <button
            className="mt-2.5 mb-6 flex w-full cursor-pointer flex-row text-left hover:bg-gray-100"
            onClick={() => router.push(`/dashboard/patientprofile/${patientId}/edit`)}
            disabled={loading}
          >
            <div>
              <Image
                src={Edit}
                alt="editar"
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
            onClick={isArchived ? unarchivePatient : archivePatient}
            disabled={loading}
          >
            <div>
              <Image
                src={Archive}
                alt={isArchived ? 'desarchivar' : 'archivar'}
                width={22}
                height={22}
                className="mr-5 ml-8 inline-block"
              />
            </div>
            <div>{isArchived ? 'Desarchivar paciente' : 'Archivar paciente'}</div>
          </button>
        </li>
      </ul>
    </div>
  );
}
