import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import { Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(false)
  
  

  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        
      </div>
    </div>
  ) : null
}

export default App