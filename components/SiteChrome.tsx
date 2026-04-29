"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isStandaloneEventPage =
    pathname === "/eventpage/rtss" || pathname === "/eventpage/rtsh"

  if (isStandaloneEventPage) {
    return <main className="flex-grow">{children}</main>
  }

  return (
    <>
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  )
}
