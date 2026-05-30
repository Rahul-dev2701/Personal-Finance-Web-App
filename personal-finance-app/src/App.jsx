import { useState } from 'react'
import './App.css'
import './components/Sidebar.jsx'
import Sidebar from './components/Sidebar.jsx'


function App() {

  return (
    <>
      <div className='flex, bg-slate-800'>
        <Sidebar />
      </div>
      <h2 className='text-3xl font-bold underline'>Jai shree Ganesha !!</h2>
    </>
  )
}

export default App
