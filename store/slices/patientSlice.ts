import { createSlice } from "@reduxjs/toolkit";
import { patients, Patient } from "@/utils/Data/patients";

interface PatientState {
  list: Patient[];
}

const initialState: PatientState = {
  list: patients,
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    // Más adelante podrías agregar acciones como agregar, editar, etc.
  },
});

export default patientSlice.reducer;
