import axios from "axios";

import { Patient } from "./patientsSlice";

export interface FetchPatientResponseShape {
  entry: {
    resource: Patient;
  }[];
}

export function fetchPatients(page: number = 1, pageSize: number = 10) {
  const requestURL = new URL("https://hapi.fhir.org/baseR4/Patient");
  requestURL.searchParams.set("_pretty", "false");
  requestURL.searchParams.set("_count", String(pageSize));
  requestURL.searchParams.set("_offset", String((page - 1) * pageSize));
  requestURL.searchParams.set("_include", "Patient:link");
  // Most of the patients on the demo server don't have birthdays,
  // to keep this demo interesting, query by birthday to filter them out
  // My patient interface still allows for this to be absent,
  // so comment out this line if you like.
  requestURL.searchParams.set("birthdate", "gt1900-01-01");
  requestURL.searchParams.set("birthdate", "lt2021-10-17");
  return axios.get<FetchPatientResponseShape>(requestURL.toString());
}
