import React, { useState } from 'react';
import BookNotification from './BookNotification'; // Import the BookNotification component

function RentCarForm({ selectedCar, closeModal }) {
  const [rentalDetails, setRentalDetails] = useState({
    startDate: '',
    endDate: '',
    paymentMethod: '',
    amount: '',
    phoneNumber: '',
    emailAddress: '',
  });
  const [step, setStep] = useState(1); // Track form steps: 1 - Rental details, 2 - Payment details
  const [isBooked, setIsBooked] = useState(false); // State for notification
  const [showForm, setShowForm] = useState(true); // State to control form visibility

  // Function to convert USD amount to KES
  const convertToKES = (amountUSD) => {
    // Example conversion rate (you can fetch the actual rate from an API or use a more accurate value)
    const conversionRate = 112; // 1 USD = 112 KES (example rate)
    return amountUSD * conversionRate;
  };

  // Function to handle submission of rental details
  const handleSubmitRentalDetails = (e) => {
    e.preventDefault();
    // Validate rental details here if needed
    setStep(2); // Move to payment details step
  };

  // Function to handle submission of payment details
  const handleSubmitPaymentDetails = (e) => {
    e.preventDefault();
    // Validate payment details here if needed

    // Convert amount to KES if payment method is selected and amount is provided
    let amountKES = rentalDetails.amount;
    if (rentalDetails.paymentMethod === 'M-Pesa' || rentalDetails.paymentMethod === 'PayPal') {
      amountKES = convertToKES(rentalDetails.amount);
    }

    console.log('Rental Details:', {
      ...rentalDetails,
      amountKES: amountKES,
    });

    // Implement logic to submit rental and payment details to backend
    setIsBooked(true); // Show notification after form submission
    setShowForm(false); // Hide form after booking
  };

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    setRentalDetails({
      ...rentalDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to go back to rental details step
  const backToRentalDetails = () => {
    setStep(1); // Go back to rental details step
  };

  const closeNotification = () => {
    setIsBooked(false); // Hide notification
    closeModal(); // Close modal after form submission
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-8 rounded-lg shadow-lg'>
        {/* Car Image */}
        <img src={selectedCar.car_image_url} alt={selectedCar.name} className='rounded-lg mb-4' />
        {/* Car Name */}
        <h2 className='text-xl font-bold'>{selectedCar.name}</h2>

        {showForm && step === 1 && (
          <form onSubmit={handleSubmitRentalDetails} className='space-y-4'>
            <label className='block'>
              Start Date
              <input
                type='date'
                name='startDate'
                value={rentalDetails.startDate}
                onChange={handleChange}
                className='border p-2 rounded-md w-full'
                required
              />
            </label>

            <label className='block'>
              End Date
              <input
                type='date'
                name='endDate'
                value={rentalDetails.endDate}
                onChange={handleChange}
                className='border p-2 rounded-md w-full'
                required
              />
            </label>

            <label className='block'>
              Amount to Pay ($)
              <input
                type='number'
                name='amount'
                value={rentalDetails.amount}
                onChange={handleChange}
                className='border p-2 rounded-md w-full'
                required
              />
            </label>

            <div className='flex justify-between'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none'
              >
                Next
              </button>
              <button
                type='button'
                onClick={closeModal}
                className='ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md focus:outline-none'
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {showForm && step === 2 && (
          <form onSubmit={handleSubmitPaymentDetails} className='space-y-4'>
            <label className='block'>
              Payment Method
              <select
                name='paymentMethod'
                value={rentalDetails.paymentMethod}
                onChange={handleChange}
                className='border p-2 rounded-md w-full'
                required
              >
                <option value=''>Select Payment Method</option>
                <option value='M-Pesa'>M-Pesa</option>
                <option value='PayPal'>PayPal</option>
              </select>
            </label>

            {rentalDetails.paymentMethod === 'M-Pesa' && (
              <label className='block'>
                Phone Number
                <input
                  type='text'
                  name='phoneNumber'
                  value={rentalDetails.phoneNumber}
                  onChange={handleChange}
                  className='border p-2 rounded-md w-full'
                  required
                />
              </label>
            )}

            {rentalDetails.paymentMethod === 'PayPal' && (
              <label className='block'>
                Email Address
                <input
                  type='email'
                  name='emailAddress'
                  value={rentalDetails.emailAddress}
                  onChange={handleChange}
                  className='border p-2 rounded-md w-full'
                  required
                />
              </label>
            )}

            <label className='block'>
              Amount to Pay (KES)
              <input
                type='text'
                name='amountKES'
                value={convertToKES(rentalDetails.amount)}
                className='border p-2 rounded-md w-full bg-gray-100'
                readOnly
              />
            </label>

            <div className='flex justify-between'>
              <button
                type='button'
                onClick={backToRentalDetails}
                className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md focus:outline-none'
              >
                Back
              </button>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none'
              >
                Rent Car
              </button>
              <button
                type='button'
                onClick={closeModal}
                className='ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md focus:outline-none'
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {isBooked && (
          <BookNotification
            message='Booked successfully!'
            onClose={closeNotification}
          />
        )}
      </div>
    </div>
  );
}

export default RentCarForm;
