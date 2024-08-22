import {useEffect,React} from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Signup from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import { useDispatch } from 'react-redux'
import { isLoggedInCase } from './stateSlices/userAuthSlice'

//You can access Dummy Users on.... 
//https://dummyjson.com/users
function App() {
  const dispatch=useDispatch();
  /////////////////////////////////////
  useEffect(()=>{
    const activeUser=JSON.parse(localStorage.getItem('activeUser')??null);
if (activeUser){
  if(activeUser.token!=undefined)dispatch(isLoggedInCase(activeUser));
}
},[]);
//////////////////////////////////////////
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path='/signup' element={<Signup/>} /> */}
          <Route path='/profile' element={<ProfilePage  />} />
          <Route path='/' element={<LoginPage  />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App