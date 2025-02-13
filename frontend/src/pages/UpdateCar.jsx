import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import { CarContext } from '../context/CarContext';


export default function UpdateEvent() 
{ 
  const {currentUser} = useContext(UserContext);
  const {update_car, car} = useContext(CarContext);  
  const [name, setName] = useState('')
  const [model, setCarModel] = useState('')
  const [year, setYear] = useState('')
  const [price_per_day, setPrice] = useState('')
  const [car_image_url, setCarImage] = useState('')

  const {car_id} = useParams()


  useEffect(()=>{
    setName(car && car.name)
    setCarModel(car && car.model)
    setYear(car && car.year)
    setPrice(car && car.price_per_day)
    setCarImage(car && car.car_image_url)
  })

  function handleSubmit(e){
    e.preventDefault()
    console.log( name, model, year, price_per_day, car_image_url)
    update_car( name, model, year, price_per_day, car_image_url)
    
    
    setName("")
    setCarModel("")
    setYear("")
    setPrice("")
    setCarImage("")
  }

 

  
  return (

    <div className='mt-10'>
      
    { currentUser && currentUser.is_carowner == "true" ?
    <div className='grid grid-cols-2 h-[80vh] mt-6'>
      <div className='flex align-center bg-slate-100justify-center'>
        <img className='h-[80vh] ' src='https://i.pinimg.com/736x/8a/a8/cc/8aa8ccc594b437f8b4e4ac363f0e0576.jpg'/>
        
      </div>
      <div className='p-6 '>
        <h1 className='text-center font-semibold text-2xl'>Update Car{car_id}</h1>
        
        <form onSubmit={handleSubmit} class="max-w-md mx-auto">
        <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car Name</label>
            <input value={name } onChange={(e)=> setName(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car Model</label>
            <input value={model} onChange={(e)=> setCarModel(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>

          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
            <input value={year} onChange={(e)=> setYear(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>

          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Url</label>
            <textarea value={car_image_url} onChange={(e)=> setCarImage(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required >
              </textarea>
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price Per Day</label>
            <input value={price_per_day} onChange={(e)=> setPrice(e.target.value)} type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Update Car
          </button>

        </form>



      </div>
    </div>
    :
    <div>
      <h1 className='text-3xl  text-center'>You are not authorized to view this page</h1>
    </div>
}

  </div>
  )
}