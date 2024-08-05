"use client"
import { Carousel } from "@/components/carousel"
import Image from "next/image"

function Demo() {
  const height = 300
  const width = 200
  return (
    <Carousel
      slides={[
        { title: "Chat", image: "/images/chat.png" },
        { title: "APIs", image: "/images/api.png" },
        { title: "Assistance", image: "/images/assistant.png" },
        { title: "Finetune", image: "/images/finetune.png" },
      ]}
    ></Carousel>
  )
}

export default function Page() {
  return (
    <div>
      <div className="items-center justify-center">
        <div className="mx-auto w-[65%] overflow-hidden p-2">
          <Demo />
        </div>
      </div>
    </div>
  )
}
