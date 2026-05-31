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
    </>
  )
}

export default App
