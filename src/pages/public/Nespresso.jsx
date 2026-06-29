import React, { useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getNespressoPageData } from "../../http";
import NespressoHero from "../../components/Nespresso/NespressoHero";
import NespressoMachines from "../../components/Nespresso/NespressoMachines";
import NespressoCapsules from "../../components/Nespresso/NespressoCapsules";
import NespressoSustainability from "../../components/Nespresso/NespressoSustainability";
import NespressoAccessories from "../../components/Nespresso/Nespressoaccessories";

const NespressoPage = () => {
  const { data: resData } = useQuery({
    queryKey: ["nespresso-page"],
    queryFn: getNespressoPageData,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const pageData = useMemo(() => resData?.data?.data, [resData]);

  // backgroundImage is an array of plain URL strings from the API.
  // Map to { url, alt } objects so normaliseSlides in NespressoHero
  // picks up the url field correctly.
  const heroImages = useMemo(() => {
    const urls = pageData?.heroSection?.backgroundImage;
    if (!urls?.length) return undefined;
    return urls.map((url, i) => ({ url, alt: `Nespresso photo ${i + 1}` }));
  }, [pageData]);

  return (
    <main>
      <div className="mt-40">
        <NespressoHero
          eyebrow={pageData?.heroSection?.eyebrow}
          title={pageData?.heroSection?.title}
          subheading={pageData?.heroSection?.subheading}
          backgroundImages={heroImages}  
        />
      </div>

      <NespressoMachines
        machines={pageData?.machines}
        eyebrow={pageData?.machinesSection?.eyebrow}
        heading={pageData?.machinesSection?.heading}
      />

      <NespressoCapsules
        capsules={pageData?.capsules}
        eyebrow={pageData?.capsulesSection?.eyebrow}
        heading={pageData?.capsulesSection?.heading}
        subheading={pageData?.capsulesSection?.subheading}
      />

      <NespressoAccessories
        accessories={pageData?.accessories}
        eyebrow={pageData?.accessoriesSection?.eyebrow}
        heading={pageData?.accessoriesSection?.heading}
        subheading={pageData?.accessoriesSection?.subheading}
      />

      <NespressoSustainability
        heading={pageData?.sustainabilitySection?.heading}
        subheading={pageData?.sustainabilitySection?.subheading}
        stats={pageData?.sustainabilitySection?.stats}
      />
    </main>
  );
};

export default NespressoPage;