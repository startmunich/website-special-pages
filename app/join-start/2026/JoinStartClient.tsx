'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Hero from '@/components/Hero'

const LAUNCH_DATE = new Date('2026-04-10T00:00:00+02:00').getTime()
const TARGET_DATE = new Date('2026-04-26T23:59:59+02:00').getTime()

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function JoinStartClient() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)
  const [isLive, setIsLive] = useState(false)

  const searchParams = useSearchParams()
  const isBeta = searchParams.get('beta') === 'true'

  useEffect(() => {
    setMounted(true)
    setIsLive(isBeta || Date.now() >= LAUNCH_DATE)
    const update = () => {
      const diff = Math.max(0, TARGET_DATE - Date.now())
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ]

  if (!mounted) return null

  if (!isLive) {
    return (
      <main className="min-h-screen bg-brand-dark-blue text-white">
        <Hero
          backgroundImage="/memberJourney/hero-opt.png"
          title={<>JOIN <span className="outline-text">START MUNICH</span></>}
          description="Applications for 2026 will open soon. Stay tuned."
        />
      </main>
    )
  }

  return (
    <div className="bg-brand-dark-blue">
      {/* Hero section */}
      <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
        {/* Background image — blurry & black-and-white */}
        <Image
          src="/join-start-2026-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-brand-dark-blue/60" />

        {/* Page content */}
        <div className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col-reverse md:flex-col">
          {/* Countdown section — bottom on mobile, centered on desktop */}
          <div className="flex flex-col items-center px-4 pb-12 md:flex-1 md:justify-center md:pb-0">
            <p className="text-sm tracking-[0.3em] text-white/80 uppercase md:text-lg">
              Want to join Start?
            </p>
            <p className="mt-2 text-xl font-bold tracking-wide text-white uppercase md:text-3xl">
              Applications close in
            </p>
            <div
              className="mt-6 flex items-start gap-1 md:mt-10 md:gap-4"
              style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.4s ease' }}
            >
              {units.map((unit, i) => (
                <div key={unit.label} className="flex items-start gap-1 md:gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-black tabular-nums text-[#d0006f] sm:text-5xl md:text-7xl lg:text-8xl">
                      {pad(unit.value)}
                    </span>
                    <span className="mt-1 text-[8px] tracking-[0.15em] text-white/50 uppercase sm:text-[10px] md:text-xs md:tracking-[0.2em]">
                      {unit.label}
                    </span>
                  </div>
                  {i < units.length - 1 && (
                    <span className="text-4xl font-black text-[#d0006f] sm:text-5xl md:text-7xl lg:text-8xl">
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Title + CTA — top on mobile, bottom on desktop */}
          <div className="flex flex-col items-center gap-8 px-6 pb-10 md:flex-row md:items-end md:justify-between md:px-16 md:pb-16 md:pt-0 lg:px-24">
            {/* Left — big title */}
            <h1 className="text-5xl font-black leading-[0.9] text-white sm:text-6xl md:text-8xl lg:text-9xl">
              JOIN
              <br />
              START
              <br />
              MUNICH
            </h1>

            {/* Right — CTA section */}
            <div className="max-w-md md:text-right">
              <h2 className="text-lg font-bold uppercase tracking-wide text-white">
                Where Visionaries and Innovators Thrive
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Become part of Germany&apos;s leading student-run entrepreneurship
                initiative. At START Munich, you&apos;ll gain hands-on experience,
                connect with top-tier founders and investors, and build the next
                big thing.
              </p>
              <a
                href="https://tally.so/r/eqL4yQ"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-pink px-8 py-3 font-bold text-white transition-all duration-1000 hover:shadow-[0_0_30px_rgba(208,0,111,0.4)]"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube video section */}
      <section id="video" className="scroll-mt-8 px-6 py-12 md:px-16 md:py-20 lg:px-24">

        <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src="https://www.youtube.com/embed/T63USk9W_IY"
            title="START Munich Application Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </section>

      {/* Events */}
      <section className="py-12 md:py-20">
        <div className="px-6 md:px-16 lg:px-24">
          <h2 className="text-3xl font-black text-brand-pink md:text-4xl lg:text-5xl">
            Got Questions? Let&apos;s Talk.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
            Curious about START Munich or unsure about the application process?
            Join one of our upcoming info sessions — online or in person — and get
            all your questions answered. Meet the team, learn what we&apos;re all
            about, and find out how you can become part of our entrepreneurial
            community.
          </p>
        </div>

        <div className="mt-12 flex gap-5 overflow-x-auto px-6 pb-4 md:px-16 lg:px-24 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {[
            //{ title: 'YC Event', desc: 'START Munich', date: 'Wednesday, 15th April 2026', time: null, img: '/join-start/yc-event.jpg', link: null, linkLabel: null },
            { title: 'START & Friends Run Club – Sunset Run', desc: 'START & Friends', date: 'Thursday, 16th April 2026', time: '18:30', img: '/join-start/sunset-run.png', link: 'https://luma.com/omtnj23y', linkLabel: 'Register now' },
            { title: 'Female Entrepreneurship Summit', desc: 'YFN x START Munich', date: 'Saturday, 18th April 2026', time: null, img: '/join-start/fes.png', link: 'https://www.youngfounders.network/fes', linkLabel: 'More information' },
            { title: 'Founder Fail Tales', desc: 'Vol. 5', date: 'Tuesday, 21st April 2026', time: null, img: '/join-start/founder-fail-tales.png', link: 'https://luma.com/fp1fd6qv', linkLabel: 'Register now' },
            { title: 'Why Start? Info Session', desc: 'Real people. Real journeys. Real reasons to START.', date: 'Thursday, 23rd April 2026', time: null, img: '/join-start/info-session-2026.png', link: 'https://luma.com/t5r7vw10', linkLabel: 'Register now' },
            { title: 'Student Initiative Showcase', desc: 'START Munich', date: 'Friday, 24th April 2026', time: null, img: '/join-start/student-club-fair.jpg', link: null, linkLabel: null },
            { title: 'Online Info Event', desc: 'You are temporarily not in Munich? We got you.', date: 'Friday, 24th April 2026', time: null, img: '/join-start/online-info-2026.jpeg', link: null, linkLabel: null },
            { title: 'START & Friends Run Club – Coffee Run with LAP', desc: 'START & Friends', date: 'Saturday, 25th April 2026', time: '11:00', img: '/join-start/coffee-run-lap.png', link: 'https://luma.com/qb2g0cph', linkLabel: 'Register now' },
          ].map((event) => (
            <div
              key={event.title}
              className="flex w-72 flex-none flex-col overflow-hidden rounded-lg md:w-80"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Top — image */}
              <div className="relative aspect-square w-full">
                <Image
                  src={event.img}
                  alt={event.title}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>

              {/* Middle — text */}
              <div className="flex flex-1 flex-col px-5 py-5">
                <h3 className="text-lg font-black uppercase text-brand-pink">
                  {event.title}
                </h3>
                <p className="mt-1 text-sm text-white/50">{event.desc}</p>
                <p className="mt-2 text-sm font-bold text-white">
                  {event.date}
                  {event.time && <><br />{event.time}</>}
                </p>

                {/* Bottom — CTA */}
                <div className="mt-auto pt-5">
                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full rounded-sm bg-[#d0006f] px-6 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#d0006f]/80"
                    >
                      {event.linkLabel}
                    </a>
                  ) : (
                    <span className="block w-full cursor-not-allowed rounded-sm bg-white/20 px-6 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-white/40">
                      Registration opens soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Makes START Unique */}
      <section className="px-6 py-12 md:px-16 md:py-20 lg:px-24">
        <h2 className="text-3xl font-black uppercase text-brand-pink sm:text-4xl md:text-5xl lg:text-6xl">
          What Makes Start Unique
        </h2>
        <p className="mt-4 text-base text-white md:text-lg">
          START Munich is more than a student initiative, it&apos;s a launchpad
          for future entrepreneurs. Here&apos;s why you should be part of it:
        </p>

        {/* Row 1 */}
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Values Over Grades */}
          <div className="flex flex-col items-center text-center">
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg">
              <Image
                src="/join-start/volleyball.png"
                alt="Values Over Grades"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-6 text-xl font-black uppercase text-white md:text-2xl">
              Values Over Grades
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
              No one here cares about your GPA. What matters is the courage to
              share an idea and the drive to make it real. That&apos;s how
              programmers end up brainstorming with psychologists, and musicians
              sketch out business models. Different worlds, same fire.
            </p>
          </div>

          {/* No Playbook */}
          <div className="flex flex-col items-center text-center">
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg">
              <Image
                src="/memberJourney/SF-opt.png"
                alt="No Playbook"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-6 text-xl font-black uppercase text-white md:text-2xl">
              No Playbook
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
              The Bay Area trip, START Labs, the Hacking Legal hackathon were
              never assigned. They started as ideas someone cared enough to make
              real. No hierarchy. No bureaucracy. Just people taking the leap of
              faith and building things that matter.
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Failure Celebrated */}
          <div className="flex flex-col items-center text-center">
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg">
              <Image
                src="/events/eventCards/fail-opt.jpg"
                alt="Failure Celebrated"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-6 text-xl font-black uppercase text-white md:text-2xl">
              Failure Celebrated
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
              At events like Founder Fail Tales, screw-ups don&apos;t get
              buried. We hand failures the mic, laugh at them together, and
              learn out loud. Because if you never fail, you never dared to
              build.
            </p>
          </div>

          {/* A Living Global Network */}
          <div className="flex flex-col items-center text-center">
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg">
              <Image
                src="/join-start/start-summit.jpeg"
                alt="A Living Global Network"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-6 text-xl font-black uppercase text-white md:text-2xl">
              A Living Global Network
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
              START doesn&apos;t end when you leave Munich. It stays with you
              through new ventures, new cities, new chapters. You&apos;ll find
              co-founders, investors, and friends across the world. It&apos;s
              more than a network. It&apos;s a family you keep building with.
            </p>
          </div>
        </div>
      </section>

      {/* Jumpstart Into Entrepreneurship */}
      <section className="px-6 py-12 md:px-16 md:py-20 lg:px-24">
        <div className="relative aspect-[4/1] px-12 w-full overflow-hidden rounded-lg">
          <Image
            src="/join-start/jumpstart.png"
            alt="Jumpstart Into Entrepreneurship"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <h3 className="mt-8 text-center text-xl font-black uppercase text-white md:text-2xl lg:text-3xl">
          Jumpstart Into Entrepreneurship
        </h3>
        <p className="mx-auto mt-4 max-w-4xl text-center text-sm leading-relaxed text-white/70 md:text-base">
          At START, your first step is the Sprint. In just 30 days, you turn a
          raw idea into an MVP and pitch it to a jury. After that, you dive into
          the departments, the heart of START, where you keep building, drive
          projects, and shape the community. Some go on to launch startups,
          everyone learns by doing.
        </p>
      </section>

    </div>
  )
}
