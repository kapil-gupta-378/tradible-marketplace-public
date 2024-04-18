import React from 'react'

import PortfolioCollectionTemplate from '../PortFolio/PortfolioCollection'

const UserPortfolioTemplate: React.FC = () => {
  return (
    <div className="container">
      <div className="mt-2 flex min-h-[340px] flex-col gap-4">
        <div>
          <PortfolioCollectionTemplate isShowSell={false} />
        </div>
      </div>
    </div>
  )
}

export default UserPortfolioTemplate
