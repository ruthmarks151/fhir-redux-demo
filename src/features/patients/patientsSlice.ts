import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchPatients } from "./patientsAPI";

// Define a tiny subset of the patient model.
// In a production setting I'd certainly be using https://www.npmjs.com/package/@types/fhir
// Or another FHIR wrapper, but for this assignment I'm just going to use a slice
export interface Patient {
  id: string;
  name:
    | (
        | {
            family: string;
            given: string[];
            text?: string;
          }
        | {
            family: never;
            given: never;
            text: string;
          }
        | { family: never; given: never; text: never }
      )[]
    | undefined;
  birthDate?: string;
}

export interface PatientsState {
  status: "idle" | "loading" | "failed";
  patients: {
    [id in string]: Patient;
  };
}

const initialState: PatientsState = {
  patients: {},
  status: "idle",
};

export const fetchPatientsAsync = createAsyncThunk(
  "patients/fetchPatients",
  async ({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) => {
    const response = await fetchPatients(page, pageSize);
    return response.data;
  }
);

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatientsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        action.payload.entry.forEach(
          (patient) => (state.patients[patient.resource.id] = patient.resource)
        );
      })
      .addCase(fetchPatientsAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectPatientById = (
  state: RootState,
  id: string
): Patient | undefined => state.patients.patients[id];
export const selectAllPatients = createSelector(
  (state: RootState) => state.patients.patients,
  Object.values as (patients: any) => Patient[]
);

const age = ({ birthDate }: Patient & { birthDate: string }): number => {
  // birthday is a date
  var ageDifMs = Date.now() - Date.parse(birthDate);
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const selectAllPatientAges = createSelector(
  selectAllPatients,
  (patients: Patient[]) =>
    patients
      .filter(
        (patient): patient is Patient & { birthDate: string } =>
          !!patient.birthDate
      )
      .map(age)
);

export const selectPatientsYoungerThan = (firstBirthday: Date) =>
  createSelector(selectAllPatients, (patients: Patient[]) =>
    patients.filter(
      ({ birthDate }) => birthDate && new Date(birthDate) > firstBirthday
    )
  );

export const selectPatientsLoadingState = (state: RootState) =>
  state.patients.status;

export default patientsSlice.reducer;
