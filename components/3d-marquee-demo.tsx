"use client"

import { ThreeDMarquee } from "@/components/ui/3d-marquee"

export default function ThreeDMarqueeDemo() {
  const images = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fkUu8tKVQRoO8y9rt5edCUU2SIYDMP.png", // Healthcare professionals image
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2fP8ndltAwNWx8aIUlZiFrD3a5TvFQ.png", // Medical heart with stethoscope
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
  ]

  return (
    <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} />
    </div>
  )
}
