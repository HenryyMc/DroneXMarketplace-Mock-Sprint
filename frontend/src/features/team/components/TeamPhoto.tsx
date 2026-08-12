'use client'

import { useEffect, useState } from 'react'
import { User } from 'lucide-react'

export function TeamPhoto({ src, alt }: { src?: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!src) return

    let cancelled = false
    const probe = new window.Image()
    probe.onload = () => {
      if (!cancelled) setLoaded(true)
    }
    probe.src = src

    return () => {
      cancelled = true
    }
  }, [src])

  if (!src || !loaded) {
    return <User className="size-12 text-zinc-400" aria-hidden="true" />
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="h-full w-full object-cover" />
  )
}
