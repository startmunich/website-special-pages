"use client"

import { useState } from 'react'
import Image from 'next/image'

const eventPhotos = [
  {
    id: "ep1",
    url: "/forPartners/partnerEvents/RTSH-opt.jpg",
    caption: "Road to START Hack 26",
    href: "/eventpage/rtsh"
  },
  {
    id: "ep2",
    url: "/forPartners/partnerEvents/RTSH2-opt.jpg",
    caption: "Road to START Hack 26",
    href: "/eventpage/rtsh"
  },
  {
    id: "ep3",
    url: "/forPartners/partnerEvents/RTSS1-opt.jpg",
    caption: "Road to START Summit 26",
    href: "/eventpage/rtss"
  },
  {
    id: "ep4",
    url: "/forPartners/partnerEvents/RTSS2-opt.jpg",
    caption: "Road to START Summit 26",
    href: "/eventpage/rtss"
  },
  {
    id: "ep5",
    url: "/forPartners/partnerEvents/PitchUNetwork-opt.jpg",
    caption: "Pitch & Network"
  },
  {
    id: "ep6",
    url: "/forPartners/partnerEvents/MHL1-opt.jpg",
    caption: "Munich Hacking Legal 25",
    href: "/events/leagel-hack"
  },
  {
    id: "ep7",
    url: "/forPartners/partnerEvents/MHL2-opt.jpg",
    caption: "Munich Hacking Legal 25",
    href: "/events/leagel-hack"
  },
  {
    id: "ep8",
    url: "/forPartners/partnerEvents/IsarUnfiltered-opt.jpg",
    caption: "Isar Unfiltered",
    href: "/events/iu/home"
  },
  {
    id: "ep9",
    url: "/forPartners/partnerEvents/IsarUnfiltered2-opt.jpg",
    caption: "Isar Unfiltered",
    href: "/events/iu/home"
  },
  {
    id: "ep10",
    url: "/forPartners/partnerEvents/FounderFailTails-opt.jpg",
    caption: "Founder Fail Tales",
    href: "/events/founder-fail-tales-4"
  }
]

export default function PhotoGallery() {
  const [photoIndex, setPhotoIndex] = useState(0)

  return (
    <section>
      <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-brand-pink text-sm font-bold tracking-[0.2em] uppercase mb-3">Gallery</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            PARTNERS AT <span className="outline-text">OUR EVENTS</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl">
            Highlights from recent partner collaborations and events
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-sm text-gray-500 tabular-nums">
            {String(Math.floor(photoIndex / 6) + 1).padStart(2, '0')} / {String(Math.ceil(eventPhotos.length / 6)).padStart(2, '0')}
          </span>
          <button
            onClick={() => setPhotoIndex(Math.max(0, photoIndex - 6))}
            disabled={photoIndex === 0}
            className="w-12 h-12 rounded-full border-2 border-white/20 hover:border-brand-pink hover:bg-brand-pink text-white flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setPhotoIndex(Math.min(eventPhotos.length - 6, photoIndex + 6))}
            disabled={photoIndex + 6 >= eventPhotos.length}
            className="w-12 h-12 rounded-full bg-brand-pink hover:bg-brand-pink/80 text-white flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventPhotos.map((photo, index) => {
          const isVisible = index >= photoIndex && index < photoIndex + 6
          const Wrapper = photo.href ? 'a' : 'div'
          const wrapperProps = photo.href ? { href: photo.href } : {}
          return (
            <Wrapper
              key={photo.id}
              {...wrapperProps}
              className={`group relative overflow-hidden rounded-3xl aspect-video border border-white/10 hover:border-brand-pink/40 transition-all duration-300 block shadow-lg hover:shadow-brand-pink/10${!isVisible ? ' hidden' : ''}`}
            >
              <Image
                src={photo.url}
                alt={photo.caption}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue via-brand-dark-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-bold text-lg">{photo.caption}</p>
                </div>
              </div>
              {photo.href && (
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              )}
            </Wrapper>
          )
        })}
      </div>
    </section>
  )
}
