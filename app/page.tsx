import Image from "next/image";
import Header from "./components/Header";
export default function Home() {

  const logoImages = [
    { src: '/images.jpeg', alt: 'Company Logo 1' }, // Use actual unique paths/images
    { src: '/images.jpeg', alt: 'Company Logo 2' },
    { src: '/images.jpeg', alt: 'Company Logo 3' },
    { src: '/images.jpeg', alt: 'Company Logo 4' },
    { src: '/images.jpeg', alt: 'Company Logo 5' },
  ];

  const categories: { title: string; src:string; href: string; description: string, subCategories: Array }[] = [
    {
      title: "HEALTHCARE",
      src: "/healthcare.png",
      href: "/healthcare",
      description: "Premium medical uniforms designed for comfort, hygiene, and durability.",
      subCategories: [
        "Women's Nurses Tunics",
        "Men's Tunics",
        "Healthcare Scrubs",
        "Healthcare Trousers",
        "Nurse Dresses",
        "Maternity Tunics"
      ]
    },
    {
      title: "INDUSTRY",
      src: "/industry.png",
      href: "/industry-construction",
      description: "Heavy-duty workwear built for safety, protection, and performance in demanding environments.",
      subCategories: [
        "Coveralls",
        "Work Jackets",
        "Work Trousers",
        "High-Visibility Clothing",
        "Flame-Resistant Clothing",
        "Waterproof Workwear"
      ]
    },
    {
      title: "HOSPITALITY",
      src: "/hospitality.png",
      href: "/hospitality",
      description: "Professional uniforms for chefs, kitchen staff, and service teams.",
      subCategories: [
        "Chef Jackets",
        "Chef Trousers",
        "Aprons",
        "Kitchen Uniforms",
        "Waiter & Waitress Uniforms",
        "Catering Uniforms"
      ]
    },
    {
      title: "SERVICE",
      src: "/corporate.png",
      href: "/corporate",
      description: "Elegant uniforms for office, retail, and customer-facing professionals.",
      subCategories: [
        "Office Uniforms",
        "Reception Staff Uniforms",
        "Retail Staff Uniforms",
        "Security Uniforms",
        "Airline Staff Uniforms",
        "Customer Service Apparel"
      ]
    },
    {
      title: "CLEANING",
      src: "/cleaning.png",
      href: "/cleaning-services",
      description: "Durable and practical clothing for cleaning and maintenance professionals.",
      subCategories: [
        "Cleaning Staff Uniforms",
        "Housekeeping Uniforms",
        "Janitorial Workwear",
        "Industrial Laundry Clothing",
        "Maintenance Uniforms",
        "Protective Overalls"
      ]
    }
  ]
  return (
    <div>
      {/* HERO SECTION */}

      <Header />
      {/* CATEGORY SECTION */}
      <div className="p-4">
        {/* <h2 className="mx-auto text-5xl font-bold text-center my-8">Category</h2> */}

        {/* First row */}
        {/* <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="relative w-full aspect-4/3">
              <Image
                src="/industry.png"
                alt="Construction"
                width={500}
                height={800}
                className="object-center w-full"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40">
                <button className="px-6 py-2 border-2 border-amber-100 hover:bg-amber-100 hover:text-black transition">
                  See more
                </button>
              </div>
            </div>
          ))}
        </div> */}

        {/* Second row */}
        <div className="grid grid-cols-3 gap-4 mt-2">
          {categories.map((item:any) => (
            <div key={item} className="relative w-full aspect-4/3">
              <Image
                src={item.src}
                
                alt="Construction"
                width={500}
                height={800}
                className="object-center w-full"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40 rounded-xl">
                <button className="px-6 py-2 border-2 border-amber-100 hover:bg-amber-100 hover:text-black transition">
                  See more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Colabs */}
      <section className="py-16 bg-white">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Trusted by Leading Companies
        </h2>

        <div className="max-w-7xl mx-auto overflow-hidden fade-mask relative">
          <div className="slider-track gap-16">
            {/* First set */}
            {logoImages.map((logo, index) => (
              <Image
                key={`first-${index}`}
                src={logo.src}
                width={140}
                height={60}
                alt={logo.alt}
                className="grayscale opacity-60 hover:opacity-100 transition-opacity"
              />
            ))}

            {/* Duplicate set for infinite scroll */}
            {logoImages.map((logo, index) => (
              <Image
                key={`second-${index}`}
                src={logo.src}
                width={140}
                height={60}
                alt={logo.alt}
                className="grayscale opacity-60 hover:opacity-100 transition-opacity"
              />
            ))}

          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="relative mt-16 py-16 bg-gradient-to-br from-gray-100 via-white to-gray-200 overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/company.jpg"
              alt="Our team working on construction uniforms"
              fill
              className="object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
          </div>

          {/* Right: Text */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              About <span className="text-[#0D427D]">Sotico</span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              At <strong>Sotico</strong>, we design and craft professional uniforms that bring comfort, safety,
              and confidence to every worker. From construction sites to workshops, we believe that quality
              work starts with quality wear.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to blend **durability, functionality, and modern style** — because we know that
              good design can empower productivity. Every fabric we choose and every stitch we make
              reflects our passion for excellence.
            </p>
            <button className="px-8 py-3 bg-[#0D427D] text-white font-semibold rounded-full shadow hover:bg-amber-600 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#0D427D] rounded-full mix-blend-multiply blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0D427D] rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse"></div>
      </section>

      {/* old contact us section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT : TEXT + INFO */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              Contact <span className="text-amber-600">Us</span>
            </h2>

            <p className="text-gray-600 leading-relaxed text-lg">
              We’re here to answer your questions and support you.
              Whether you need help with uniforms, catalog details,
              or a custom order — our team is always ready to assist.
            </p>

            {/* CONTACT DETAILS */}
            <div className="space-y-4 text-gray-700 text-lg">
              <p>📞 <strong>Phone:</strong> +216 00 000 000</p>
              <p>📧 <strong>Email:</strong> contact@sotico.tn</p>
              <p>📍 <strong>Location:</strong> Tunisia</p>
            </div>
          </div>

          {/* RIGHT : CONTACT FORM */}
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <form className="space-y-5">
              <div>
                <label className="block mb-1 font-semibold">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Message</label>
                <textarea
                  rows={5}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>

      <section className="bg-[#f3f4f6] py-24 text-white">
        <div className="max-w-7xl bg-[#ffffff]  mx-auto px-8" >
        <div className="flex items-center gap-6 mb-16">
        <div className="w-1 h-12 bg-brand-gold"></div>
        <h2 className="text-5xl text-[#0D427D] md:text-6xl font-headline font-bold tracking-tight italic">Let's talk</h2>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <div className="space-y-2">
        <label className="block mb-1 font-semibold">First name<span className="text-brand-gold ml-0.5">*</span></label>
        <input className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="First name" type="text"/>
        </div>
        <div className="space-y-2">
        <label className="block text-sm font-semibold text-white/90">Last name<span className="text-brand-gold ml-0.5">*</span></label>
        <input className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Last name" type="text"/>
        </div>
        <div className="space-y-2">
        <label className="block text-sm font-semibold text-white/90">Email address<span className="text-brand-gold ml-0.5">*</span></label>
        <input className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Email address" type="email"/>
        </div>
        <div className="space-y-2">
        <label className="block text-sm font-semibold text-white/90">Phone number</label>
        <input className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Phone number" type="tel"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:col-span-2">
        <div className="space-y-2">
        <label className="block text-sm font-semibold text-white/90">Company<span className="text-brand-gold ml-0.5">*</span></label>
        <input className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Company" type="text"/>
        </div>
        <div className="space-y-2">
        <label className="block text-sm font-semibold text-white/90">Sector</label>
        <select className="w-full bg-white text-on-surface px-4 py-3 border-none focus:ring-2 focus:ring-brand-gold outline-none transition-all font-body">
        <option>Please select...</option>
        <option>Industrial</option>
        <option>Healthcare</option>
        <option>Corporate</option>
        <option>Military</option>
        </select>
        </div>
        <div className="space-y-2">
        <label className="block text-sm font-semibold text-white/90">Enquiry type<span className="text-brand-gold ml-0.5">*</span></label>
        <select className="w-full bg-white text-on-surface px-4 py-3 border-none focus:ring-2 focus:ring-brand-gold outline-none transition-all font-body">
        <option>Please select...</option>
        <option>Product Inquiry</option>
        <option>Custom Solutions</option>
        <option>Partnerships</option>
        <option>Technical Support</option>
        </select>
        </div>
        </div>
        <div className="md:col-span-2 space-y-2">
        <label className="block text-sm font-semibold text-white/90">Message<span className="text-brand-gold ml-0.5">*</span></label>
        <textarea className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Message" rows="4"></textarea>
        </div>
        <div className="md:col-span-2 space-y-6">
        <p className="text-xs text-white/70 leading-relaxed max-w-4xl">
                            SOTICO Group needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at anytime. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, check out our <a className="underline hover:text-white transition-colors" href="#">Privacy Policy</a>.
                        </p>
        <button className="bg-brand-gold hover:bg-[#FFD570] text-primary px-12 py-4 font-bold transition-all uppercase tracking-widest text-sm shadow-lg active:scale-95" type="submit">
                            Submit
                        </button>
        </div>
        </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-14 ">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* COMPANY INFO */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Sotico</h3>
            <p className="text-gray-400 leading-relaxed">
            est une entreprise familiale, fondée en 1982 par M. Mohamed KHALFALLAH,
            c’est une des premières entreprises Tunisienne spécialisée dans la fabrication
            de vêtements professionnels pour les secteurs de la santé, l’industrie et
            retardateur de flamme
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li className="hover:text-white transition cursor-pointer">Home</li>
              <li className="hover:text-white transition cursor-pointer">Shop</li>
              <li className="hover:text-white transition cursor-pointer">About Us</li>
              <li className="hover:text-white transition cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>📞 (+216) 73 288 533/544</li>
              <li>📧 mk@soticogroup.com / contact@soticogroup.com</li>
              <li>📍 GP1, Route de Sfax Z.I. BeniRabiaa 4015  M’saken - Tunisie</li>
            </ul>
          </div>

          {/* SOCIAL MEDIA */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-white transition">🌐</a>
              <a href="#" className="hover:text-white transition">📘</a>
              <a href="#" className="hover:text-white transition">📸</a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">
          © {new Date().getFullYear()} Sotico. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
