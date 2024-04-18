import React from 'react'

import { ProfileProps } from './interface'

import { ProfileCover, ProfileImage } from 'design-systems/Molecules/Profile'

const Profile: React.FC<ProfileProps> = ({ coverImage, profileImage, userName }) => {
  return (
    <>
      <div className="relative">
        <ProfileCover src={coverImage} isEditCover={true} />
        <ProfileImage userName={userName} className="absolute bottom-3 left-6" src={profileImage} isEditImage={true} />
      </div>
    </>
  )
}

export default Profile
