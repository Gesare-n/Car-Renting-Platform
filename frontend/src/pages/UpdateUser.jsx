import React,{ useContext, useEffect, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function UpdateUser() {
    const {currentUser, update_user} = useContext(UserContext)    
    const [password, setPassword] = useState()
    const [repeatPassword, setRepeatPassword] = useState()
    const [name, setName] = useState()
    const [profile_image, setProfileImage] = useState()
    const [phone_number, setPhone_number] = useState()
    
    const nav = useNavigate()


    if(!currentUser) return nav("/login")
  
   
    useEffect(()=>{
        setName(currentUser && currentUser.name)
        setPhone_number(currentUser && currentUser.profile_image)
        setPassword(currentUser && currentUser.password)
        setProfileImage(currentUser && currentUser.phone_number)
    },[currentUser])

    function handleSubmit(e){
      e.preventDefault()
  
      if(password !== repeatPassword){
        toast.error("Passwords do not match")
        return
      }
  
      update_user(name,profile_image, phone_number, password)
     
      setPassword("")
      setRepeatPassword("")
      setProfileImage("")
      setName("")
      setPhone_number("")
      
    }
  return (
   <div className='flex justify-center '>
        <div className='p-3 mt-12 border w-[40vw] rounded-l bg-gray-200'>
        <h4 className='font-bold text-2xl text-center'>Update Account</h4>
        <form onSubmit={handleSubmit}>
            
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" value={name || ""} onChange={(e)=> setName(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="John Doe" required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Image</label>
                <input type="text" value={profile_image || ""} onChange={(e)=> setProfileImage(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="http:www.example.com" required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                <input type="text" value={phone_number || ""} onChange={(e)=> setPhone_number(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="07123456789" required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" value={password || ""} onChange={(e)=> setPassword(e.target.value)}  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                <input type="password" value={repeatPassword || ""} onChange={(e)=> setRepeatPassword(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>

      

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Update
        </button>
        </form>
    </div>
</div>
  )
}
