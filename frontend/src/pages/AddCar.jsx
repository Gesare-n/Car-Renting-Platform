import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import { CarContext } from '../context/CarContext';


export default function AddCar() 
{

  const {currentUser} = useContext(UserContext)
  const {add_event} = useContext(CarContext)

  const nav = useNavigate()
  const [car_model, setCarModel] = useState()
  const [year, setYear] = useState()
  const [availability_status, setAvailability] = useState()
  const [price, setPrice] = useState()
  const [car_image_url, setCarImage] = useState()

  function handleSubmit(e){
    e.preventDefault()
     add_event(car_model, year, availability_status, price, car_image_url)


  }
  return (
    <div>
    { currentUser && currentUser.is_carowner?
    <div className='grid grid-cols-2 h-[80vh] mt-6'>
      <div className='bg-gray-800 text-white flex justify-center items-center'>
        <h1 className='text-6xl font-bold'>Add New Car </h1>
      </div>
      <div className='p-6 '>
        <h1 className='text-center font-semibold text-2xl'>Add Car</h1>
        
        <form onSubmit={handleSubmit} class="max-w-md mx-auto">
          <div class="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car Model</label>
            <input value={car_model} onChange={(e)=> setCarModel(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>

          <div class="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
            <input value={year} onChange={(e)=> setYear(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>

          <div class="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Url</label>
            <textarea value={car_image_url} onChange={(e)=> setCarImage(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required >
              </textarea>
          </div>
          <div class="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event date</label>
            <input value={price} onChange={(e)=> setPrice(e.target.value)} type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <div class="mb-5">
          <select onChange={ e => setAvailability(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {/* <option selected>Choose a country</option> */}
              <option selected value="false">Available</option>
              <option value="true">Booked</option>
            </select>
          </div>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Save Post
          </button>

        </form>



      </div>
    </div>
    :
    <div>
      <h1 className='text-3xl text-center'>You are not authorized to view this page</h1>
    </div>
}

  </div>
  )
}