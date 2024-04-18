'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import HotCollectionsTemplate from '../HotCollectionsTemplate'
import { BannerTemplate } from '../BannerSliderTemplate'
import Highlighted from '../HighLightedTemplate'

import { UpComingCollectionDetail } from 'api-services/interface'
import useUpcomingCollections from 'hooks/Api/useUpcomimgCollections'
import useRecentViewNFT from 'hooks/Api/useRecentViewNFT'
import Typography from 'design-systems/Atoms/Typography'
import CardCarousel from 'design-systems/Molecules/Carousel'
import UpComingCard from 'design-systems/Molecules/Cards/UpComingCard'
import RecentViewedCard from 'design-systems/Molecules/Cards/RecentlyViewedCard'
import Layout from 'design-systems/Organisms/Layout'
import UpcomingCardSkeleton from 'design-systems/Molecules/Skeleton/UpComingCardSkeleton'
import RecentCardSkeleton from 'design-systems/Molecules/Skeleton/RecentCardSkeleton'
import DataNotFound from 'design-systems/Molecules/DataNotFound'
import moment from 'moment'
import React from 'react'
import { AuthContext } from '../../../contexts/AuthContext'

export const HomePageTemplate: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const { state } = useContext(AuthContext)
  const { recentViewNFTData, isLoadingRecentViewNFT } = useRecentViewNFT()
  const { upComingCollectionsData, isLoadingUpcomingCollections } = useUpcomingCollections()

  const viewCards = useCallback(
    (isLoading: boolean, cardData: any) => {
      if (isLoading) {
        return Array(6).fill(<RecentCardSkeleton />)
      }

      const filteredData = cardData.filter((item: any) => {
        return !(
          Boolean(item?.productListing?.isAuction) &&
          moment(moment(item?.productListing?.auctionEndDate).toISOString()).isBefore(moment().toISOString())
        )
      })

      return (
        filteredData &&
        filteredData.length > 0 &&
        filteredData.map((item: any) => (
          <React.Fragment key={item?.id}>
            <RecentViewedCard
              className=""
              collected={true}
              isAuction={item?.productListing?.isAuction}
              item={{
                ...item,
                product: item?.productListing?.product,
                id: item?.productListing?.id,
                productId: item?.productListing?.productId,
              }}
            />
          </React.Fragment>
        ))
      )
    },
    [isLoading]
  )

  const upcomingCards = useCallback(
    (isLoading: boolean, data: UpComingCollectionDetail[]) => {
      if (isLoading) {
        return Array(6).fill(<UpcomingCardSkeleton />)
      }

      return data.map((product, idx: number) => (
        <UpComingCard
          img={product.c_thumbnail && product.c_thumbnail.includes('http') ? product.c_thumbnail : ''}
          key={idx}
          name={product.c_name}
          releaseDate={product.presaleDate}
          routeLink={`/collections/${product.c_id}/items`}
          series={product.category}
          setId={''}
          totalCards={product.totalProducts}
        />
      ))
    },
    [isLoading]
  )

  const upcomingCardElements = useMemo(() => {
    return upcomingCards(isLoadingUpcomingCollections, upComingCollectionsData)
  }, [upComingCollectionsData, isLoadingUpcomingCollections])

  const recentlyCardElements = useMemo(() => {
    return viewCards(isLoadingRecentViewNFT, recentViewNFTData)
  }, [isLoadingRecentViewNFT, recentViewNFTData])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  return (
    <Layout>
      <div className="container">
        <BannerTemplate />
        <div className="recently_viewed  !sm:px-2">
          {state.data.token && (
            <>
              <Typography className="text-left dark:text-white" size="h2" variant="regular">
                Recently viewed
              </Typography>

              {recentlyCardElements?.length === 0 || !recentlyCardElements ? (
                <DataNotFound className="h-[30vh]">No data found</DataNotFound>
              ) : (
                <CardCarousel
                  className="-mx-2"
                  cols={4}
                  elements={recentlyCardElements}
                  landscapeCols={2}
                  mobileCols={1}
                  slidesToSlide={4}
                  smallMobileCols={2}
                  tabletCols={3}
                />
              )}
            </>
          )}
        </div>
        <div className="hot_collection_card !sm:px-2 mt-10">
          <Typography className="text-left dark:text-white" size="h2" variant="regular">
            Hot collections
          </Typography>
          <HotCollectionsTemplate />
        </div>

        <div className="heighlighted_card !lmd:px-2 mt-9">
          <Highlighted />
        </div>
        <div className="upcoming_card !fixedsm:px-2 dark:bg-custom-background-dark">
          <Typography className="mb-8 mt-16 text-left dark:text-white" size="h2" variant="regular">
            Upcoming collections
          </Typography>

          {upcomingCardElements?.length === 0 || !upcomingCardElements ? (
            <DataNotFound className="h-[30vh]">No data found</DataNotFound>
          ) : (
            <CardCarousel className="" cols={3} elements={upcomingCardElements} slidesToSlide={3} tabletCols={3} />
          )}
        </div>
      </div>
    </Layout>
  )
}
export default HomePageTemplate
