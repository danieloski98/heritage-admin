import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { Routes, Route, Outlet } from 'react-router-dom'


export default function Index() {
    return (
        <div className='flex w-full h-screen overflow-hidden'>
           <div className="w-64 h-full bg-black">
               <Sidebar />
           </div>
           <div className="flex-1 flex flex-col">
               <Navbar />
               <div className="flex-1 bg-gray-200 p-10 overflow-y-auto pb-12">
                   <Outlet />
               </div>
           </div>
        </div>
    )
}
