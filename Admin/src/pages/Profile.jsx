import React from 'react'
import { useSelector } from 'react-redux'
const Profile = () => {
  const {data} = useSelector((state)=>state.user);
  return (
    <div>
      i am a profile page here
    </div>
  )
}

export default Profile
