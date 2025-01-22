"use client"

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold hover:text-blue-500 transition-colors">
          GitHub Repo Finder
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/trending" className="text-white hover:text-blue-400 transition-colors">
            Trending
          </Link>
          <Link href="/saved" className="text-white hover:text-blue-400 transition-colors">
            Saved Repos
          </Link>
        </div>
        {/* Hamburger icon for mobile */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
        >
          <svg
            className={`w-6 h-6 ${isMenuOpen ? 'transform rotate-90' : ''} transition-transform`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white p-4 space-y-4">
          <Link href="/trending" className="block hover:text-blue-400 transition-colors">
            Trending
          </Link>
          <Link href="/saved" className="block hover:text-blue-400 transition-colors">
            Saved Repos
          </Link>
        </div>
      )}
    </nav>
  );
}
