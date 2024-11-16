import { HospitalLandingPage } from "@lib/hospital/ui/HospitalLandingPage";
import { LandingPage } from "@lib/landingpage/ui/LandingPage";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [currentSubDomain, setCurrentSubDomain] = useState("www");
  //get current user requested domain and subdomain

  //domain example https://evada.edental.mn
  const getDomain = () => {
    const domain = window.location.hostname;
    const url = window.location.href;

    const subDomain =
      domain.split(".")[0] != "localhost" && domain.split(".")[0] != "edental"
        ? domain.split(".")[0]
        : "www";

    setCurrentSubDomain(subDomain);
    //setCurrentSubDomain("evada");
    return "";
  };
  useEffect(() => {
    getDomain();
  }, []);

  useEffect(() => {}, [currentSubDomain]);
  return (
    <>
      {currentSubDomain == "www" && <LandingPage />}
      {currentSubDomain != "www" && currentSubDomain != "init" && (
        <HospitalLandingPage hospitalDomain={currentSubDomain} />
      )}
    </>
  );
};

export default HomePage;
