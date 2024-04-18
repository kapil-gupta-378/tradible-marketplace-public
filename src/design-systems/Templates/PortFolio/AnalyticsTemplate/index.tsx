'use client'
import { FiCreditCard, FiDollarSign, FiUsers } from 'react-icons/fi'
import { GoPulse } from 'react-icons/go'
import { useEffect, useMemo } from 'react'

import Spinner from 'design-systems/Atoms/Spinner'
import useSalesGraph from 'hooks/Api/useSalesGraph'
import { CurrentDurationFilterOptions, LinegraphTypes } from 'interfaces'

import usePortfolioData from 'hooks/Api/usePortfolioDetails'
import RevenueBox from 'design-systems/Atoms/RevenueBox'
import SalesList from 'design-systems/Atoms/SalesList/SalesList'
import LineGraph from 'design-systems/Molecules/LineGraph'
import { getFormattedPrice, Graphoptions } from 'utils'
import { useSwitchThemeContext } from 'contexts/ThemeContext'
import Typography from 'design-systems/Atoms/Typography'
import useRecentActivity from 'hooks/Api/useRecentActivityData'
import { UserDataListType } from 'design-systems/Atoms/SalesList/interrfcae'
import { useSearchParams } from 'next/navigation'

const AnalyticsTemplate: React.FC = () => {
  const { themeMode } = useSwitchThemeContext()
  const { portfolioData, isLoadingPortfolioData, isRefetchingPortfolioData, setCurrentDuration } = usePortfolioData()
  const searchParams = useSearchParams()
  const duration = searchParams.get('duration')

  useEffect(() => {
    setCurrentDuration((duration as CurrentDurationFilterOptions) || '1H')
  }, [duration])

  const { salesGraphData, isLoadingSaleGraphData } = useSalesGraph()
  const { recentActivityData, isLoadingRecentActivityData } = useRecentActivity()

  const salesData = useMemo(() => {
    return [
      {
        title: 'Portfolio Value',
        total: portfolioData.portfolioValue ? getFormattedPrice(portfolioData.portfolioValue) : getFormattedPrice(`0`),
        growth: portfolioData.portfolioPercent || `0% from last month`,
        icon: <FiDollarSign />,
      },

      {
        title: 'Total items held',
        total: portfolioData.totalItemHeld ? getFormattedPrice(portfolioData.totalItemHeld) : getFormattedPrice(`0`),
        growth: portfolioData.itemHeldPercent || `0% from last month`,
        icon: <FiUsers />,
      },

      {
        title: 'Profit / loss',
        total: portfolioData.profitAndLoss ? getFormattedPrice(portfolioData.profitAndLoss) : getFormattedPrice(`0`),
        growth: portfolioData.plPercent || `0% from last month`,
        icon: <FiCreditCard />,
      },

      {
        title: 'Portfolio breakdown',
        total: portfolioData.breakDown ? getFormattedPrice(portfolioData.breakDown) : getFormattedPrice(`0`),
        growth: portfolioData.breakdownPercent || `0% from last month`,
        icon: <GoPulse />,
      },
    ]
  }, [portfolioData])

  const salesGraphList: LinegraphTypes = useMemo(() => {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Sales',
          data: salesGraphData.map(item => item.totalProfitLoss),
          fill: false,
          borderColor: `#adfa1d`,
          lineColor: 'rgba(75,192,192,0.4)',
        },
      ],
    }
  }, [salesGraphData])

  const SalesListItem: UserDataListType[] = useMemo(() => {
    if (Array.isArray(recentActivityData)) {
      return recentActivityData?.map(item => {
        return {
          image: item.buyerImage,
          name: item.buyerFirstName,
          price: item.totalSaleAmount ? getFormattedPrice(item.totalSaleAmount) : '-',
          email: item.buyerEmail,
        }
      })
    } else {
      return []
    }
  }, [recentActivityData])

  if (isLoadingPortfolioData || isRefetchingPortfolioData || isLoadingRecentActivityData || isLoadingSaleGraphData) {
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
      <div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {salesData.map((item, index) => {
            return (
              <RevenueBox growth={item.growth} icons={item.icon} key={index} price={item.total} title={item.title} />
            )
          })}
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4">
          <div className=" col-span-12 rounded-lg border p-6  dark:border-neutral-light-700 slg:col-span-7">
            <Typography className="mb-4 text-left !font-semibold dark:text-white" size="h6" variant="regular">
              Overview
            </Typography>
            <div className="h-[200px] w-full sm:h-[350px]">
              <LineGraph data={salesGraphList} options={Graphoptions} themeMode={themeMode} />
            </div>
          </div>
          <SalesList className="col-span-12 slg:col-span-5" heading="Recent Activity" items={SalesListItem} />
        </div>
      </div>
    </>
  )
}

export default AnalyticsTemplate
