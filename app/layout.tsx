import type { Metadata } from "next"
import "./globals.css"
import Navigation from "@/components/Navigation"

export const metadata: Metadata = {
  title: "START Munich - Our Startups",
  description: "Discover the innovative companies built by our community of ambitious student entrepreneurs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <Navigation /> */}
        {children}
      </body>
    </html>
  )
}
