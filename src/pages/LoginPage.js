import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedInCase } from '../stateSlices/userAuthSlice';
import '../App.css'
import Header from '../component/Header';


//You can access Dummy Users on.... https://dummyjson.com/users
function LoginPage() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const isLoggedIn=useSelector((state)=>state.userAuth.isLoggedIn);
    

    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState(null);
    const [success,setSuccess]=useState(false);
    const [userData,setUserData]=useState(null);
    
    const handleUserName=(e)=>setUserName(e.target.value);
    const handlePassword=(e)=>setPassword(e.target.value);
    ////////////////////////////////////////
    useEffect(()=>{
      if (isLoggedIn) {
        navigate('/profile');
      }
    },[isLoggedIn]);
//////////////////////////////////////////////////
    const handleLoginbtn=(e)=>{
        e.preventDefault();
        if (userName!=='' && password!=='') {
          fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: userName,
              password: password,
            })
          })
          .then(res => res.json())
          .then(data=>{console.log(data);
            if(data.message!='Invalid credentials'){
              setUserData(data);
              const obj={
                id:data.id,
                token:data.token
              }
              localStorage.setItem('activeUser',JSON.stringify(obj));
              setTimeout(()=>{
                dispatch(isLoggedInCase(obj));
                navigate('/profile');
              },1000);
              setError(null);
              setSuccess(true);
            }else{
              setError(data.message);
            setSuccess(false);
            }  
          }).catch(e=>{
            setError(e.message);
            setSuccess(false);
          });  
        }else{
          setError('All Fields are Mandatory!');
        }
           
    }
    ////////////////////////////////////////////////////
  return (
    <div className='login-page'>
        <Header userData={userData}/>
        <div className='login'>
    <p className='title'>Login</p>
    <form>
    <label className='label' htmlFor='username'>User Name</label><br/>
        <input onChange={handleUserName} value={userName} className='input' id='username' type='text' required /><br/>

        <label className='label' htmlFor='password'>Password</label><br/>
        <input onChange={handlePassword} value={password} className='input' id='password' type='password' required /><br/>

       {error && <p className='error'>{error}</p>}
       {success && <p className='success'>Login Successul!</p> } 
        <button onClick={handleLoginbtn}>Login</button>
    </form></div>
    </div>
  )
}

export default LoginPage