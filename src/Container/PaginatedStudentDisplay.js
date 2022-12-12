import {React,useEffect, useState,useContext} from 'react'
import StudentCard from '../Components/StudentCard';
import {Link,Navigate,useNavigate} from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Studentcontext from '../Context/Studentcontext';
import { ToastContainer } from 'react-toastify';
function PaginatedStudentDisplay() {
  const navigate=useNavigate();

    const urlStart = "http://localhost:8000";
    const [totalstudent,settotalstudent]=useState([])
    const [totalstudent2,settotalstudent2]=useState([])
    let k=useContext(Studentcontext)
    let [iteration,setiteration]=useState(1);
    // useEffect( () => {
    //     fetchStudent();
    //    }, [])
       useEffect( () => {
        if(localStorage.getItem('AUTH_TOKEN'))
        {
         fetchStudent();
        }
         
        }, [iteration])
        useEffect( () => {
          if(localStorage.getItem('AUTH_TOKEN'))
          {
          fetchActualStudent();
          }
          
         }, [])
       
       async function fetchStudent()
       {
         const response = await fetch(`${urlStart}/api/student/fetchqueryStudent?page=${iteration}`, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             "AUTH_TOKEN":localStorage.getItem('AUTH_TOKEN')
           },
         });
         let json = await response.json();
         console.log(json);
         settotalstudent(json.StudentAvailable);
         console.log(totalstudent);
         navigate({
          pathname:'/paginated',
          search:`?page=${iteration}`
         })
       }


       async function fetchActualStudent()
       {
        
         const response = await fetch(`${urlStart}/api/student/fetchAllStudent?city=${""}&classstudy=${""}&sectionstudy=${""}`, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             "AUTH_TOKEN":localStorage.getItem('AUTH_TOKEN')
           },
         });
         let json = await response.json();
         console.log(json);
         settotalstudent2(json.StudentAvailable);
         console.log(totalstudent2);
       }

       let loggedin = false;
       if (localStorage.getItem("AUTH_TOKEN")) {
         loggedin = true;
       }
       if(loggedin==true)
  return (
    <div>
      <ToastContainer/>
         <Navbar/>
        <br/>
        <Link to ='/addstudent'><button className='btn btn-danger mx-4'>Add Student</button></Link>
        <br/>
        <br/>
        <h3 className='mx-3'> Total Student Registered : {totalstudent2.length}</h3>
        <br/>
        <div className='d-flex  flex-wrap mx-3 justify-content-center' >
        <button className='btn btn-primary mx-3' onClick={()=>
        {
            if(iteration==1)
            {
              k.sendMessage("Reached the starting of List","warn","top-center")
            }
            else
            {
                setiteration(--iteration)
            }
            
        }}>-</button>


        <div>{iteration}/{Math.ceil(totalstudent2.length/4)}</div> &nbsp; &nbsp;
        <button className='btn btn-primary'  onClick={()=>
        {
            if(iteration==(Math.ceil(totalstudent2.length/4)))
            {
              k.sendMessage("Reached the end of List","warn","top-center")
            }
            else
            {
                setiteration(++iteration)
            }
            
        }}>+</button>
        </div>
        <div className='d-flex flex-wrap justify-content-center'>
            {totalstudent.map((element,index)=>
            { 
              // console.log(totalstudent[index])

                   return(
                        <StudentCard type="false" index={element.id} name={element.name}
                        email={element.email} address={element.address}
                        city={element.city} classstudy={element.classstudy}
                        sectionstudy={element.sectionstudy}
                        /> 
                   )
                
            })}
       
            </div>
    </div>
  )
  else{
    return <Navigate to="/login" />;
}
}

export default PaginatedStudentDisplay