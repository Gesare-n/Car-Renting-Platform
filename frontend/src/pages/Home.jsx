import React, { useContext } from 'react'
import Landing from '../components/Landing'
import { UserContext } from '../context/UserContext'

export default function
() {

  const { currentUser, register_user} = useContext(UserContext)
  return (
    <div>
       <Landing />
       {currentUser}
    </div>
  )
}
