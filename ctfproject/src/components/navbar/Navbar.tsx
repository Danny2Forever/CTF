'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()

    // Don't render the navbar if we're in the /a section
    if (pathname.match(/\d/)) {
        return null
    }
    if (pathname.endsWith("quiz")) {
        return null
    }
    if (pathname.endsWith("information")) {
        return null
    }
    return (
        <nav className="bg-[#D9D9D9] rounded-full max-w-7xl mx-auto my-8 px-8 py-4 flex items-center justify-between">
            <div className="text-black text-2xl">Furagu</div>
            <div className="flex items-center space-x-16 text-lg">
                <a href="#" className="text-black hover:text-gray-700">home</a>
                <a href="#" className="text-black hover:text-gray-700">my couse</a>
                <a href="#" className="text-black hover:text-gray-700">about us</a>
                <a href="#" className="text-black hover:text-gray-700">admin panel</a>
            </div>
            <a href="#" className="text-black hover:text-gray-700">name</a>
        </nav>
    )
}
export default Navbar