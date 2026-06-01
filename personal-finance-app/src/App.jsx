import { useState } from 'react'
import './components/Sidebar.jsx'
import Sidebar from './components/Sidebar.jsx'
import Searchbar from './components/Searchbar.jsx'
import {Outlet} from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        <Sidebar />
        <Searchbar />
      </div>
      <main className="ml-70 mt-16 min-h-screen bg-[#101111] p-6 text-white">
      <Outlet/>
      </main>
    </>
  )
}

export default App
