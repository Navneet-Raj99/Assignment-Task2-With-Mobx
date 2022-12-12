import {React,useEffect, useState,useContext} from 'react'
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom'
import Studentcontext from '../Context/Studentcontext';
import {DiBootstrap} from 'react-icons/di'
function Navbar() {
    let k=useContext(Studentcontext);
    useEffect(() => {
        k.fetchUserName();
    }, [])
    let location = useLocation();
    return (
        <div>
            <nav class="navbar navbar-expand navbar-dark bg-dark">
                <div class="container-fluid d-flex">
                    <div>
                    <a class="navbar-brand">Assignment</a>
                    {/* <img src="https://icons8.com/icon/Wo2fxhUTwDhv/task" alt="hero"/> */}
                    </div>
                    <div className='d-flex'>
                    <div class="navbar-brand">{k.name}</div>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            {!localStorage.getItem('AUTH_TOKEN') && <>
                            
                                <Link to='/login'><button type="button" class="btn btn-primary me-2">Login</button> </Link>
                                <Link to='/signup'><button type="button" class="btn btn-secondary me-2">Signup</button> </Link>
                            </>}

                            {localStorage.getItem('AUTH_TOKEN') &&
                            <>
                            {location.pathname=='/student' && <Link to='/paginated'><button type="button" class="btn btn-success mx-1">Paginated</button> </Link>}
                            {location.pathname=='/tableview' && <Link to='/student'><button type="button" class="btn btn-success me-1">Grid View</button> </Link>}
                            {location.pathname=='/paginated' && <Link to='/student'><button type="button" class="btn btn-success me-1">Grid View</button> </Link>}
                            
                             <button type="button" class=" btn btn-danger" onClick={()=>
                            {
                                localStorage.removeItem('AUTH_TOKEN');
                                k.sendMessage("Logout Successfully","success","top-center");
                                setTimeout(() => {
                                    window.location.href = "/login";
                                }, 1000);
                               
                            }}>Logout</button>
                            </>}
                        </div>
                    </div>
                </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar