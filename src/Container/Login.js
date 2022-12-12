import React, { useState,useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { Link, Navigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from '../Stores/Storecontext';
import Studentcontext from '../Context/Studentcontext';
import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
function Login() {
  const { authStore } = useContext(StoreContext)
  let k=useContext(Studentcontext);
  // const authenticated=authStore.isAuthenticated();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const urlStart = "http://localhost:8000";
  const [secondloggedin, setsecondloggedin] = useState();
let personname;
//  useEffect( () => {
//   setsecondloggedin(authStore.isAuthenticated)
//  }, [])
 
  // let loggedin = false;
  // if (localStorage.getItem("AUTH_TOKEN")) {
  //   loggedin = true;
  // }
  // if(authStore.isAuthTokenAvailable()==false && secondloggedin==false)
  // { 
  //   k.sendMessage("Incorrect Password","error","top-right")
      

  // }
  if (authStore.isAuthTokenAvailable() == false) {
    
    return (
      <>
      <ToastContainer/>
        <Navbar/>
        {/* <Navigate to="/home"/>: */}
        <div className="container my-5">
          <h1>Login Credentials</h1>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              class="form-control"
              id="exampleInputPassword1"
              onChange={(e) => {
                // console.log(e.target.value);
                setpassword(e.target.value);
              }}
            />
          </div>
          <button class="btn btn-primary" onClick=
          {async ()=>
          {
            if(!email || !password)
            {
              k.sendMessage("Fill Details Completely","error","top-right")
              return
            }
            setsecondloggedin(await authStore.login(email,password))
            // console.log("hhoal",secondloggedin)
            if(authStore.isAuthTokenAvailable() == false)
            {
              k.sendMessage("Check Your Email, Password Or Both","error","top-right")
            }
            else
            {
              k.sendMessage("Login Succesful","success","top-right")
            }
            
          }}
          // {clickbutton}
          >
            Submit
          </button>
        </div>
      </>
    );
  } else {
    
      return <Navigate to="/student?city=&classstudy=&sectionstudy=" />;
    
   
  }
}

export default Login;






// async function clickbutton(e) {
//   try {
//       e.preventDefault();
//       const response = await fetch(`${urlStart}/api/auth/checkuser`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       let json = await response.json();
//       personname=json.Name
//       console.log(json);
     
  
//       if (json.AUTH_TOKEN == undefined) {
//         return;
//       }
//       localStorage.setItem("AUTH_TOKEN", json.AUTH_TOKEN);
//       setsecondloggedin(true);
   
//   } catch (error) {
//       console.log(error)
//   }
 
// }