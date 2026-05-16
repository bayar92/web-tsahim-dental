import { HospitalLandingPage } from "@lib/hospital/ui/HospitalLandingPage";
import { LandingPage } from "@lib/landingpage/ui/LandingPage";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [currentSubDomain, setCurrentSubDomain] = useState("init");

  const getDomain = () => {
    const domain = window.location.hostname;
    const subDomain =
      domain.split(".")[0] != "localhost" && domain.split(".")[0] != "edental"
        ? domain.split(".")[0]
        : "www";

    setCurrentSubDomain(subDomain);
  };

  useEffect(() => {
    getDomain();
  }, []);

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
