import React,{useContext,useEffect,useState} from 'react'
import { useParams, Link ,Navigate} from "react-router-dom";
import {ToastContainer } from 'react-toastify';
import {  useNavigate } from "react-router-dom";
import Studentcontext from '../Context/Studentcontext';
function AddStudent() {
    let k=useContext(Studentcontext)
    const urlStart = "http://localhost:8000";
    const [name, setname] = useState("")
    const [email,setemail]=useState("");
    const [address, setaddress] = useState("")
    const [city, setcity] = useState("")
    const[classstudy, setclassstudy]=useState('');
    const [sectionstudy,setsectionstudy]=useState("")
    const navigate = useNavigate();
    async function registerstudent()
    {


        if(!name || !email || !address || !city || !classstudy || !sectionstudy)
        {
            k.sendMessage("Fill the form Completely","error","bottom-center")
            return;
        }
        if(classstudy<1 || classstudy>12)
        {
            k.sendMessage("Fill the Class properly","error","bottom-center")
            return;
        }
        if(sectionstudy!="A" && sectionstudy!="B" &&sectionstudy!="C" &&sectionstudy!="D" )
        {
            k.sendMessage("Fill the Section Properly","error","bottom-center")
            return;
        }
     
        try{
            const response = await fetch(`${urlStart}/api/student/addStudent`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "AUTH_TOKEN":localStorage.getItem('AUTH_TOKEN')
                },
                body: JSON.stringify({ name,email,address,city,classstudy,sectionstudy }),
              });
              let data=await response.json()
              console.log(data.Message)
              if(data.Message=="This Email is already Used")
              {
                k.sendMessage("Email Id Already Exist","warn","top-right")
                return
              }

            //   window.location.href='/student'
            k.sendMessage("Student Added Succesfully","success","top-center")
            setTimeout(() => {
                navigate('/student');
            }, 1500);
            
        }catch(err){
            k.sendMessage("Fill the form Completely","error","bottom-center")
            return
        }
    }
    let loggedin = false;
    if (localStorage.getItem("AUTH_TOKEN")) {
      loggedin = true;
    }
    if(loggedin==true)
  return (
    <div id="exampleModal" tabindex="-1" aria-hidden="true">
    <ToastContainer/>
    <h1> Dashboard</h1>
    <div class="modal-body">
        <p>Name: <input type="text" value={name} onChange={(e)=>
        {
                let demo=e.target.value;
                setname(demo);
        }}/></p>
         <p>Email: <input type="text" value={email} onChange={(e)=>
        {
                let demo=e.target.value;
                setemail(demo);
        }}/></p>
        <p>Address: <input type="text" value={address} onChange={(e)=>
        {
                let demo=e.target.value;
                setaddress(demo);
        }}  /></p>
        <p>City: &nbsp; 

        <select name="classstudy" id="select_city" value={city} onChange={(e)=>
        {
            setcity(e.target.value)
        }}>
		<option selected hidden value="">--Please choose a City--</option>
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

        </p>
        <p>Class Study : &nbsp;
        <select name="classstudy" id="select_class" value={classstudy} onChange={(e)=>
        {
            setclassstudy(e.target.value)
        }}>
		<option selected hidden value="">--Please choose a Class--</option>
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

        </p>
        <p>Section Study : &nbsp;
        <select name="sectionStudy" id="select_section" value={sectionstudy} onChange={(e)=>
        {
            setsectionstudy(e.target.value)
        }}>
		<option selected hidden value="">--Please choose a Section--</option>
		<option value="A">A</option>
		<option value="B">B</option>
		<option value="C">C</option>
		<option value="D">D</option>
	</select> 
            </p>
    </div>
    <div class="modal-footer">
        <Link to='/student'><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></Link>
        <button type="button" class="btn btn-primary" onClick={registerstudent}>Add Student</button>
    </div>
</div>
  )
  else
  {
    return <Navigate to="/login" />;
  }
}
 
export default AddStudent