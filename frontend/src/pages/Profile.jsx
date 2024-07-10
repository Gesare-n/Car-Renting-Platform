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
    
   <div className='flex flex-col justify-center items-center'>
    
        <div class="w-full relative   max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        
           
            <div class="flex flex-col items-center pb-10">
                <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                <div class="flex mt-4 md:mt-6">
                    <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                    <a href="#" class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a>
                </div>
            </div>
        </div>
        <div className='w-[50vw] border rounded-xl bg-gray-200'>
    <h4 className='font-bold tex-2xl text-center mt-8'>Update Your Account</h4>
    <form onSubmit={handleSubmit} className='p-16'>

    <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input type="text" value={name || ""} onChange={(e)=> setName(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="John Doe" required />
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

    <div className="mb-5">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Register as</label>
    <select onChange={ e => setIsCarOnwer(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option selected value="false">User</option>
      <option value="true">Car Owner</option>
    </select>
    </div>

    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Update
    </button>
    </form>
</div>





     </div>  

  )
} 

export default Profile