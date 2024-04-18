import { CollectionDetail } from 'api-services/interface'

export interface SingleCollectionPageProps {
  className?: string
  statItems?: { label: string; value: string }[]
  collectionDetail?: CollectionDetail
}

export interface queryOptionType {
  pageNumber: number
  pageSize: number
  tab?: string
  collectionId?: number
}
