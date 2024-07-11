import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate , Link, useParams} from 'react-router-dom'

function Profile() 

{
    
    
    const {currentUser} = useContext(UserContext)
 
    const nav = useNavigate()    
    const{id} = useParams()
    
    if(!currentUser) return nav("/login")
  return (
    
   <div className='flex flex-col justify-center h-[100vh] items-center'>
    
        <div class="w-full relative   max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className='text-center underline'>
            <p>User Profile</p>
          </div>
           
            <div class="flex flex-col items-center pb-10">
                <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={currentUser.profile_image} alt="Bonnie image"/>
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Name: {currentUser.name} </h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">Phone: {currentUser.phone_number} </span>
                <div class="flex mt-4 md:mt-6">
                    <Link to="/updateuser" class="inline-flex  items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</Link>
                    {/* <button type="button" onClick={()=> handleDelete(currentUser.id)}  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button> */}
                </div>
            </div>
        </div>
     </div>  

  )
} 

export default Profile