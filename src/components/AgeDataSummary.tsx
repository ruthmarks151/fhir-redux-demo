import { useAppSelector } from "../app/hooks";
import {
  selectAllPatients,
  selectAllPatientAges,
  selectPatientsLoadingState,
} from "../features/patients/patientsSlice";

import "./AgeDataSummary.scss";

const AgeDataSummary = () => {
  const allPatients = useAppSelector(selectAllPatients);
  const allAges = useAppSelector(selectAllPatientAges);
  const patientLoadingState = useAppSelector(selectPatientsLoadingState);

  const pediatricPatientCount = allAges.filter((age) => age < 18).length;
  const averageAge =
    allAges.reduce((sumOfAges, age) => sumOfAges + age, 0) / allAges.length;

  return (
    <div className="AgeDataSummary">
      <h2>Data Summary</h2>
      {patientLoadingState === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>In the loaded data there are...</h3>
          <ul>
            <li>
              <CountSummary count={allPatients.length} label="Total Patient"/>
            </li>
            <li>
              <CountSummary count={pediatricPatientCount} label="Pediatric Patient"/>
            </li>
            <li>
              Average Age <strong>{averageAge.toFixed(2)}</strong> (of Patients
              with Known Ages)
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

const CountSummary = ({count, label}: {count: number, label: string}) => <><strong>{count}</strong> {label}{ count === 1 ? '' : 's'}</>

export default AgeDataSummary;
