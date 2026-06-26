import React from "react";
import NespressoHero from "../../components/Nespresso/NespressoHero";
import NespressoMachines from "../../components/Nespresso/NespressoMachines";
import NespressoCapsules from "../../components/Nespresso/NespressoCapsules";
import NespressoSustainability from "../../components/Nespresso/NespressoSustainability";
import NespressoClub from "../../components/Nespresso/NespressoClub";
import NespressoNewsletter from "../../components/Nespresso/NespressoNewsletter";
import NespressoAccessories from "../../components/Nespresso/Nespressoaccessories";

const NespressoPage = () => {
  return (
    <main>
        <div className="mt-40 bg-amber-600">
      <NespressoHero />
        </div>
      <NespressoMachines />
      <NespressoCapsules />
       <NespressoAccessories />
      <NespressoSustainability />
      {/* <NespressoClub /> */}
      {/* <NespressoNewsletter /> */}
    </main>
  );
};

export default NespressoPage;