import type { Metadata, Viewport } from "next"
import "./globals.css"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "START Munich",
    template: "%s | START Munich",
  },
  description:
    "START Munich is the largest student-run entrepreneurship community in Munich. We empower the next generation of founders to dare, build, and belong.",
  metadataBase: new URL("https://www.startmunich.de"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.startmunich.de",
    siteName: "START Munich",
    title: "START Munich",
    description:
      "START Munich is the largest student-run entrepreneurship community in Munich. We empower the next generation of founders to dare, build, and belong.",
    images: [
      {
        url: "/startIcon.png",
        width: 512,
        height: 512,
        alt: "START Munich Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "START Munich – Europe's Student Entrepreneurship Community",
    description:
      "The largest student-run entrepreneurship community at TU Munich.",
    images: ["/startIcon.png"],
  },
  icons: {
    icon: [
      { url: "/startIcon.png", type: "image/png" },
    ],
    apple: "/startIcon.png",
    shortcut: "/startIcon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  keywords: [
    "START Munich",
    "student entrepreneurship",
    "TU Munich",
    "startup community",
    "founders",
    "Munich startups",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-brand-dark-blue">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
