import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLoggedOutCase } from '../stateSlices/userAuthSlice';
import '../App.css'
import Header from '../component/Header';

//You can access Dummy Users on.... https://dummyjson.com/users
function ProfilePage() {
    const isLoggedIn=useSelector((state)=>state.userAuth.isLoggedIn);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [userData,setUserData]=useState(null);
    
  const handleLogout=()=>{
    localStorage.removeItem('activeUser');
    dispatch(isLoggedOutCase());
    navigate('/');
}  
///////////////////////////////
useEffect(()=>{
    if (!isLoggedIn) {
        navigate('/');
    }else if(isLoggedIn){
      const activeUser=JSON.parse(localStorage.getItem('activeUser'));
      fetch(`https://dummyjson.com/users/${activeUser.id}`).then((res)=>res.json()).then((data)=>{
        setUserData(data);
        console.log(data,'in profile page');      
      });
    }
},[isLoggedIn]);

/////////////////////////////
  return (
    <div className='profile-page'>
        <Header/>
        
        {userData && <div className='profile'>
            <p className='title'>Profile</p>
            <div className='details'>
            <p><img src={userData.image} title='profile image' alt='profile-img' /></p>
             <p>Full Name : {userData.firstName} {userData.lastName}</p>
             <p>Email : {userData.email}</p>
             <p>Password : {userData.password}</p>
             <p>UserName : {userData.username}</p>
             <p>Age : {userData.age}</p>
             <p>Gender : {userData.gender}</p>
             <p>Phone : {userData.phone}</p>
             <p>Blood Group : {userData.bloodGroup}</p>
             <p>Birth Date : {userData.birthDate}</p>
             <p>Weight : {userData.weight} kgs</p>
             <p>Height : {userData.height}cms</p>
             <p>Address : {userData.address.address}, {userData.address.city}, {userData.address.state}</p>
           
      
        <button onClick={handleLogout}>Logout</button>
        </div>
    </div>}
    </div>
  )
}

export default ProfilePage