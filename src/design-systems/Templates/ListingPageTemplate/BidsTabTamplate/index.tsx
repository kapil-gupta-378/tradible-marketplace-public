import { FC, useState } from 'react'

import BidsMadeTemplate from './BidsMadeTemplate'
import BidsReceivedTemplate from './BidsReceivedTemplate'

import { BidsMadeFilterBar } from 'design-systems/Molecules/FilterBars/BidsMadeFilterBar'
import useDebounce from 'hooks/useDebounce'

export const BidTabTemplate: FC = () => {
  const [filterBy, setFilterBy] = useState<string>('bids-made')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debounceValue = useDebounce(searchTerm, 300)

  return (
    <>
      <BidsMadeFilterBar
        filterBy={filterBy}
        searchTerm={searchTerm}
        setFilterBy={setFilterBy}
        setSearchTerm={setSearchTerm}
      />

      {filterBy === 'bids-made' ? (
        <BidsMadeTemplate debounceValue={debounceValue} filterBy={filterBy} searchTerm={searchTerm} />
      ) : (
        <BidsReceivedTemplate debounceValue={debounceValue} filterBy={filterBy} searchTerm={searchTerm} />
      )}
    </>
  )
}
