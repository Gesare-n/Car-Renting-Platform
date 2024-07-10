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

   const [events, setEvents] = useState([])





    // All your functions and state variables will be available to all the children components that are wrapped in the UserProvider
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
            console.log(res)
         if(res.success)
            {
                toast.success(res.success)
                nav("/dashboard")
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

   
    const register_for_an_event = (event_id) =>{
        fetch(`${server_url}/registrations`, {
            method: 'POST',
            body: JSON.stringify({
                event_id: event_id,
                
            }),
            headers: {
              'Content-type': 'application/json',
              "Authorization": `Bearer ${auth_token}`
            },
          })
        .then((response) => response.json())
        .then((res) =>{
            console.log(res)
         if(res.success)
            {
                toast.success(res.success)
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

  
    useEffect(()=>{
        if(auth_token)
        {
        fetch(`${server_url}/events`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${auth_token}`
            }})
            .then((response) => response.json())
            .then((res) =>{
                setEvents(res)
            });
        }
    }, [auth_token])


    const contextData ={
        add_car,
        events,
        register_for_an_event
    }
    return (
        <CarContext.Provider value={contextData}>
            {children}
        </CarContext.Provider>
    )
}