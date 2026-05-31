import { useState } from 'react'
import './App.css'
import './components/Sidebar.jsx'
import Sidebar from './components/Sidebar.jsx'
import Searchbar from './components/Searchbar.jsx'

function App() {

  return (
    <>
      <div>
        <Sidebar />
        <Searchbar />
      </div>
      <main className="ml-70 mt-16 min-h-screen bg-[#101111] p-6 text-white">
      <h2 className="text-3xl font-bold">
        Om namah shivay
      </h2>
    </main>
    </>
  )
}

export default App
