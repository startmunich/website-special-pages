import type { Metadata } from "next"
import "./globals.css"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

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
      <body className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
