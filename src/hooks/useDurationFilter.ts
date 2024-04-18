import { useState } from 'react'

import { CurrentDurationFilterOptions } from '../interfaces'

const useDurationFilter = (initialValue: CurrentDurationFilterOptions = '1D') => {
  const [currentDuration, setCurrentDuration] = useState<CurrentDurationFilterOptions>(initialValue)
  return {
    currentDuration,
    setCurrentDuration,
  }
}

export default useDurationFilter
