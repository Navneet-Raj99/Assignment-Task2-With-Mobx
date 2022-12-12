import { React, useEffect, useState,useContext } from 'react'
import StudentCard from '../Components/StudentCard';
import { Link,Navigate,useNavigate } from 'react-router-dom'
import Studentcontext from '../Context/Studentcontext';
import Navbar from '../Components/Navbar'
import { ToastContainer } from 'react-toastify';


function StudentDisplay() {
    const navigate=useNavigate();

    const urlStart = "http://localhost:8000";
    let k=useContext(Studentcontext);
    const [totalstudent, settotalstudent] = useState([])
    let [iteration, setiteration] = useState(0);
    const [city, setcity] = useState("");
    const [classstudy, setclassstudy] = useState("");
    const [sectionstudy, setsectionstudy] = useState("")

 
    useEffect(() => {
        if(localStorage.getItem('AUTH_TOKEN'))
        {
            fetchStudent();
        }
       
    }, [city,classstudy,sectionstudy])

    async function fetchStudent() {
        const response = await fetch(`${urlStart}/api/student/fetchAllStudent?city=${city}&classstudy=${classstudy}&sectionstudy=${sectionstudy}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "AUTH_TOKEN": localStorage.getItem('AUTH_TOKEN')
            },
        });
        let json = await response.json();
        console.log(json);
        settotalstudent(json.StudentAvailable);
        console.log(totalstudent);
    
        navigate({
            pathname:'/student',
            search:`?city=${city}&classstudy=${classstudy}&sectionstudy=${sectionstudy}`
           })
    }
    let loggedin = false;
    if (localStorage.getItem("AUTH_TOKEN")) {
      loggedin = true;
    }
    if(loggedin==true)
    return (
        
        <div>
            <ToastContainer/>
            <Navbar />
            <br />
            <Link to='/addstudent'><button className='btn btn-danger mx-4'>Add Student</button></Link>
            <br />
            <br />
            <div className='d-flex justify-content-between mx-2'>
                <h3 className='mx-3'> Total Student Registered : {totalstudent.length}</h3> &nbsp;
                {/* For City */}
                <select name="classstudy" id="select_city" value={city} onChange={(e) => {
                    
                    setcity(e.target.value)
                  
                 
                }}
                style={{  "background": "#C4C4C4BD",
                "width": "8%",
                "height": "65%",
                "padding": "0.8%",
                "border-radius": "5px"}}>
                    <option value="">-City-</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Agra">Agra</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Bokaro">Bokaro</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Darbhanga">Darbhanga</option>
                    <option value="Faridabad">Faridabad</option>
                    <option value="FatehPur Sikri">FatehPur Sikri</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Gurdaspur">Gurdaspur</option>
                </select>
                {/* For Class */}
                <select name="classstudy" id="select_class" value={classstudy} onChange={(e) => {
                    setclassstudy(e.target.value)
                }} style={{  "background": "#C4C4C4BD",
                "width": "8%",
                "height": "65%",
                "padding": "0.8%",
                "border-radius": "5px"}}>
                    <option value="">-Class-</option> <option value="1">1</option> <option value="2">2</option>
                    <option value="3">3</option><option value="4">4</option> <option value="5">5</option>
                    <option value="6">6</option><option value="7">7</option><option value="8">8</option>
                    <option value="9">9</option><option value="10">10</option><option value="11">11</option>
                    <option value="12">12</option>
                </select>

                {/* For Section */}
                <select name="sectionStudy" id="select_section" value={sectionstudy} onChange={(e) => {
                    setsectionstudy(e.target.value)
                }} style={{  "background": "#C4C4C4BD",
                "width": "9%",
                "height": "65%",
                "padding": "0.8%",
                "border-radius": "5px"}}>
                    <option value="">-Section-</option>
                    <option value="A">A</option><option value="B">B</option><option value="C">C</option>
                    <option value="D">D</option>
                </select>

            </div>

            <br />
            <div className='d-flex  flex-wrap justify-content-center mx-3'>

                {
                    totalstudent.map((element, key) => {
                        // if (city != "" && classstudy != "" && sectionstudy != "" && (city == element.city && classstudy == element.classstudy && sectionstudy == element.sectionstudy))
                            return (
                                <StudentCard type="true" index={element._id} name={element.name} email={element.email} address={element.address} city={element.city} classstudy={element.classstudy}
                                sectionstudy={element.sectionstudy}/>
                            )
                        // add here


                    })
                }
            </div>
        </div>
    )
    else{
        return <Navigate to="/login" />;
    }
}

export default StudentDisplay

















// else if (city == "" && classstudy != "" && sectionstudy != "" && (classstudy == element.classstudy && sectionstudy == element.sectionstudy)) {
                        //     return (
                        //         <StudentCard index={element._id} name={element.name} email={element.email} address={element.address} city={element.city} classstudy={element.classstudy}
                        //         sectionstudy={element.sectionstudy}/>
                        //     )
                        // }
                        // else if (city != "" && classstudy == "" && sectionstudy != "" && (city == element.city && sectionstudy == element.sectionstudy)) {
                        //     return (
                        //         <StudentCard index={element._id} name={element.name} email={element.email} address={element.address} city={element.city} classstudy={element.classstudy}
                        //         sectionstudy={element.sectionstudy}/>
                        //     )
                        // }
                        // else if (city != "" && classstudy != "" && sectionstudy == "" && (city == element.city && classstudy == element.classstudy)) {
                        //     return (
                        //         <StudentCard index={element._id} name={element.name} email={element.email} address={element.address} city={element.city} classstudy={element.classstudy}
                        //         sectionstudy={element.sectionstudy}/>
                        //     )
                        // }
                        // else if (city != "" && classstudy == "" && sectionstudy == "" && (city == element.city)) {
                        //     return (
                        //         <StudentCard index={element._id} name={element.name} email={element.email} address={element.address} city={element.city} classstudy={element.classstudy}
                        //         sectionstudy={element.sectionstudy}/>
                        //     )
                        // }
                        // else if (city == "" && classstudy != "" && sectionstudy == "" && (classstudy == element.classstudy)) {
                        //     return (
                        //         <StudentCard index={element._id} name={element.name} email={element.email} address={element.address} city={element.city} classstudy={element.classstudy}
                        //         sectionstudy={element.sectionstudy}/>
                        //     )
                        // }
                        // else if (city == "" && classstudy == "" && sectionstudy != "" && (sectionstudy == element.sectionstudy)) {
                        //     return (
                        //         <StudentCard index={element._id} name={element.name} email={element.email} address={element.address} city={element.city} classstudy={element.classstudy}
                        //         sectionstudy={element.sectionstudy}/>
                        //     )
                        // } else if(city == "" && classstudy == "" && sectionstudy == "") {
                        //     return (
                        //         <StudentCard index={element._id} name={element.name} email={element.email} address={element.address} city={element.city} classstudy={element.classstudy}
                        //             sectionstudy={element.sectionstudy}/>
                        //     )
                        // }