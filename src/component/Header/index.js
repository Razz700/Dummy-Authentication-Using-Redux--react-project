import React, { useEffect } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header() {
  const navigate=useNavigate();
  const isLoggedIn=useSelector((state)=>state.userAuth.isLoggedIn);
  

  useEffect(()=>{  
if (isLoggedIn){
  navigate('/profile');
}
},[isLoggedIn]);
/////////////////////////////
// const handleSignupbtn=()=>{
// if(!isLoggedIn){
// navigate('/signup');}}
/////////////////////////////////
const handleProfilebtn=()=>{
  if (isLoggedIn) {
   navigate('/profile'); 
  }
}
/////////////////////////////////
const handleLoginbtn=()=>{
  if (!isLoggedIn) {
    navigate('/');
  }
}
//////////////////////////////////
  return (
    <div className='header'>
<p>Header</p>
<div className='navigate'>
    {/* <p onClick={handleSignupbtn} className='nav-btn'>Signup</p> */}
     <p onClick={handleProfilebtn} className='nav-btn'>Profile</p>
    <p onClick={handleLoginbtn} className='nav-btn'>Login</p>
</div>
    </div>
  )
}

export default Header