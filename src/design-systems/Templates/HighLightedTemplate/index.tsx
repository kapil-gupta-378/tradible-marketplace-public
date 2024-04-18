'use client'
import NextLink from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'

import { FeaturedProductDetail } from 'api-services/interface'
import useFeaturedProducts from 'hooks/Api/useFeaturedItems'
import CardCarousel from 'design-systems/Molecules/Carousel'
import HighlightedCard from 'design-systems/Molecules/Cards/HighlightedCard'
import Button from 'design-systems/Atoms/Button'
import Typography from 'design-systems/Atoms/Typography'
import HighLightedCardSkeleton from 'design-systems/Molecules/Skeleton/HighlightedCardSkeleton'
import DataNotFound from 'design-systems/Molecules/DataNotFound'

const Highlighted = () => {
  const [isLoading, setLoading] = useState(true)
  const { featuredProductData, isLoadingFeaturedProduct } = useFeaturedProducts()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])
  const featuredCardColorList = [
    '#1a87cd',
    '#0f0f0f',
    '#ce0e2d',
    '#49a058',
    '#1c2d87',
    '#3c21bf',
    '#374366',
    '#205177',
    '#205177',
    '#da1b8a',
    '#fa720c',
    '#0a3f70',
  ]
  const highlightedCards = useCallback(
    (isLoading: boolean, data: FeaturedProductDetail[]) => {
      if (isLoading) {
        return Array(6).fill(<HighLightedCardSkeleton />)
      }

      return data.map((product, idx) => (
        <HighlightedCard
          bg_color={featuredCardColorList[idx]}
          description={
            typeof product?.product?.description === 'string'
              ? product?.product?.description
              : product?.product?.description?.reduce((str, item) => `${str} ${item.text}`, '')
          }
          floorPrice={product?.floorPrice}
          img={product?.product?.thumbnail}
          isAuction={product?.isAuction}
          isLike={product?.isLike}
          key={product.productId}
          listings={product.price}
          name={product?.product?.title}
          number={product?.product?.cardNumber}
          price={product?.price}
          productId={product.productId}
          rarity={product?.product?.rarity}
          routeLink={`/assets/${product.id}/details`}
          set={product?.product?.setName}
          id={product?.id}
        />
      ))
    },
    [isLoading]
  )

  const highlightedElements = useMemo(() => {
    return highlightedCards(isLoadingFeaturedProduct, featuredProductData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingFeaturedProduct, featuredProductData])

  return (
    <div className="flex h-fit w-full flex-col rounded-xl bg-lilac px-2 py-1.5 dark:bg-blue-300 dark:text-black lg:flex-row lg:gap-0 lg:px-5 lg:pb-16 lg:pt-6">
      <div className="  flex w-full flex-col items-center justify-center  gap-4 py-4 text-center lg:w-4/12  lg:items-start lg:py-0 lg:text-left xlg:w-[28%]">
        <div className="sm:!text-center  lg:pl-3 ">
          <Typography
            className="text-center !font-medium text-black dark:text-white lg:text-left"
            size="h1"
            variant="regular"
          >
            Check out highlighted cards
          </Typography>

          <div className=" flex !justify-center lg:!justify-start xlg:!justify-start ">
            <NextLink href={`explore/marketplace`}>
              <Button className="!bg-neutral-custom-black!px-4 mt-7 items-center !rounded-md !py-3.5 font-inter   text-base !font-bold   outline-none   focus:scale-95 active:!shadow-none dark:!bg-white  ">
                Explore marketplace <HiArrowNarrowRight className="text-lg" />
              </Button>
            </NextLink>
          </div>
        </div>
      </div>
      <div className="w-full border-spacing-2 border-r-secondary-500 lg:w-[70%] xlg:w-[75%] ">
        {highlightedElements?.length === 0 || !highlightedElements ? (
          <DataNotFound className="h-[30vh]">No data found</DataNotFound>
        ) : (
          <CardCarousel
            cols={3}
            elements={highlightedElements}
            landscapeCols={2}
            mobileCols={1}
            slidesToSlide={4}
            smallMobileCols={2}
            smallTabletCols={3}
            tabletCols={2}
          />
        )}
      </div>
    </div>
  )
}
export default Highlighted
