import React from 'react'
import { useState } from "react";
import Studentcontext from './Studentcontext';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Studentstate(props) {
    const[name,setname]=useState("");
    const urlStart = "http://localhost:8000";
   async function fetchUserName()
    {
        const response = await fetch(`${urlStart}/api/auth/getuserdetails`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "AUTH_TOKEN":localStorage.getItem('AUTH_TOKEN')
            },
          });
         let data = await response.json();
         setname(data.name)
    }
function sendMessage(text,type,position)
{
    console.log(text,"  ",position,"  ",type)
   if(type==="error")
   {
          toast.error(text, {
        position: position,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        })
    }
    else if(type==="success")
    {
        toast.success(text, {
            position: position,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
            })
    }
    else if(type==="warn")
    {
      toast.warn(text, {
        position: position,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        })
    }
    else if(type==="info")
    {
      toast.warn(text, {
        position: position,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        })
    }
    
}
    return (
        <Studentcontext.Provider
          value={{
            fetchUserName:fetchUserName,
            sendMessage:sendMessage,
            name:name
          }}
        >
          {props.children}
        </Studentcontext.Provider>
      );
}

export default Studentstate