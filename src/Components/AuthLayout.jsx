// its a mechnasim to protect  the website from DDOS attacks in simple word it is a protector

import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({children, authentication=true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    

    useEffect(()=>{

        // Complexity included

        //TODO: make it more easy to understand its basically logic-1
        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        // logic 2

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)

    },[authStatus, navigate, authentication])
  return loader ? <h1>Loading...</h1> : <>{children}</>
}