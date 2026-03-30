import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about-section"
      className="relative mt-16 scroll-mt-56 overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200 py-16"
    >
      <div className="container mx-auto grid items-center gap-12 px-6 md:grid-cols-2">
        <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-lg">
          <Image
            src="/company.jpg"
            alt="Our team working on construction uniforms"
            fill
            className="rounded-2xl object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 rounded-2xl bg-black/30" />
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-800 md:text-5xl">
            About <span className="text-[#0D427D]">Sotico</span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            At <strong>Sotico</strong>, we design and craft professional uniforms
            that bring comfort, safety, and confidence to every worker. From
            construction sites to workshops, we believe that quality work starts
            with quality wear.
          </p>
          <p className="leading-relaxed text-gray-600">
            Our mission is to blend durability, functionality, and modern style
            because we know that good design can empower productivity. Every
            fabric we choose and every stitch we make reflects our passion for
            excellence.
          </p>
          <button className="rounded-full bg-[#0D427D] px-8 py-3 font-semibold text-white shadow transition hover:bg-amber-600">
            Learn More
          </button>
        </div>
      </div>

      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#0D427D] opacity-40 blur-3xl mix-blend-multiply animate-pulse" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#0D427D] opacity-30 blur-3xl mix-blend-multiply animate-pulse" />
    </section>
  );
}
