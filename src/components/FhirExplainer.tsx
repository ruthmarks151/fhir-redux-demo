import "./FhirExplainer.scss";

const FhirExplainer = () => {
  return (
    <div className="FhirExplainer">
      <h3>What is FHIR?</h3>
      <article>
        FHIR is a standard for health care data exchange, published by HL7. It
        makes very pleasantly structured healthcare data available from many
        systems.
      </article>
      <h3>What is this demo?</h3>
      <article>
        This demo uses the
        <a href="http://hapi.fhir.org/resource?encoding=null&pretty=false&resource=Patient">
          {" UHN HAPI FHIR  "}
        </a>
        (University Health Network) (HL7 application programming interface)
        (Fast Healthcare Interoperability Resources) server to fetch patients,
        and perfom some simple birthdate and age related analsis on them. Use
        the table view to view all the loaded data and load more
      </article>
    </div>
  );
};

export default FhirExplainer;
