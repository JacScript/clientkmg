import React, { useMemo } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getKiswahiliPageData } from '../../http'
import HeroKiswahili from '../../components/linguistics/HeroKiswahili'
import FeaturesSection from '../../components/linguistics/FeatureSection'
import LanguageHeroSection from '../../components/linguistics/LanguageSection'
import Learning from '../../components/linguistics/Learning'
import Contact from '../../components/contact/Contact'
import useTitle from '../../components/useTitle'

const Linguistics = () => {
  useTitle('Kiswahili')

  const { data: resData } = useQuery({
    queryKey: ['kiswahili-page'],
    queryFn: getKiswahiliPageData,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // console.log(resData)
  const pageData = useMemo(() => resData?.data?.data, [resData]);

  // heroSection.backgroundImage comes back as an array of plain URL strings,
  // but HeroKiswahili's `images` prop expects { url, alt } objects (it reads
  // image.url for the <img src>). Reshaped here rather than inside the
  // component, so HeroKiswahili stays usable on its own with either shape
  // depending on what's passed in.
  const heroImages = useMemo(() => {
    const urls = pageData?.heroSection?.backgroundImage;
    if (!urls?.length) return undefined; // let HeroKiswahili fall back to its own defaults
    return urls.map((url, i) => ({
      url,
      alt: `Kiswahili Institute photo ${i + 1}`,
    }));
  }, [pageData]);

  return (
    <div>
      <HeroKiswahili
        images={heroImages}
        badge={pageData?.heroSection?.badge}
        heading={pageData?.heroSection?.heading}
        headingAccentPrefix={pageData?.heroSection?.headingAccentPrefix}
        headingAccent={pageData?.heroSection?.headingAccent}
        subheading={pageData?.heroSection?.subheading}
        description={pageData?.heroSection?.description}
        buttonText={pageData?.heroSection?.buttonText}
      />

      <FeaturesSection features={pageData?.featuresSection?.features} />

      <LanguageHeroSection
        headingLines={pageData?.masterySection?.headingLines}
        description={pageData?.masterySection?.description}
        stats={pageData?.masterySection?.stats}
        benefits={pageData?.masterySection?.benefits}
        buttonText={pageData?.masterySection?.buttonText}
      />

      <Learning
        badge={pageData?.ctaSection?.badge}
        heading={pageData?.ctaSection?.heading}
        description={pageData?.ctaSection?.description}
        buttonText={pageData?.ctaSection?.buttonText}
      />

      <Contact id="enroll" />
    </div>
  )
}

export default Linguistics