'use client'
import React, { FC } from 'react'

import Typography from 'design-systems/Atoms/Typography'
import OrderPriceCard from 'design-systems/Molecules/Cards/OrderPriceCard'
import useItemDetails from 'hooks/Api/useItemDetails'
import { useParams } from 'next/navigation'
import moment from 'moment'
import { ActivityTabSkeleton } from 'design-systems/Molecules/Skeletons/ActivityTabSkeleton'

const DetailsTab: FC = () => {
  const params = useParams()
  const { ItemDetailsData, isLoadingItemDetailsData } = useItemDetails(params.AssetsId)
  if (isLoadingItemDetailsData) {
    return <ActivityTabSkeleton />
  }

  return (
    <div className="mt-8 flex flex-col gap-8 xs:flex-col xs:gap-8 xlg:flex-row xlg:gap-0">
      <div className="flex flex-col   gap-8 xlg:w-2/3">
        <div className="flex flex-col  gap-8 xs:flex-col lg:flex-row">
          <div className="flex gap-2">
            <Typography className={'mb-1 text-left'} size={'h6'} variant={'regular'}>
              Evolves from
            </Typography>
            <Typography
              className="text-custom-grey text-left font-inter  font-medium text-neutral-500 dark:!text-neutral-light-300"
              size={'h6'}
              variant={'regular'}
            >
              {ItemDetailsData?.result?.product?.evolvesFrom ? ItemDetailsData?.result?.product?.evolvesFrom : '-'}
            </Typography>
          </div>
          <div className="flex gap-2">
            <Typography className={'mb-1 text-left'} size={'h6'} variant={'regular'}>
              HP
            </Typography>
            <Typography
              className="text-custom-grey text-left font-inter  font-medium text-neutral-500 dark:!text-neutral-light-300"
              size={'h6'}
              variant={'regular'}
            >
              {ItemDetailsData?.result?.product?.hp ? ItemDetailsData?.result?.product?.hp : '-'}
            </Typography>
          </div>
          <div className="flex gap-2">
            <Typography className={'mb-1 text-left'} size={'h6'} variant={'regular'}>
              Types
            </Typography>
            <Typography
              className="text-custom-grey text-left font-inter  font-medium text-neutral-500 dark:!text-neutral-light-300"
              size={'h6'}
              variant={'regular'}
            >
              {ItemDetailsData.result?.product?.superType ? ItemDetailsData.result?.product?.superType : '-'}
            </Typography>
          </div>
          <div className="flex gap-2">
            <Typography className={'mb-1 text-left'} size={'h6'} variant={'regular'}>
              Retreat costs
            </Typography>
            <Typography
              className="text-custom-grey text-left font-inter  font-medium text-neutral-500 dark:!text-neutral-light-300"
              size={'h6'}
              variant={'regular'}
            >
              {`${
                ItemDetailsData?.result?.product?.convertedRetreatCost
                  ? ItemDetailsData?.result?.product?.convertedRetreatCost
                  : ''
              } ${
                ItemDetailsData?.result?.product?.retreatCost ? ItemDetailsData?.result?.product?.retreatCost[0] : ''
              }`}
            </Typography>
          </div>
          <div className="flex gap-2">
            <Typography className={'mb-1 text-left'} size={'h6'} variant={'regular'}>
              Weaknesses
            </Typography>
            <Typography
              className="text-custom-grey text-left font-inter  font-medium text-neutral-500 dark:!text-neutral-light-300"
              size={'h6'}
              variant={'regular'}
            >
              {`${
                ItemDetailsData?.result?.product?.weaknesses
                  ? ItemDetailsData?.result?.product?.weaknesses[0]?.value
                  : '-'
              } ${
                ItemDetailsData?.result?.product?.weaknesses
                  ? ItemDetailsData?.result?.product?.weaknesses[0]?.type
                  : '-'
              }`}
            </Typography>
          </div>
        </div>
        {ItemDetailsData?.result?.product?.description && (
          <div className="flex w-full  flex-col gap-3">
            <Typography className="text-left font-inter text-2xl font-semibold" size={'h3'}>
              Card text
            </Typography>
            <Typography
              className="text-custom-grey text-left align-baseline font-inter text-base font-medium text-neutral-500 dark:!text-neutral-light-300"
              variant={'regular'}
            >
              {ItemDetailsData?.result?.product?.description
                ? ItemDetailsData?.result?.product?.description[0]?.text
                : ''}
            </Typography>
          </div>
        )}
        {ItemDetailsData?.result?.product?.abilities && (
          <div className="flex w-full  flex-col gap-3">
            <Typography className="text-left font-inter text-2xl font-semibold" size={'h3'}>
              Abilities
            </Typography>
            <Typography
              className="text-custom-grey text-left align-baseline font-inter text-base font-medium text-neutral-500 dark:!text-neutral-light-300"
              variant={'regular'}
            >
              {`${ItemDetailsData?.result?.product?.abilities[0]?.name}: ${ItemDetailsData?.result?.product?.abilities[0]?.text} `}
            </Typography>
          </div>
        )}

        {ItemDetailsData?.result?.product?.productAttack && (
          <div className="flex  w-full flex-col gap-3">
            <Typography className="text-left font-inter text-2xl font-semibold" size={'h3'}>
              Attacks
            </Typography>
            <div className=" w-full md:w-[344px]">
              <OrderPriceCard
                OrderPricingList={[
                  { itemName: 'Name', price: ItemDetailsData?.result?.product?.productAttack?.name || '-' },
                  { itemName: 'Damage', price: ItemDetailsData?.result?.product?.productAttack?.damage || '-' },
                  {
                    itemName: 'Text',
                    price: ItemDetailsData?.result?.product?.productAttack?.text || '-',
                  },
                ]}
              />
            </div>
          </div>
        )}
        {ItemDetailsData?.result?.product?.legalities && (
          <div className="flex  flex-col gap-3">
            <Typography className="text-left font-inter text-2xl font-semibold" size={'h3'}>
              Legalities
            </Typography>
            <div className="w-full md:w-[344px]">
              <OrderPriceCard
                OrderPricingList={[
                  { itemName: 'Unlimited', price: ItemDetailsData?.result?.product?.legalities['unlimited'] || '-' },
                  { itemName: 'Standard', price: ItemDetailsData?.result?.product?.legalities['standard'] || '-' },
                  { itemName: 'Expanded', price: ItemDetailsData?.result?.product?.legalities['expanded'] || '-' },
                ]}
              />
            </div>
          </div>
        )}
      </div>
      <div className=" flex w-full md:w-1/3  xlg:justify-end">
        <div className="w-full md:w-[344px]">
          <OrderPriceCard
            OrderPricingList={[
              { itemName: 'Number', price: ItemDetailsData?.result?.product?.cardNumber },
              {
                itemName: 'Artist',
                price: ItemDetailsData?.result?.product?.artist ? ItemDetailsData?.result?.product?.artist : '-',
              },
              {
                itemName: 'Rarity',
                price: ItemDetailsData?.result?.product?.rarity ? ItemDetailsData?.result?.product?.rarity : '-',
              },
              {
                itemName: 'Release date',
                price: moment(ItemDetailsData?.result?.product?.createdAt).format('DD-MM-YYYY'),
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default DetailsTab
