import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
function Home() {
  return (
    <div>
    <Navbar/>
    <Link to ='/login'>Login</Link>
        </div>
  )
}

export default Home