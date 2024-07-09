import React from 'react'

export default function About() {
  return (
    <div className='container h-[100vh] mx-auto'>
    <h1 className='text-xl text-center my-2 underline font-semibold'>About Us</h1>
    <div className='grid grid-cols-1  md:grid-cols-2'>
      <div>
        <img className='rounded-md' src = "https://i.pinimg.com/564x/2e/c3/6f/2ec36f0c3c27c034a861530eef1b9a1f.jpg" alt="about image"/>
      </div>
      <div className=' justify-center text-center pt-12'>         
         
            <h1 className='font-semibold italic'>Contact</h1>
            <p className='italic'>carhire.com</p>
            <p>+123.456.7560</p><br/>
            <h1 className='text-5xl'>about</h1>
            <p className=''>I'm here to help you through every step of the way.
              I'll work with you to ensure the home buying or renting process
              is seamless and successful. Contact me today to schedule your
              free phone consultation.
            </p><br/><br/>

            <h3 className='text-2xl'>Johny Sins</h3>
      

       

      </div>
    </div>
  </div>
  )
}
