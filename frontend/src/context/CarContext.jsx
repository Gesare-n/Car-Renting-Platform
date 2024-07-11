import { createContext, useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import { server_url } from "../../config"

export const CarContext = createContext()

export const CarProvider = ({ children }) => 
{
   const nav = useNavigate()
   const {auth_token} = useContext(UserContext)

   const [cars, setCars] = useState([])
 //fetch available cars
   useEffect(()=>{
       fetch("http://localhost:5000/cars", {
           headers: {
             'Content-type': 'application/json',
             "Authorization": `Bearer ${auth_token}`
           },
         })
       .then((response) => response.json())
       .then((res) => {
          setCars(res)
       });
   }, [auth_token])


      
  //  const update_car = (id, car_model, year, availability_status, price, car_image_url) => {
  //      fetch(`http://localhost:5000/cars/${id}`, {
  //          method: 'PUT',
  //          body: JSON.stringify({
  //              car_model, year, availability_status, price, car_image_  

    
    const add_car = (car_model, year, availability_status, price, car_image_url) =>{
        fetch("http://localhost:5000/cars", {
            method: 'POST',
            body: JSON.stringify({
                car_model, year, availability_status, price, car_image_url
                
            }),
            headers: {
              'Content-type': 'application/json',
              "Authorization": `Bearer ${auth_token}`
            },
          })
        .then((response) => response.json())
        .then((res) =>{
            console.log("hey", res)
         if(res.success)
            {
                toast.success(res.success)
                nav("/")
            }
            else if(res.error)
            {
                toast.error(res.error)
            }
            else {
                toast.error("An error occured")
            }

        });
    
    } 

    const contextData ={
        add_car,
        cars,
        
    }
    return(
        <CarContext.Provider value={contextData}>
            {children}
        </CarContext.Provider>
    )
}