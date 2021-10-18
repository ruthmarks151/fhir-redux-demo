import { Bar } from "react-chartjs-2";
import { useAppSelector } from "../app/hooks";
import { selectAllPatientAges } from "../features/patients/patientsSlice";

import "./PatientAgePlot.scss";

const PatientAgePlot = () => {
  const allAges = useAppSelector(selectAllPatientAges);

  const agePlotStep = 10;
  const ageBuckets = Array(10).fill(0);

  allAges.forEach((age) => {
    ageBuckets[Math.floor(age / agePlotStep)] += 1;
  });

  return (
    <div className="PatientAgePlot">
      <h2>Loaded Patient Ages</h2>
      <div className="PatientAgePlot__chart">
        <Bar
          options={{ responsive: true, maintainAspectRatio: false }}
          data={{
            labels: ageBuckets.map(
              (_, i) => `${i * agePlotStep} - ${(i + 1) * agePlotStep - 1}`
            ),
            datasets: [
              {
                label: "Patient Count",
                data: ageBuckets,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default PatientAgePlot;
