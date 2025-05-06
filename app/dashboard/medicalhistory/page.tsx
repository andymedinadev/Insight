import { MedicalHistoryHeader, MedicalHistoryList } from '@/components';

export default function MedicalHistory() {
  return (
    <div>
      <div>
        <h1 className="font-heading text-heading1 leading-heading1 font-semibold tracking-[-0.5px]">
          Gestionar notas
        </h1>
      </div>
      <div>
        <MedicalHistoryHeader />

        <MedicalHistoryList />
      </div>
    </div>
  );
}
