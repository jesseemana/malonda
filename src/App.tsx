import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Callback from './pages/Callback'

function App() {
  return (
    <>
      <header className='fixed shadow-sm w-full bg-white py-4'>
        <p className='text-center font-semibold italic text-3xl capitalize'>
          online shop
        </p>
      </header>

      <Routes>
        <Route 
          path='/' 
          element={<Home />} 
        />

        <Route 
          path='/callback' 
          element={<Callback />} 
        />
      </Routes>
    </>
  )
}

export default App
