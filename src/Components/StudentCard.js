import React,{useContext, useEffect,useState} from 'react'
import { Link, Navigate } from "react-router-dom";
import {  useNavigate } from "react-router-dom";
import Studentcontext from '../Context/Studentcontext';
function StudentCard(props) {
  const urlStart = "http://localhost:8000";
  let k=useContext(Studentcontext);
    return (
        <div class="card my-3" style={{"width": "18rem"}}>
        <div class="card-body">
          <h5 class="card-title">{props.name}</h5>
          <p class="card-title">Email: {props.email}</p>
        <p class="card-text">Address: {props.address}</p>
        <p class="card-text">City: {props.city}</p>
        <p class="card-text">Class Study: {props.classstudy}</p>
        <p class="card-text">Section Study: {props.sectionstudy}</p>

        {props.type=='true' && <>
        <Link to={`/particularstudent/${props.index}`}><button class="btn btn-primary">Update</button></Link>
         
          <button class="btn btn-danger mx-5"  onClick={async ()=>
                {
                    alert("Do you want to permanently delete this Teacher ?")
                    const response = await fetch(`${urlStart}/api/student/deleteStudent/${props.index}`, {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          "AUTH_TOKEN":localStorage.getItem('AUTH_TOKEN')
                        },
                      });
                    //   alert("Successfully Deleted");
                    k.sendMessage("User Deleted SuccessFully","success","top-right");
                    setTimeout(() => {
                        window.location.href='/student';
                    }, 1500);
                    


                }}>Delete</button></>}
          
        </div>
      </div>
      )
}

export default StudentCard