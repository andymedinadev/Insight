'use client';

import { useAppDispatch, useBackendPatientById } from '@/hooks';
import { PatientProfileHeader, PatientProfileInfo, PatientProfileLorem } from '@/components';
import { useEffect } from 'react';
import { clearSelectedPatient } from '@/store/slices/backendPatientsSlice';

export default function PatientProfile() {
  const dispatch = useAppDispatch();

  const { patient, loading } = useBackendPatientById();

  // Limpiar paciente seleccionado al navegar
  useEffect(() => {
    return () => {
      dispatch(clearSelectedPatient());
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <style jsx>{`
          .spinner {
            width: 100px;
            height: 100px;
            border: 5px solid #59616f;
            border-top: 5px solid #0655d5;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: auto;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
          .loader-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 90vh;
          }
        `}</style>
      </div>
    );
  }

  if (!patient)
    return (
      <div className="mt-20 text-center">
        <p className="text-3xl">No se encontró el paciente.</p>
      </div>
    );

  return (
    <div>
      <PatientProfileHeader patient={patient} />

      <PatientProfileInfo patient={patient} />

      <PatientProfileLorem patient={patient} />
    </div>
  );
}
