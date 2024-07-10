import React from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/authSlice'
import { Logout } from '../../appwrite/backauth'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = async() => {
        await Logout();
        dispatch(logout());
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn