'use client'
import { GoPulse } from 'react-icons/go'
import React, { useEffect, useMemo } from 'react'
import { CurrentDurationFilterOptions, LinegraphTypes } from 'interfaces'
import RevenueBox from 'design-systems/Atoms/RevenueBox'
import { fixDecimal, getFormattedPrice, Graphoptions } from 'utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useOrganizationAnalytics, { useOrganizationGraph } from 'hooks/Api/useOrganizationAnalytics'
import { MdChecklistRtl } from 'react-icons/md'
import { IoBagAddOutline } from 'react-icons/io5'
import { FaRegUser } from 'react-icons/fa'
import { AiOutlineDollar } from 'react-icons/ai'
import AssetTab from 'design-systems/Molecules/Tabs/AssetTab'
import Typography from 'design-systems/Atoms/Typography'
import { useOrganizationContext } from 'contexts/OrganizationContext'
import Spinner from 'design-systems/Atoms/Spinner'
import LineGraph from 'design-systems/Molecules/LineGraph'
import { useSwitchThemeContext } from 'contexts/ThemeContext'

const OrganizationAnalyticsTemplate: React.FC = () => {
  const { themeMode } = useSwitchThemeContext()

  const {
    organizationAnalytics,
    setCurrentDuration,
    isLoadingOrganizationAnalytics,
    isRefetchingOrganizationAnalytics,
  } = useOrganizationAnalytics()
  const { activeOrganization, getOrganizationData } = useOrganizationContext()
  const { organizationGraphData, isLoadingOrganizationGraphData } = useOrganizationGraph()
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
        title: 'Total Products Listed',
        total: organizationAnalytics?.totalProductCount
          ? fixDecimal(organizationAnalytics?.totalProductCount)
          : fixDecimal(`0`),
        growth: organizationAnalytics?.portfolioPercent || ``,
        icon: <MdChecklistRtl />,
      },

      {
        title: 'Total orders placed',
        total: organizationAnalytics?.totalOrderCount
          ? fixDecimal(organizationAnalytics?.totalOrderCount)
          : fixDecimal(`0`),
        growth: organizationAnalytics?.itemHeldPercent || ``,
        icon: <IoBagAddOutline />,
      },

      {
        title: 'Total user associated ',
        total: organizationAnalytics?.totalUserCount
          ? fixDecimal(organizationAnalytics?.totalUserCount)
          : fixDecimal(`0`),
        growth: organizationAnalytics?.breakdownPercent || ``,
        icon: <FaRegUser />,
      },
      {
        title: 'Total org administrator ',
        total: organizationAnalytics?.totalAdministratorCount
          ? fixDecimal(organizationAnalytics?.totalAdministratorCount)
          : fixDecimal(`0`),
        growth: organizationAnalytics?.breakdownPercent || ``,
        icon: <GoPulse />,
      },
      {
        title: 'Total revenue ',
        total: organizationAnalytics?.totalOrderItemPrice
          ? getFormattedPrice(organizationAnalytics?.totalOrderItemPrice)
          : getFormattedPrice(`0`),
        growth: organizationAnalytics?.plPercent || ``,
        icon: <AiOutlineDollar />,
      },
    ]
  }, [organizationAnalytics])
  const handleSetDuration = (duration: string) => {
    route.push(`${pathName}?duration=${duration}`)
  }
  const salesGraphList: LinegraphTypes = useMemo(() => {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Sales',
          data: organizationGraphData.map(item => Number(item.itemCount)),
          fill: false,
          borderColor: `#adfa1d`,
          lineColor: 'rgba(75,192,192,0.4)',
        },
      ],
    }
  }, [organizationGraphData])

  if (isLoadingOrganizationAnalytics || isRefetchingOrganizationAnalytics || isLoadingOrganizationGraphData) {
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

export default OrganizationAnalyticsTemplate
