import React from 'react'
import Link from 'next/link'
import { Flag, LogIn } from 'lucide-react'

const Navbar = () => {
    return (
        <div className="w-full flex justify-center px-4 py-3 absolute top-4 z-50">
            <nav className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md px-6 py-3 w-full max-w-6xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Flag className="h-6 w-6 text-blue-500" />
                    <span className="text-xl font-bold text-gray-800">Fugaru</span>
                </div>
                
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center px-4 py-1 rounded-full text-gray-700 hover:text-blue-600">
                     Home
                    </Link>
                    <Link href="/" className="flex items-center px-4 py-1 rounded-full text-gray-700 hover:text-blue-600">
                     My Course
                    </Link>
                    <Link href="/" className="flex items-center px-4 py-1 rounded-full text-gray-700 hover:text-blue-600">
                     Admin Panel
                    </Link>
                    <Link href="/" className="flex items-center px-4 py-1 rounded-full text-gray-700 hover:text-blue-600">
                     About us
                    </Link>
                    
                    <Link href="/login" className="flex items-center px-4 py-1 rounded-full border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                    </Link>

                    <Link href="/register" className="flex items-center px-4 py-1  hover:border-blue-500 hover:text-blue-600 hover:scale-105 duration-300 transition">
                        Register
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar