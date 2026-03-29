
"use client"

import Image from "next/image"
import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const images = [
  "/gilet.png",
  // "/boots.png",
  "/chef.png"
]

export function CarouselDemo() {
  // Create autoplay plugin
  const autoplay = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  return (
    <Carousel
      plugins={[autoplay.current]}
      className="w-full h-full"
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-[65vh] md:h-[70vh] overflow-hidden">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                priority={index === 0} // first slide loads fast
                className="object-cover object-center scale-105 transition-transform duration-1000 ease-in-out"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  )
}
