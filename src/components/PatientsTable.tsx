import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectAllPatients,
  selectPatientsLoadingState,
  selectPatientsYoungerThan,
  fetchPatientsAsync,
  Patient,
} from "../features/patients/patientsSlice";

import "./PatientsTable.scss";

const PatientsTable = () => {
  const dispatch = useAppDispatch();

  const allPatients = useAppSelector(selectAllPatients);
  const patientsLoadingState = useAppSelector(selectPatientsLoadingState);

  const [onlyPediatric, setOnlyPediatric] = useState(false);
  const togglePediatric = useCallback(() => setOnlyPediatric((op) => !op), []);
  // This whole thing gets a little weird if a user session lasts long enough that patient turns 18
  // This is a proof of concept though, so I'm not going to get stuck on it
  // This definition is also kinda goofy, but I don't want to import a full date library
  const pediatricBirthdayCutoff = new Date(
    new Date().setFullYear(new Date().getFullYear() - 18)
  );

  const pediatricPatients = useAppSelector(
    selectPatientsYoungerThan(pediatricBirthdayCutoff)
  );

  const onLoadButtonClick = useCallback(
    () =>
      dispatch(
        fetchPatientsAsync({
          pageSize: 10,
          page: Math.floor(allPatients.length / 10) + 1,
        })
      ),
    [dispatch, allPatients.length]
  );

  useEffect(() => {
    if (patientsLoadingState === "idle" && !allPatients.length)
      onLoadButtonClick();
  }, [allPatients.length, onLoadButtonClick, patientsLoadingState]);

  return (
    <div className="PatientsTable">
      <h2>Loaded Patients</h2>
      <section className="PatientsTable__filters">
        <h3>Filters</h3>
        <input
          type="checkbox"
          checked={onlyPediatric}
          onChange={togglePediatric}
        />
        <label>Only Show Pediatric Patients?</label>
      </section>
      <div className="PatientsTable__table-container">
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Birthdate</th>
          </tr>
          {(onlyPediatric ? pediatricPatients : allPatients).map(PatientRow)}
        </table>
      </div>
      <button
        disabled={patientsLoadingState === "loading"}
        onClick={onLoadButtonClick}
      >
        {patientsLoadingState === "loading" ? "Loading" : "Load More Patients"}
      </button>
    </div>
  );
};

const PatientRow = (patient: Patient) => {
  /* Goodness the FHIR Name implimentation is rich, I bet there's a really nice `to_user_readable_name()`
       in your library, I've gone for a catch-most approachI don't want to reimpliment it here*/
  let patientName = "No Name";
  const primaryName = patient.name && patient.name[0];

  if (primaryName?.given && primaryName.family)
    patientName = [...primaryName.given, primaryName.family].join(" ");
  else if (primaryName?.text) patientName = primaryName.text;

  return (
    <tr>
      <td>{patient.id}</td>
      <td>{patientName}</td>
      <td>{patient.birthDate ?? "No Birthdate"}</td>
    </tr>
  );
};

export default PatientsTable;
