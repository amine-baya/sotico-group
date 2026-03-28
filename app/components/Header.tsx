import React from 'react'
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { CarouselDemo } from './Carousel';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu"
import { NavigationMenuDemo } from './NavigationMenu';

function Header() {
    return (
        <div className="relative">
            <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
                {/* <!-- Top Thin Banner --> */}
                <div className="w-full bg-slate-50 border-b border-slate-100 py-2">
                    <div className="max-w-7xl mx-auto px-8 text-center">
                        <p className="text-[10px] tracking-[0.15em] font-bold text-slate-500 uppercase">Vêtements industriels et professionnels haut de gamme</p>
                    </div>
                </div>
                <div className="container mx-auto flex justify-between items-center p-4 pb-0">
                    {/* LEFT: Search icon */}
                    <div className="text-2xl font-bold cursor-pointer">
                        <FaSearch />
                    </div>
                    {/* CENTER: LOGO */}
                    <Image
                        // src="/logo.jpeg"
                        src="/logo.png"
                        alt="Construction"
                        width={250}
                        height={60}
                        className="cursor-pointer"
                    />
                    {/* RIGHT: Basket icon */}
                    <SlBasket className="text-2xl cursor-pointer" />
                </div>
                {/* NAV LINKS */}
                <div className="container mx-auto justify-center  pt-2 pb-3 text-montserrat text-lg font-semibold text-gray-800">
                        <NavigationMenuDemo /> 
                </div>
                {/* <!-- Promotional Bar --> */}
                <div className="bg-[#0c437c] text-white py-4">
                    <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-[15px] text-white font-bold uppercase tracking-[0.2em] mb-0.5">FREE SHIPPING</p>
                            <p className="text-s underline underline-offset-4">On all orders over £75 *</p>
                        </div>
                        <div className="border-x border-white/10">
                            <p className="text-[15px] text-white font-bold uppercase tracking-[0.2em] mb-0.5">28 DAY RETURNS*</p>
                            <p className="text-s underline underline-offset-4">Free Within 14 Days *</p>
                        </div>
                        <div>
                            <p className="text-[15px] text-white font-bold uppercase tracking-[0.2em] mb-0.5">FREE LOGO SET-UP</p>
                            <p className="text-s underline underline-offset-4">Embroidery &amp; Transfers</p>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Hero section */}
            {/* <div className="pt-[25%]">
                <div className="h-[70vh] w-full">
                    <CarouselDemo />
                </div>
            </div> */}
            <section className="relative flex items-center overflow-hidden bg-white pt-40">
            <div className='h-[90vh] w-full'> 
                {/* <!-- Full-bleed background/visual elements --> */}
                <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 h-full pt-10">
                    <div className="hidden lg:block lg:col-span-5 bg-background"></div>
                    <div className="col-span-12 lg:col-span-7 relative h-full">
                    <img className="w-full h-full object-cover" data-alt="Montage of three professionals: a chef in white uniform, a surgeon in blue scrubs, and a factory engineer in safety gear, against a deep blue atmospheric studio background with soft lens flares" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyGv9ZF64nFYFvzBixhs__AHwhrcLuXgoFBsO5cW4vjgpD5CtUxA-drguHiBtwK__0W6thwFwXYrVrYeXvz51MvpxMA4PEKB-wbdkEpC8ZDhrMWCPZco5beJEKutOBce4CWk0i58o3ZAwRJ1hFtT801SohhWnRg_y0NWnWLOBQ-jtEqDMJYq8r2M45SAc4uXhs1wgAsVsmw73qYEJG91R7iltat_2xb6gs1_aQRlxB8VGs-xaX2WL2CG0Tl_E2Xsa0CNMrgzaNzxc"/>
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 lg:from-background lg:via-background/40 to-transparent"></div>
                    {/* <!-- Atmospheric Depth Layer --> */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent mix-blend-multiply"></div>
                    </div>
                </div>
                {/* <!-- Centered Content Wrapper --> */}
                <div className="relative z-10 w-full max-w-7xl ml-[15%] pt-50 pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                        <div className="lg:col-span-6">
                        <p className="text-[#0c437c] font-headline font-bold tracking-[0.2em] mb-4 text-sm">SOTICO GROUP</p>
                        <h3 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold text-[#0c437c] leading-[1.05] tracking-tight mb-8">
                            UNE GRANDE MARQUE POUR LES PROFESSIONNELS
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-4 mt-10">
                            <button className="editorial-gradient bg-[#0c437c] text-white px-8 py-4 rounded-md font-semibold flex items-center justify-between group hover:shadow-xl hover:shadow-primary/20 transition-all">
                                <span>DÉCOUVREZ NOTRE CATALOGUE</span>
                                <span className="material-symbols-outlined ml-4 group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
                            </button>
                            <button className="bg-[#aebebb] text-white px- py-4 rounded-md font-semibold hover:bg-surface-container-high transition-colors">
                                SUR MESURE
                            </button>
                        </div>
                        {/* <!-- Float Accent Card within content flow for better responsiveness --> */}
                        <div className="mt-12 inline-block bg-surface-container-lowest p-6 rounded-xl shadow-xl border border-outline-variant/10">
                            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-1">Qualité Certifiée</p>
                            <p className="text-on-surface-variant text-sm font-medium">Standard Européen ISO 9001</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>
    )
}

export default Header