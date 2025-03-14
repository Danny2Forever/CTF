"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Flag, LogIn, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex justify-center px-4 py-3 top-4 z-50">
      <nav className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md px-6 py-3 w-full max-w-6xl flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <Flag className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold text-gray-800">Fugaru</span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/" className="px-4 py-1 rounded-full text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/mycourse" className="px-4 py-1 rounded-full text-gray-700 hover:text-blue-600">
            My Course
          </Link>
          <Link href="/" className="px-4 py-1 rounded-full text-gray-700 hover:text-blue-600">
            Admin Panel
          </Link>
          <Link href="/" className="px-4 py-1 rounded-full text-gray-700 hover:text-blue-600">
            About us
          </Link>
          <Link href="/login" className="flex items-center px-4 py-1 rounded-full border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600">
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Link>
          <Link href="/register" className="px-4 py-1 hover:text-blue-600 hover:scale-105 duration-300 transition">
            Register
          </Link>
        </div>

        <button
          className="md:hidden text-gray-700 hover:text-blue-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-md rounded-lg py-2 md:hidden flex flex-col items-start px-6 gap-2">
            <Link href="/" className="w-full py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/" className="w-full py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              My Course
            </Link>
            <Link href="/" className="w-full py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Admin Panel
            </Link>
            <Link href="/" className="w-full py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              About us
            </Link>
            <Link href="/login" className="w-full py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link href="/register" className="w-full py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Register
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
