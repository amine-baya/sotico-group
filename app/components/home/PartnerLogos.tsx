import Image from "next/image";

import { partnerLogos } from "./home-content";

export default function PartnerLogos() {
  return (
    <section className="bg-white py-16">
      <h2 className="mb-10 text-center text-4xl font-bold text-gray-800">
        Trusted by Leading Companies
      </h2>

      <div className="fade-mask relative mx-auto max-w-7xl overflow-hidden">
        <div className="slider-track gap-16">
          {partnerLogos.map((logo, index) => (
            <Image
              key={`first-${index}`}
              src={logo.src}
              width={140}
              height={60}
              alt={logo.alt}
              className="grayscale opacity-60 transition-opacity hover:opacity-100"
            />
          ))}

          {partnerLogos.map((logo, index) => (
            <Image
              key={`second-${index}`}
              src={logo.src}
              width={140}
              height={60}
              alt={logo.alt}
              className="grayscale opacity-60 transition-opacity hover:opacity-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
