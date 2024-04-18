'use client'
import React, { useEffect, useMemo } from 'react'
import { useSellerAnalytics, useSellerGraph } from 'hooks/Api/useSellerAnalytics'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CurrentDurationFilterOptions, LinegraphTypes } from 'interfaces'
import { addPercentageSign, fixDecimal, getFormattedPrice, Graphoptions } from 'utils'
import { MdChecklistRtl } from 'react-icons/md'
import { IoBagAddOutline } from 'react-icons/io5'
import { FaRegUser } from 'react-icons/fa'
import { GoPulse } from 'react-icons/go'
import { AiOutlineDollar } from 'react-icons/ai'
import AssetTab from 'design-systems/Molecules/Tabs/AssetTab'
import Typography from 'design-systems/Atoms/Typography'
import RevenueBox from 'design-systems/Atoms/RevenueBox'
import LineGraph from 'design-systems/Molecules/LineGraph'
import { useSwitchThemeContext } from 'contexts/ThemeContext'
import Spinner from 'design-systems/Atoms/Spinner'

const SellerAnalyticsTemplate: React.FC = () => {
  const { themeMode } = useSwitchThemeContext()

  const { sellerAnalyticsDataFormatted, setCurrentDuration, isLoadingSellerAnalytics } = useSellerAnalytics()
  const { sellerGraphData, isLoadingSellerGraphData } = useSellerGraph()
  const searchParams = useSearchParams()
  const duration = searchParams.get('duration')
  const route = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    setCurrentDuration((duration as CurrentDurationFilterOptions) || '1H')
  }, [duration])

  const salesData = useMemo(() => {
    return [
      {
        title: 'Sales',
        total: sellerAnalyticsDataFormatted?.totalSales
          ? getFormattedPrice(sellerAnalyticsDataFormatted?.totalSales)
          : getFormattedPrice(`0`),
        growth: ``,
        icon: <MdChecklistRtl />,
      },

      {
        title: 'Revenue',
        total: sellerAnalyticsDataFormatted?.totalRevenue
          ? getFormattedPrice(sellerAnalyticsDataFormatted?.totalRevenue)
          : getFormattedPrice(`0`),
        growth: ``,
        icon: <AiOutlineDollar />,
      },

      {
        title: 'Average order value ',
        total: sellerAnalyticsDataFormatted?.totalAverageOrderValue
          ? getFormattedPrice(sellerAnalyticsDataFormatted?.totalAverageOrderValue)
          : getFormattedPrice(`0`),
        growth: ``,
        icon: <FaRegUser />,
      },
      {
        title: 'Conversion rate',
        total: sellerAnalyticsDataFormatted?.conversionRate
          ? getFormattedPrice(sellerAnalyticsDataFormatted?.conversionRate)
          : getFormattedPrice(`0`),
        growth: ``,
        icon: <GoPulse />,
      },
      {
        title: 'Return rate',
        total: sellerAnalyticsDataFormatted?.totalReturnRate
          ? addPercentageSign(fixDecimal(sellerAnalyticsDataFormatted?.totalReturnRate))
          : addPercentageSign(fixDecimal(`0`)),
        growth: ``,
        icon: <IoBagAddOutline />,
      },
    ]
  }, [sellerAnalyticsDataFormatted])

  const handleSetDuration = (duration: string) => {
    route.push(`${pathName}?duration=${duration}`)
  }

  const salesGraphList: LinegraphTypes = useMemo(() => {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Sales',
          data: sellerGraphData.map(item => Number(item.itemCount)),
          fill: false,
          borderColor: `#adfa1d`,
          lineColor: 'rgba(75,192,192,0.4)',
        },
      ],
    }
  }, [])

  if (isLoadingSellerAnalytics && isLoadingSellerGraphData) {
    return (
      <div>
        <div className="flex h-[100vh] items-center justify-center ">
          <Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container">
        <div className="my-3 flex justify-between">
          <Typography size="h2">Analytics</Typography>
          <AssetTab handleChange={handleSetDuration} />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {salesData.map((item, index) => {
            return (
              <RevenueBox
                growth={item.growth}
                icons={item.icon}
                key={index}
                price={item.total.toString()}
                title={item.title}
              />
            )
          })}
        </div>
        <div className=" col-span-12 mt-5 rounded-lg border p-6  dark:border-neutral-light-700 slg:col-span-7">
          <Typography className="mb-4 text-left !font-semibold dark:text-white" size="h6" variant="regular">
            Overview
          </Typography>
          <div className="h-[200px] w-full sm:h-[350px]">
            <LineGraph data={salesGraphList} options={Graphoptions} themeMode={themeMode} />
          </div>
        </div>
      </div>
    </>
  )
}

export default SellerAnalyticsTemplate
