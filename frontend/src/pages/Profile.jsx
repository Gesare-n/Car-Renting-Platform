import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

function Profile() 
{
    const nav = useNavigate()
    const {currentUser, update_user} = useContext(UserContext)
    const [password, setPassword] = useState()
    const [repeatPassword, setRepeatPassword] = useState()
    const [name, setName] = useState()
    const [phone_number, setPhone_number] = useState()
    const [is_caronwer, setIsCarOnwer] = useState("false")
  
    console.log( password, repeatPassword, name, phone_number, is_caronwer);
    useEffect(()=>{
        setName(currentUser && currentUser.name)
        setPhone_number(currentUser && currentUser.phone_number)
        setPassword(currentUser && currentUser.password)
        setIsCarOnwer(currentUser && currentUser.is_caronwer)
    },[currentUser])




    function handleSubmit(e){
      e.preventDefault()
  
      if(password !== repeatPassword){
        toast.error("Passwords do not match")
        return
      }
  
      update_user(name, phone_number,is_caronwer, password)
    //   setEmail("")
      setPassword("")
      setRepeatPassword("")
      setName("")
      setPhone_number("")
      is_caronwer("false")
    }

    if(!currentUser) return nav("/login")
  return (
    
   <div className='flex flex-col justify-center h-[100vh] items-center'>
    
        <div class="w-full relative   max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        
           
            <div class="flex flex-col items-center pb-10">
                <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                <div class="flex mt-4 md:mt-6">
                    <a href="#" class="inline-flex  items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</a>
                    <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</a>
                </div>
            </div>
        </div>
     </div>  

  )
} 

export default Profile