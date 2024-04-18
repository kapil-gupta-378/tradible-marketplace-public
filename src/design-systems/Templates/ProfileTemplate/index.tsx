/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'

import { ProfileTemplateProps } from './interface'

import ProfileBanner from 'design-systems/Molecules/ProfileBanner'
import ProfileTab from 'design-systems/Molecules/Tabs/TabsNavigation'
import Profile from 'design-systems/Molecules/ProfileComponents/profile'
import { AuthContext } from 'contexts/AuthContext'
import { useUserProfile } from 'hooks/Api/useUserProfile'

export const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ active, handleActive, userData }) => {
  const { state } = useContext(AuthContext)
  const { userId } = useParams()
  const [navItems, setNavItems] = useState([
    { title: 'Activity', link: `activity` },
    { title: 'Feedback', link: `feedback` },
    { title: 'Watching', link: `watching` },
  ])
  const { user, refetchSingleUserData } = useUserProfile()

  const followUnfollowCB = () => {
    refetchSingleUserData()
  }

  const statItems = useMemo(
    () => [
      { label: 'Followers', value: user?.data?.followers || 0 },
      { label: 'Following', value: user?.data?.following || 0 },
      { label: 'Owned', value: user?.data?.owned || 0 },
    ],
    [user]
  )

  useEffect(() => {
    if (state.data.user.id && +userId !== state.data.user.id) {
      setNavItems([
        { title: 'Portfolio', link: 'portfolio' },
        { title: 'Activity', link: `activity` },
        { title: 'Feedback', link: `feedback` },
      ])
    }
    userData?.bannerImage?.includes('http')
  }, [state.data.user.id, userId])

  return (
    <div className="container ">
      <Profile
        coverImage={userData?.bannerImage && userData?.bannerImage.includes('http') ? userData?.bannerImage : ''}
        profileImage={userData?.thumbnail && userData?.thumbnail.includes('http') ? userData?.thumbnail : ''}
        userName={`${userData?.firstName ? userData.firstName : ''} ${userData?.lastName ? userData.lastName : ''}`}
      />
      <ProfileBanner
        LinkName="Edit Profile"
        ProfileLink={'/settings/profile'}
        about={userData?.bio || ''}
        isFollower={userData?.isFollower}
        userId={0}
        followUnfollowCB={followUnfollowCB}
        statItems={statItems}
        userName={`${userData?.firstName ? userData.firstName : ''} ${userData?.lastName ? userData.lastName : ''}`}
      />
      <ProfileTab active={active} data={navItems} disableLink handleActive={handleActive} isShowVertical={false} />
    </div>
  )
}
export default ProfileTemplate
