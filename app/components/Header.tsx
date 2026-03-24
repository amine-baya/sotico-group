import React from 'react'
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";

function Header() {
    return (
        <div className="relative">
            <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
                <div className="container mx-auto flex justify-between items-center p-4">

                    {/* LEFT: Search icon */}
                    <div className="text-2xl font-bold cursor-pointer">
                        <FaSearch />
                    </div>

                    {/* CENTER: LOGO */}
                    <Image
                        src="/logo.jpeg"
                        alt="Construction"
                        width={80}
                        height={60}
                        className="cursor-pointer"
                    />

                    {/* RIGHT: Basket icon */}
                    <SlBasket className="text-2xl cursor-pointer" />
                </div>

                {/* NAV LINKS */}
                <div className="bg-white border-t border-gray-200">
                    <div className="container mx-auto flex justify-center gap-10 py-3 text-lg font-semibold text-gray-800">

                        {/* About Us */}
                        <p className="cursor-pointer hover:text-amber-600 transition">About Us</p>

                        {/* Contact Us */}
                        <p className="cursor-pointer hover:text-amber-600 transition">Contact Us</p>

                        {/* Catalogue - DROPDOWN */}
                        <div className="relative group cursor-pointer">
                            <p className="hover:text-amber-600 transition">Catalogue ▾</p>

                            {/* DROPDOWN MENU */}
                            <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-lg p-3 w-40">
                                <p className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">Uniforms</p>
                                <p className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">Construction</p>
                                <p className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">Medical</p>
                                <p className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">Security</p>
                            </div>
                        </div>

                        {/* Q&A */}
                        <p className="cursor-pointer hover:text-amber-600 transition">Q&A</p>
                    </div>
                </div>
            </nav>


            {/* Hero section */}
            <div className="relative h-screen w-full">
                <Image
                    src="/boots.png"
                    alt="Construction"
                    fill
                    priority
                    className="object-cover object-center scale-98"
                />
            </div>
        </div>
    )
}

export default Header