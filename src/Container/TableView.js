import { React, useEffect, useState } from 'react'
import StudentCard from '../Components/StudentCard';
import { Link, Navigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'



function TableView() {
    const urlStart = "http://localhost:8000";
    const [totalstudent, settotalstudent] = useState([])
    const [city, setcity] = useState("");
    const [classstudy, setclassstudy] = useState("");
    const [sectionstudy, setsectionstudy] = useState("")


    useEffect(() => {
        if(localStorage.getItem('AUTH_TOKEN'))
        {
        fetchStudent();
        }
    }, [])
    useEffect(() => {
        if(localStorage.getItem('AUTH_TOKEN'))
        {
        fetchStudent();
        }
    }, [totalstudent.length])


    async function fetchStudent() {
        const response = await fetch(`${urlStart}/api/student/fetchAllStudent?city=${city}&classstudy=${classstudy}&sectionstudy=${sectionstudy}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "AUTH_TOKEN": localStorage.getItem('AUTH_TOKEN')
            },
        });
        let json = await response.json();
        // console.log(json);
        settotalstudent(json.StudentAvailable);
        console.log(totalstudent);
    }
    let loggedin = false;
    if (localStorage.getItem("AUTH_TOKEN")) {
      loggedin = true;
    }
    if(loggedin==true)
    return (
        <div>

            <Navbar />
            <br />
            <Link to='/addstudent'><button className='btn btn-danger mx-4'>Add Student</button></Link>
            <br />
            <br />
            <div className='d-flex justify-content-between mx-3'>
                <h3> Total Student Registered : {totalstudent.length}</h3> &nbsp;
                {/* For City */}
                <select name="classstudy" id="select_city" value={city} onChange={(e) => {
                    setcity(e.target.value)
                    
                }}
                style={{  "background": "#C4C4C4BD",
                "width": "8%",
                "height": "65%",
                "padding": "0.8%",
                "border-radius": "5px"}}>
                    <option value="">--City--</option>
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
                }}
                style={{  "background": "#C4C4C4BD",
                "width": "8%",
                "height": "65%",
                "padding": "0.8%",
                "border-radius": "5px"}}>
                    <option value="">--Class--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>

                {/* For Section */}
                <select name="sectionStudy" id="select_section" value={sectionstudy} onChange={(e) => {
                    setsectionstudy(e.target.value)
                }}
                style={{  "background": "#C4C4C4BD",
                "width": "8%",
                "height": "65%",
                "padding": "0.8%",
                "border-radius": "5px"}}>
                    <option value="">--Section--</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>

            </div>
            <br />
            <div className='d-flex  flex-wrap mx-5 table-responsive' >
                <table class="table table-striped table-hover">
                    <caption>List of Students</caption>
                    <thead className='table-dark'>
                        <tr >
                <th> S.No</th><th> Id </th><th> Name </th><th> Email </th><th> Address </th><th> City </th><th> Class Study</th><th> Section Study</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            totalstudent.map((element, key) => {
                                if (city != "" && classstudy != "" && sectionstudy != "" && (city == element.city && classstudy == element.classstudy && sectionstudy == element.sectionstudy)) {
                                    return (
                                        <tr>
                                            <td> {key + 1}</td>
                                            <td> {element._id}</td>
                                            <td> {element.name}</td>
                                            <td> {element.email} </td>
                                            <td> {element.address} </td>
                                            <td> {element.city} </td>
                                            <td> {element.classstudy}</td>
                                            <td> {element.sectionstudy}</td>
                                        </tr>
                                    )
                                }
                                else if (city == "" && classstudy != "" && sectionstudy != "" && (classstudy == element.classstudy && sectionstudy == element.sectionstudy)) {
                                    return (
                                        <tr>
                                            <td> {key + 1}</td>
                                            <td> {element._id}</td>
                                            <td> {element.name}</td>
                                            <td> {element.email} </td>
                                            <td> {element.address} </td>
                                            <td> {element.city} </td>
                                            <td> {element.classstudy}</td>
                                            <td> {element.sectionstudy}</td>
                                        </tr>
                                    )
                                }
                                else if (city != "" && classstudy == "" && sectionstudy != "" && (city == element.city && sectionstudy == element.sectionstudy)) {
                                    return (
                                        <tr>
                                            <td> {key + 1}</td>
                                            <td> {element._id}</td>
                                            <td> {element.name}</td>
                                            <td> {element.email} </td>
                                            <td> {element.address} </td>
                                            <td> {element.city} </td>
                                            <td> {element.classstudy}</td>
                                            <td> {element.sectionstudy}</td>
                                        </tr>
                                    )
                                }
                                else if (city != "" && classstudy != "" && sectionstudy == "" && (city == element.city && classstudy == element.classstudy)) {
                                    return (<tr>
                                        <td> {key + 1}</td>
                                        <td> {element._id}</td>
                                        <td> {element.name}</td>
                                        <td> {element.email} </td>
                                        <td> {element.address} </td>
                                        <td> {element.city} </td>
                                        <td> {element.classstudy}</td>
                                        <td> {element.sectionstudy}</td>
                                    </tr>
                                    )

                                }
                                else if (city != "" && classstudy == "" && sectionstudy == "" && (city == element.city)) {
                                    return (<tr>
                                        <td> {key + 1}</td>
                                        <td> {element._id}</td>
                                        <td> {element.name}</td>
                                        <td> {element.email} </td>
                                        <td> {element.address} </td>
                                        <td> {element.city} </td>
                                        <td> {element.classstudy}</td>
                                        <td> {element.sectionstudy}</td>
                                    </tr>
                                    )
                                }
                                else if (city == "" && classstudy != "" && sectionstudy == "" && (classstudy == element.classstudy)) {
                                    return (<tr>
                                        <td> {key + 1}</td>
                                        <td> {element._id}</td>
                                        <td> {element.name}</td>
                                        <td> {element.email} </td>
                                        <td> {element.address} </td>
                                        <td> {element.city} </td>
                                        <td> {element.classstudy}</td>
                                        <td> {element.sectionstudy}</td>
                                    </tr>
                                    )
                                }
                                else if (city == "" && classstudy == "" && sectionstudy != "" && (sectionstudy == element.sectionstudy)) {
                                    return (<tr>
                                        <td> {key + 1}</td>
                                        <td> {element._id}</td>
                                        <td> {element.name}</td>
                                        <td> {element.email} </td>
                                        <td> {element.address} </td>
                                        <td> {element.city} </td>
                                        <td> {element.classstudy}</td>
                                        <td> {element.sectionstudy}</td>
                                    </tr>
                                    )
                                }
                                else if (city == "" && classstudy == "" && sectionstudy == "") {
                                    return (<tr>
                                        <td> {key + 1}</td>
                                        <td> {element._id}</td>
                                        <td> {element.name}</td>
                                        <td> {element.email} </td>
                                        <td> {element.address} </td>
                                        <td> {element.city} </td>
                                        <td> {element.classstudy}</td>
                                        <td> {element.sectionstudy}</td>
                                    </tr>
                                    )
                                }
                            })}
                    </tbody>
                </table>


            </div>
        </div>
    )
    else{
        return <Navigate to="/login" />;
    }
}

export default TableView