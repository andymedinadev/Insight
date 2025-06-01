export interface CreateMaterialPayload {
  patientId: number;
  materialData: {
    title: string;
    content: string;
    date: string;
  };
}
