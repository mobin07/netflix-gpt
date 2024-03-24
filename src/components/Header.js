import React from 'react'
import {  signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

const Header = () => {
  const navigate=useNavigate()
  const user=useSelector(store=>store.user)
  
  console.log('user in header',user)
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
      // action of dispatch will take from Body component 
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }
  return (
    <div className='absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className='w-44' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" 
        alt="netflix logo"/>
        {
          user && 
          <div className='flex p-2 gap-2'>
          {/* <img className='w-12 h-12 ' src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"/> */}
          <img className='w-12 h-12 ' src={user.photoURL}/>

        <button className='font-bold text-white' onClick={handleSignOut}>Sign Out</button>
        </div>
        }
        

    </div>
  )
}

export default Header