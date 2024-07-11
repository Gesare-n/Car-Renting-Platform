import React, { useContext, useState } from 'react';
import { CarContext } from '../context/CarContext';
import { UserContext } from '../context/UserContext';

function Dashboard() {
  const { currentUser } = useContext(UserContext);
  const { cars } = useContext(CarContext);

  // Initialize state for booked cars and car status
  const [bookedCars, setBookedCars] = useState({});
  const [carStatus, setCarStatus] = useState({});

  // Function to handle booking a car
  const handleBookCar = (carId) => {
    setBookedCars((prevBookedCars) => ({
      ...prevBookedCars,
      [carId]: true,
    }));
  };

  // Function to handle updating car status
  const handleUpdateCarStatus = (car) => {
    const enteredCarId = prompt('Please enter the car ID:');
    if (enteredCarId === car.id.toString()) {
      setCarStatus((prevCarStatus) => ({
        ...prevCarStatus,
        [car.id]: 'Unavailable', // Update as needed (e.g., 'Unavailable', 'In Service')
      }));
      alert('Car status updated successfully.');
    } else {
      alert('Incorrect car ID. Please try again.');
    }
  };

  console.log('Current User:', currentUser);
  console.log('Cars:', cars);
  console.log('Booked Cars:', bookedCars);
  console.log('Car Status:', carStatus);

  return (
    <div className='py-8'>
      {currentUser && currentUser.email ? (
        <div>
          <h1 className='text-2xl m-6 text-center'>
            AVAILABLE CARS {cars && cars.length}
          </h1>
          <div className='grid grid-cols-2 md:grid-cols-3 xxl:grid-cols-4 gap-4 p-4'>
            {cars && cars.length > 0 ? (
              cars.map((car, index) => (
                <div
                  key={index}
                  className='block rounded-lg bg-white md:min-h-[40vh] shadow-secondary-1 dark:bg-surface-dark'
                >
                  <a href='#!'>
                    <img
                      className='rounded-t-lg'
                      src={car.car_image_url}
                      alt={car.name}
                    />
                  </a>
                  <div className='p-6 text-surface dark:text-white'>
                    <h5 className='mb-2 text-xl font-medium leading-tight'>
                      {car.name}
                    </h5>
                    <p className='mb-4 text-base'>{car.model}</p>
                    <div>
                      <span className='my-1 grid grid-cols-2 text-sm uppercase'>
                        <span className='font-semibold'>Year: </span>
                        <span>{car.year}</span>
                      </span>
                      <span className='my-1 grid grid-cols-2 text-xs uppercase'>
                        <span className='font-semibold'>Price: </span>
                        <span>{car.price_per_day}</span>
                      </span>
                    </div>
                    <button
                      type='button'
                      onClick={() => handleBookCar(car.id)}
                      className='inline-block rounded bg-blue-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong'
                    >
                      {bookedCars[car.id] ? 'Booked' : 'Book this car'}
                    </button>
                    <button
                      type='button'
                      onClick={() => handleUpdateCarStatus(car)}
                      className='inline-block rounded bg-red-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong ml-2'
                    >
                      {carStatus[car.id] === 'Unavailable' ? 'Unavailable' : 'Update Status'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No cars available</p>
            )}
          </div>
        </div>
      ) : (
        <span>Relogin to view this page</span>
      )}
    </div>
  );
}

export default Dashboard;
