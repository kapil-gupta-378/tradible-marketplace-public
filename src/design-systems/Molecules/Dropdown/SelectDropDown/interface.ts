import { ReactElement } from 'react'

import { RecentViewDataTypes } from 'interfaces'

export interface selectionType {
  items: RecentViewDataTypes[]
  Icons?: ReactElement
  heading?: string
  removeHandler?: Function
  controlHandler?: () => void
  closeHandler?: () => void
  isButton?: boolean
}
