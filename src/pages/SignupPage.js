import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedInCase } from '../stateSlices/userAuthSlice';
import '../App.css'
import Header from '../component/Header';

function Signup() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
const [failed,setFailed]=useState(false);
const [success,setSuccess]=useState(false);
const navigate=useNavigate();

    const [emailPresent,setEmailPresent]=useState(false);
    const [emailValid,setEmailValid]=useState(true);
    const [passwordValid,setPasswordValid]=useState(true);
    const [confirmPasswordValid,setConfirmPasswordValid]=useState(true);

  const isLoggedIn=useSelector((state)=>state.userAuth.isLoggedIn);
  const dispatch=useDispatch();
///////////////////////////////////////////////////////////////
    const handleName=(e)=>setName(e.target.value);

    const handleEmail=(e)=>{setEmail(e.target.value);
        const checkValue=e.target.value;
        if (/^[a-zA-Z0-9_]+@[a-zA-Z0-9]+[.][a-zA-Z0-9]+$/.test(checkValue)) {
            setEmailValid(true);
        }else{
            setEmailValid(false);
        }
    };
    //////////////////////////////////////////////
    const handlePassword=(e)=>{setPassword(e.target.value);
        const checkValue=e.target.value;
        if (/^.{8,}$/.test(checkValue)) {
            setPasswordValid(true);
        }else{
            setPasswordValid(false);
        }
        checkValue===confirmPassword?setConfirmPasswordValid(true):setConfirmPasswordValid(false);
    };
    ///////////////////////////////////////////////////////////
    const handleConfirmPassword=(e)=>{setConfirmPassword(e.target.value);
        if (password===e.target.value) {
            setConfirmPasswordValid(true);
        }else{
            setConfirmPasswordValid(false);
        }
    }
///////////////////////////////////////////////////
useEffect(()=>{
if (isLoggedIn) {
    navigate('/profile');
}
},[isLoggedIn]);
///////////////////////////////////////////////////
   function handleSubmitBtn(e){
e.preventDefault();
if (name!=='' && email!=='' && password!=='' && confirmPassword!=='' && emailValid && passwordValid && confirmPasswordValid) {
   const users=JSON.parse(localStorage.getItem('users')??'[]');
   const userCheck=users.filter((item)=>item.email===email);
   
   if (userCheck.length>0) {
    setEmailPresent(true);
    return;
   }else{
    setEmailPresent(false);
   }
   const userobj={
    name:name,
    email:email,
    password:password
   };
   users.push(userobj);
   localStorage.setItem('users',JSON.stringify(users));
   const activeUser={
    name:name,
    email:email,
    token:Math.floor(Math.random()*10**12),
    password:password
   };
   localStorage.setItem('activeUser',JSON.stringify(activeUser));
   dispatch(isLoggedInCase(activeUser));
    setTimeout(()=>navigate('/profile'),2000);
    setSuccess(true);
    setFailed(false);

    setEmail('');
    setConfirmPassword('');
    setPassword('');
    setName('');
}else{
   setFailed(true);
   setSuccess(false);
}
}
///////////////////////////////////////////


  return (
    <div className='signup-page'>
        <Header/>
        <div className='signup'>
        <p className='title'>Signup</p>
    <form>
        <label className='label' htmlFor='name'>Full Name</label><br/>
        <input onChange={handleName} value={name} className='input' id='name' type='text' required /><br/>
      
        <label className='label' htmlFor='email'>Email</label><br/>
        <input onChange={handleEmail} value={email} className='input' id='email' type='email' required /><br/>
        {!emailValid && <p className='input-errors'>Invalid email format</p>}

        <label className='label' htmlFor='password'>Password</label><br/>
        <input onChange={handlePassword} value={password} className='input' id='password' type='password' required /><br/>
        {!passwordValid && <p className='input-errors'>Password must be atleast 8 characters</p>}
        
        <label className='label' htmlFor='confirm-password'>Confirm Password</label><br/>
        <input onChange={handleConfirmPassword} value={confirmPassword} className='input' id='confirm-password' type='password' required /><br/>
        {!confirmPasswordValid && <p className='input-errors'>Passwords do not match</p>}
          
        {failed && <p className='error'>Error : All the fields are mandatory</p>}
        {emailPresent && <p className='error'>Email Already Exists!</p>}
       {success && <p className='success'>Successfully Signed Up!</p>}
        <button onClick={handleSubmitBtn}>Signup</button>
    </form>
    </div>
    </div>
  )
}

export default Signup