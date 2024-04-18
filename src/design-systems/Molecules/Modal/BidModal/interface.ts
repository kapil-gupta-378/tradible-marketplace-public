import { ItemDetails } from 'api-services/interface'

export interface BidModalProps {
  closeModal: () => void
  isOpenModal: boolean
  data: ItemDetails
}
