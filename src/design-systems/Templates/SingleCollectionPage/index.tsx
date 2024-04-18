import React from 'react'
import moment from 'moment'

import { SingleCollectionPageProps } from './interface'

import { ProfileCover } from 'design-systems/Molecules/Profile'
import ProfileBanner from 'design-systems/Molecules/ProfileBanner'
import { collectionNavItems } from 'utils'
import SingleCollectionTab from 'design-systems/Molecules/Tabs/SingleCollectionTab'

const SingleCollectionPage: React.FC<SingleCollectionPageProps> = ({ collectionDetail }) => {
  return (
    <div className="container">
      <ProfileCover src={collectionDetail?.data.thumbnail} />
      <ProfileBanner
        ProfileBtn="Add to watchlist"
        ProfileLink=""
        isAddedtoWatchlisted={collectionDetail?.data.isWatchListed}
        about="Series name:"
        displayInline={true}
        displayName={collectionDetail?.data?.series || 'Not Mentioned'}
        statItems={[
          { label: 'Release date', value: moment(collectionDetail?.data.releaseDate).format('DD-MMM-YYYY') },
          { label: 'Total cards', value: collectionDetail?.data.totalCard || 0 },
          { label: 'Printed Total cards', value: collectionDetail?.data.printedCard || 0 },
        ]}
        userName={collectionDetail?.data?.name || ''}
      />
      <SingleCollectionTab data={collectionNavItems} />
    </div>
  )
}

export default SingleCollectionPage
