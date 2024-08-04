"use client"

import { Carousel as MantineCarousel } from "@mantine/carousel"
// import { Chip } from "@mantine/core"
import { useCallback, useEffect, useState } from "react"
import { type EmblaCarouselType } from "embla-carousel"
import { cn } from "@/lib/utils"

export function Carousel({
  slides,
}: {
  slides: { image: string; title: string }[]
}) {
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null)
  const [selectedSlide, setSelectedSlide] = useState(0)

  const onSlideChange = useCallback(() => {
    if (!embla) return
    const currentSlide = embla.selectedScrollSnap()
    setSelectedSlide(currentSlide)
  }, [embla])

  useEffect(() => {
    if (!embla) return

    embla.on("select", onSlideChange)

    return () => {
      embla.off("select", onSlideChange)
    }
  }, [embla, onSlideChange])

  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <div className="flex items-center justify-center gap-4 rounded-md p-4">
        {slides.map((slide, index) => (
          <Chip
            key={index}
            selected={selectedSlide == index}
            onClick={() => {
              if (!embla) return
              embla.scrollTo(index)
              setSelectedSlide(index)
            }}
          >
            {slide.title}
          </Chip>
        ))}
      </div>
      <div className="imageclass w-full overflow-hidden rounded-lg p-10">
        <MantineCarousel
          withControls={false}
          getEmblaApi={setEmbla}
          dragFree={false}
          // draggable={false}
          slideGap={40}
        >
          {slides.map((slide, index) => (
            <MantineCarousel.Slide key={index} className="overflow-hidden">
              <img
                src={slide.image}
                className="object-contain"
                alt={`Slide ${index}`}
              />
            </MantineCarousel.Slide>
          ))}
        </MantineCarousel>
      </div>
    </div>
  )
}

function Chip({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode
  selected: boolean
  onClick?: () => void
}) {
  return (
    <div
      className={cn(
        `cursor-pointer text-nowrap rounded-full bg-white px-4 py-2 text-sm font-medium transition-colors ${!selected && "hover:bg-gray-200"}`,
        {
          "bg-[#6e18fb] text-white": selected,
        },
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
