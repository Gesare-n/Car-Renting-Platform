import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


export const UserContext = createContext()

export const UserProvider = ({ children }) => 
{
    const nav = useNavigate()

    const [currentUser, setCurrentUser] = useState()
    const [onChange, setOnChange ] = useState(false)
    const [auth_token, setAuth_token] = useState( ()=> localStorage.getItem("access_token")? localStorage.getItem("access_token"): null )



    
   //    REGISTER USER
    const register_user = (name,email, profile_image, phone_number, is_carowner, password) =>{
        
        fetch("http://localhost:5000/users", {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                profile_image: profile_image,
                password: password,
                phone_number: phone_number,
                is_carowner: is_carowner
            }),
            headers: {
              'Content-type': 'application/json',
            },
          })
        .then((response) => response.json())
        .then((res) =>{
         if(res.success)
            {
                toast.success(res.success)
                nav("/login")
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

       //    Login USER
       const login_user = (email, password) =>{
        fetch("http://localhost:5000/login", {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
              'Content-type': 'application/json',
            },
          })
        .then((response) => response.json())
        .then((res) =>{
            // console.log(res)
         if(res.access_token)
            {
                setAuth_token(res.access_token)
                localStorage.setItem("access_token", res.access_token)

                toast.success("Logged in Successfully!")
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


       //    Update USER
       const update_user = (name, profile_image,phone_number, password) =>{
        fetch("http://localhost:5000/users", {
            method: 'PUT',
            body: JSON.stringify({
                name: name,
                password: password,
                phone_number: phone_number,
                profile_image: profile_image
            }),
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${auth_token}`
            },
          })
        .then((response) => response.json())
        .then((res) =>{
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

    // Logout
    const logout = () =>{
        fetch("http://localhost:5000/logout", {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${auth_token}`
            },
          })
        .then((response) => response.json())
        .then((res) =>{
         if(res.success)
            {
                localStorage.removeItem("access_token")
                setCurrentUser(null)
                setAuth_token(null)
                setOnChange(!onChange)
                nav("/login")
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
        if(auth_token){
                fetch("http://localhost:5000/current_user", {
                    headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`
                    } })
                .then((res)=>res.json())
                .then((data)=>{

                    if(data.email){
                        setCurrentUser(data)
                    }
                    else{
                        localStorage.removeItem("access_token")
                        setCurrentUser(null)
                        setAuth_token(null)
                        nav("/login")
                    }
                
                })
            }

  },[auth_token, onChange])

    const contextData ={
        auth_token, 
        currentUser,
        setCurrentUser,
        register_user,
        login_user,
        update_user,
        logout

    }
    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )
}