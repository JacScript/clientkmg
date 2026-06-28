import React, { useMemo } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getHolidayHomePageData } from '../../http'
import useTitle from '../../components/useTitle'
import VillaHero from '../../components/airbnb/VillaHero'
import ApartmentsSection from '../../components/airbnb/ApartmentsSection'

const AirBnB = () => {
  useTitle('AirBnB')

  const { data: resData } = useQuery({
    queryKey: ['holiday-home'],
    queryFn: getHolidayHomePageData,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const pageData = useMemo(() => resData?.data?.data, [resData]);

  return (
    <>
      <div className="mt-40">
        <VillaHero
          images={pageData?.heroSection?.images}
          eyebrow={pageData?.heroSection?.eyebrow}
          title={pageData?.heroSection?.title}
          subheading={pageData?.heroSection?.subheading}
        />
      </div>

      <ApartmentsSection
        apartments={pageData?.listingsSection?.apartments}
        badge={pageData?.listingsSection?.badge}
        heading={pageData?.listingsSection?.heading}
        subheading={pageData?.listingsSection?.subheading}
      />
    </>
  )
}

export default AirBnB