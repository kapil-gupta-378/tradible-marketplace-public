'use client'
import React, { useCallback, useMemo, useState } from 'react'

import CardCarousel from 'design-systems/Molecules/Carousel'
import BannerSliderCard from 'design-systems/Molecules/Cards/BannerSliderCard'
import CardSkeleton from 'design-systems/Molecules/Skeletons/NFTCardSkeleton'
import { bannerCardData } from 'utils'
import { BannerDataTypes } from 'interfaces'

const imageArr = [
  'linear-gradient(51deg, #DD6375 0%, #D76082 21.16%, #A25CE4 53.26%, #7685EF 91.49%)',
  'linear-gradient(110.49deg, #DAC848 18.16%, #4652D8 79.18%)',
  'linear-gradient(106.5deg, #41C679 20.66%, #3466DC 76.84%)',
  'linear-gradient(112.62deg, #5E80F2 19.63%, #8648D6 68.92%)',
  'linear-gradient(73.71deg, #B42A11 20.9%, #611530 74.35%)',
]
export const BannerTemplate = () => {
  const bannerCards = useCallback((isLoading: boolean, data: BannerDataTypes[]) => {
    if (isLoading) {
      return Array(6).fill(<CardSkeleton />)
    }

    return data.map(product => (
      <BannerSliderCard
        color={product.bg_color}
        data={product.image}
        key={product.productId}
        btnHeading={product.btnHeading}
        subHeading={product.subHeading}
        btnLink={product.btnLink}
        heading={product.heading}
      />
    ))
  }, [])

  const bannerElements = useMemo(() => {
    return bannerCards(false, bannerCardData)
  }, [])

  const [color, setColor] = useState<string>(imageArr[0])
  const [isLastSlideHit, setIsLastSlideHit] = useState<boolean>(false)
  const handleSlideChange = (previousSlide: number) => {
    if (previousSlide === 3) setIsLastSlideHit(true)
    if (previousSlide === 1) setIsLastSlideHit(false)
    const idx = isLastSlideHit ? previousSlide - 1 : previousSlide + 1
    setColor(imageArr[idx])
  }
  return (
    <div className={`banner_carousel_slider dark:bg-custom-background-dark relative mb-12 rounded-lg`}>
      <CardCarousel
        className="h-full"
        afterChangeFunction={handleSlideChange}
        cols={1}
        elements={bannerElements}
        isBanner={true}
      />
    </div>
  )
}
