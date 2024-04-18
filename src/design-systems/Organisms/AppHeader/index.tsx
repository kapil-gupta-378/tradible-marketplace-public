import { CollectorType, useCollectorTypeContext } from '../../../contexts/CollectorType'
import Header from '../Header'
import ProHeader from '../ProHeader'
import useMediaQuery from '../../../hooks/useMediaQuery'

export default function AppHeader({ children }: { children: React.ReactNode }) {
  const { collectorType, setCollectorType } = useCollectorTypeContext()
  const isMobileView = useMediaQuery('(max-width: 768px)')

  if (isMobileView) {
    return (
      <>
        <Header />
        <div className="main mt-[96px]">{children}</div>
      </>
    )
  }

  return (
    <>
      {collectorType === CollectorType.COLLECTOR ? (
        <>
          <Header />
          <div className="main mt-[96px]">{children}</div>
        </>
      ) : (
        <>
          <ProHeader />
          <div className="main ml-[72px] mt-[88px]">{children}</div>
        </>
      )}
    </>
  )
}
