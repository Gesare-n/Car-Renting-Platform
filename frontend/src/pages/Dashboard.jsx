import React, { useContext } from 'react'
import { CarContext } from '../context/CarContext'
import { UserContext } from '../context/UserContext'

function Dashboard() 
{
  const {currentUser} = useContext(UserContext)
  
  const {cars, add_car} = useContext(CarContext)

  console.log(cars)

 

  return (
<div className='py-8'>
  {currentUser && currentUser.email?
  <div>
  <h1 className='text-3xl m-6 '>AVAILABLE CARS {cars && cars.length}</h1>
    <div className='grid grid-cols-2 md:grid-cols-3 xxl:grid-cols-4 gap-4 p-4'>
      {
        cars && cars?.map((car, index) => (
          <div  className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark">
          <a href="#!">
            <img
              className="rounded-t-lg"
              src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
              alt="" />
          </a>
          <div className="p-6 text-surface dark:text-white">
            <h5 className="mb-2 text-xl font-medium leading-tight">{car && car.model     }</h5>
            <p className="mb-4 text-base">
               {car && car.make   }
            </p>

            <div>
              <span className="my-1 grid grid-cols-2 text-sm  uppercase">
                <span className='font-semibold'>Event Date: </span>
                <span>{car && car.price}</span>
              </span>
              <span className="my-1 grid grid-cols-2 text-xs  uppercase">
                <span className='font-semibold'>Event Location: </span>
                <span>{car && car.year}</span>
              </span>
            </div>
            <button
              type="button" onClick = {()=> register_for_an_event(car.id)}
              className="inline-block rounded bg-green-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
             >
              RBook this car
            </button>
          </div>
        </div>


        ))
      }
    </div>
    </div>
    :
    <span>Relogin to view this pages</span>}
</div>  
  )
}

export default Dashboard