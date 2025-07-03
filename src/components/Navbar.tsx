'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              FlavorMix
            </Link>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/sobre" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Sobre Nós
              </Link>
              <Link href="/login" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
            </div>
          </div>

          {/* Botão de menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
            Home
          </Link>
          <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
            Sobre Nós
          </Link>
          <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
            Login
          </Link>
        </div>
      )}
    </nav>
  )
}
