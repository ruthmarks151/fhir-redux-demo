import AgeDataSummary from "../../components/AgeDataSummary";
import FhirExplainer from "../../components/FhirExplainer";
import PatientAgePlot from "../../components/PatientAgePlot";
import PatientsTable from "../../components/PatientsTable";

import "./Patients.scss";

// All these components could likely get fleshed out into their own pages with routes and
// everything, but for a little demo like this, I kinda dig the 'All on one page' look
export function Patients() {
  return (
    <div className="Patients">
      <div className="left-pane">
        <FhirExplainer />
        <AgeDataSummary />
        <PatientAgePlot />
      </div>
      <PatientsTable />
    </div>
  );
}
