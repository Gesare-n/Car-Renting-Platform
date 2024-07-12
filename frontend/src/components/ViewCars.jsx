import React, { useState, useEffect } from 'react';
import RentCarForm from './RentCarForm';

export default function ViewCars() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null); // State to track selected car for booking
  const [showRentForm, setShowRentForm] = useState(false); // State to control visibility of rent form

  useEffect(() => {
    // Fetch cars data from your backend API
    fetchCars();
  }, []);

  // Function to fetch cars data
  const fetchCars = async () => {
    try {
      const response = await fetch('http://your-backend-api-url/cars');
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data = await response.json();
      setCars(data); // Set cars state with fetched data
    } catch (error) {
      console.error('Error fetching cars:', error);
      // Handle error (show message, retry option, etc.)
    }
  };

  // Function to handle selecting a car for booking
  const handleRentCar = (car) => {
    setSelectedCar(car); // Set selected car state
    setShowRentForm(true); // Show rent form
  };

  // Function to handle closing the rent form modal
  const closeModal = () => {
    setShowRentForm(false); // Hide rent form
    setSelectedCar(null); // Reset selected car state
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>View Cars</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {cars.map((car) => (
          <div
            key={car.id}
            className='bg-white p-4 rounded-lg shadow-md flex flex-col items-center'
          >
            <img
              src={car.car_image_url}
              alt={car.name}
              className='w-full h-48 object-cover rounded-lg mb-4'
            />
            <h2 className='text-lg font-semibold mb-2'>{car.name}</h2>
            <p className='text-gray-600'>Model: {car.model}</p>
            <p className='text-gray-600'>Year: {car.year}</p>
            <p className='text-gray-600'>Price: ${car.price}</p>
            <button
              className='mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
              onClick={() => handleRentCar(car)} // Call handleRentCar function when Rent Car button is clicked
            >
              Rent Car
            </button>
          </div>
        ))}
      </div>

      {/* Render RentCarForm modal if a car is selected for booking */}
      {showRentForm && (
        <RentCarForm selectedCar={selectedCar} closeModal={closeModal} />
      )}
    </div>
  );
}
