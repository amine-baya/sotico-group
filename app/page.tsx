import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import Header from "./components/Header";
import Link from "next/link";
export default function Home() {

  const logoImages = [
    { src: '/images.jpeg', alt: 'Company Logo 1' }, // Use actual unique paths/images
    { src: '/images.jpeg', alt: 'Company Logo 2' },
    { src: '/images.jpeg', alt: 'Company Logo 3' },
    { src: '/images.jpeg', alt: 'Company Logo 4' },
    { src: '/images.jpeg', alt: 'Company Logo 5' },
  ];
  return (
    <div>
      {/* HERO SECTION */}
      <Header />
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


      {/* CATEGORY SECTION */}
      <div className="p-4">
        <h2 className="mx-auto text-5xl font-bold text-center my-8">Category</h2>

        {/* First row (2 items) */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Construction', slug: 'Construction', img: '/cat-const.jpg' },
            { name: 'Tennis', slug: 'Tennis', img: '/cat-tennis.jpg' }
          ].map((cat, index) => (
            <Link
              href={`/products?category=${cat.slug}`}
              key={index}
              className="relative w-full aspect-4/3 group cursor-pointer"
            >
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                className="object-cover rounded-xl"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40 rounded-xl transition-all group-hover:bg-black/50">
                <span className="block text-xl font-semibold mb-3">{cat.name}</span>
                <div className="px-6 py-2 border-2 border-amber-100 group-hover:bg-amber-100 group-hover:text-black transition">
                  See more
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { name: 'Industrial', slug: 'Industrial', img: '/cat-const.jpg' },
            { name: 'Safety', slug: 'Safety', img: '/cat-safety.jpg' },
            { name: 'Other', slug: 'Other', img: '/cat-const.jpg' }
          ].map((cat, index) => (
            <Link
              href={`/products?category=${cat.slug}`}
              key={index}
              className="relative w-full aspect-4/3 group cursor-pointer"
            >
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                className="object-cover rounded-xl"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40 rounded-xl transition-all group-hover:bg-black/50">
                <span className="block text-xl font-semibold mb-3">{cat.name}</span>
                <div className="px-6 py-2 border-2 border-amber-100 group-hover:bg-amber-100 group-hover:text-black transition">
                  See more
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* ABOUT US SECTION */}
      <section className="relative mt-16 py-16 bg-gradient-to-br from-gray-100 via-white to-gray-200 overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/constraction.jpg"
              alt="Our team working on construction uniforms"
              fill
              className="object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
          </div>

          {/* Right: Text */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              About <span className="text-amber-600">Sotico</span>
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
            <button className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-full shadow hover:bg-amber-600 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse"></div>
      </section>

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

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-14 ">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* COMPANY INFO */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Sotico</h3>
            <p className="text-gray-400 leading-relaxed">
              We design and craft durable, comfortable and professional uniforms
              for construction, industrial and mechanical sectors.
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
              <li>📞 +216 00 000 000</li>
              <li>📧 contact@sotico.tn</li>
              <li>📍 Tunisia</li>
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
