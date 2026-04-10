'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Hero from '@/components/Hero'
import HeroCard from '@/components/HeroCard'
import UpcomingEventTile from '@/components/UpcomingEventTile'

const LAUNCH_DATE = new Date('2026-04-10T00:00:00+02:00').getTime()
const TARGET_DATE = new Date('2026-04-26T23:59:59+02:00').getTime()

function pad(n: number) {
  return String(n).padStart(2, '0')
}

const applyEvents = [
  {
    id: 'sunset-run',
    name: 'START & Friends Run Club – Sunset Run',
    description: 'Join us for an easy sunset run, meet the team, and chat about what START Munich is like beyond the application.',
    month: 'Thursday, 16th April 2026\n18:30',
    image: '/join-start/sunset-run.png',
    category: 'START & Friends',
    ctaHref: 'https://luma.com/omtnj23y',
    ctaLabel: 'Register now',
  },
  {
    id: 'fes',
    name: 'Female Entrepreneurship Summit',
    description: 'Meet ambitious builders, hear from inspiring voices, and connect with the wider entrepreneurial community around START.',
    month: 'Saturday, 18th April 2026',
    image: '/join-start/fes.png',
    category: 'YFN x START Munich',
    ctaHref: 'https://www.youngfounders.network/fes',
    ctaLabel: 'More information',
  },
  {
    id: 'fail-tales',
    name: 'Founder Fail Tales',
    description: 'Hear honest stories from founders, meet the START community, and get a feel for the culture we build around learning fast.',
    month: 'Tuesday, 21st April 2026',
    image: '/join-start/founder-fail-tales.png',
    category: 'Vol. 5',
    ctaHref: 'https://luma.com/fp1fd6qv',
    ctaLabel: 'Register now',
  },
  {
    id: 'info-session',
    name: 'Why Start? Info Session',
    description: 'Meet the team, ask application questions, and learn how START members build projects, friendships, and careers together.',
    month: 'Thursday, 23rd April 2026',
    image: '/join-start/info-session-2026.png',
    category: 'Info Session',
    ctaHref: 'https://luma.com/t5r7vw10',
    ctaLabel: 'Register now',
  },
  {
    id: 'showcase',
    name: 'Student Initiative Showcase',
    description: 'Stop by our booth, meet the people behind START Munich, and get quick answers about the application and community.',
    month: 'Friday, 24th April 2026',
    image: '/join-start/student-club-fair.jpg',
    category: 'START Munich',
    ctaHref: undefined,
    ctaLabel: 'Registration opens soon',
  },
  {
    id: 'online-info',
    name: 'Online Info Event',
    description: 'Can’t make it to Munich? Join online, meet the team remotely, and ask everything you want to know about applying.',
    month: 'Friday, 24th April 2026',
    image: '/join-start/online-info-2026.jpeg',
    category: 'Online Event',
    ctaHref: 'https://luma.com/4q4m43v3',
    ctaLabel: 'Register now',
  },
  {
    id: 'coffee-run',
    name: 'START & Friends Run Club – Coffee Run with LAP',
    description: 'Start your Saturday with a relaxed run, coffee, and casual conversations with START members and friends of the community.',
    month: 'Saturday, 25th April 2026\n11:00',
    image: '/join-start/coffee-run-lap.png',
    category: 'START & Friends',
    ctaHref: 'https://luma.com/qb2g0cph',
    ctaLabel: 'Register now',
  },
]

export default function JoinStartClient() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)
  const [isLive, setIsLive] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const searchParams = useSearchParams()
  const isBeta = searchParams.get('beta') === 'true'

  useEffect(() => {
    setMounted(true)
    const update = () => {
      const now = Date.now()
      const rawDiff = TARGET_DATE - now
      const diff = Math.max(0, rawDiff)
      setIsLive(isBeta || now >= LAUNCH_DATE)
      setIsClosed(rawDiff <= 0)
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
  }, [isBeta])

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ]

  if (!mounted || !isLive) {
    return (
      <div className="min-h-screen bg-brand-dark-blue text-white">
        <Hero
          backgroundImage="/memberJourney/hero-opt.png"
          title={<>JOIN <span className="outline-text">START MUNICH</span></>}
          description="Applications for 2026 will open soon. Stay tuned."
        />
      </div>
    )
  }

  return (
    <div className="bg-brand-dark-blue">
      {/* Hero section */}
      <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
        <Image
          src="/join-start-2026-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark-blue/95 via-brand-dark-blue/80 to-brand-dark-blue/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue via-brand-dark-blue/30 to-transparent" />
        <div className="absolute top-24 right-[12%] h-72 w-72 rounded-full bg-sky-400/10 blur-[120px]" />
        <div className="absolute bottom-16 left-[8%] h-80 w-80 rounded-full bg-brand-pink/10 blur-[120px]" />

        <div className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center">
          <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_440px] xl:items-center xl:gap-14">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-black leading-[0.9] text-white sm:text-6xl md:text-8xl lg:text-[8.5rem]">
                JOIN
                <br />
                <span className="outline-text">START</span>
                <br />
                MUNICH
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg">
                Become part of Germany&apos;s leading student-run entrepreneurship
                initiative. At START Munich, you&apos;ll gain hands-on experience,
                connect with top-tier founders and investors, and build with one
                of Munich&apos;s most ambitious student communities.
              </p>
            </div>

            <HeroCard className="w-full border-sky-300/20 bg-sky-500/10 shadow-[0_20px_60px_rgba(8,47,73,0.35)] xl:ml-auto xl:max-w-[440px]">
              <p className="text-center text-xs font-bold uppercase tracking-[0.35em] text-white/75 sm:text-sm">
                Applications close in
              </p>
              <div
                className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 xl:gap-3"
                style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.4s ease' }}
              >
                {units.map((unit) => (
                  <div
                    key={unit.label}
                    className="rounded-2xl border border-white/10 bg-brand-dark-blue/40 px-3 py-4 text-center sm:px-4 sm:py-5 xl:px-3"
                  >
                    <span className="block text-[2.65rem] font-black tabular-nums text-white sm:text-[3rem] xl:text-[2.4rem]">
                      {pad(unit.value)}
                    </span>
                    <span className="mt-2 block text-[10px] uppercase tracking-[0.06em] text-white/55 sm:text-[11px] xl:text-[10px]">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm leading-relaxed text-white/70">
                Don&apos;t miss your chance to join the next generation of builders,
                operators, and founders at START Munich.
              </p>
              <a
                href="https://tally.so/r/eqL4yQ"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand-pink px-8 py-3 font-bold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(208,0,111,0.4)]"
              >
                Start Application
              </a>
            </HeroCard>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube video section */}
      <section id="video" className="scroll-mt-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <iframe
            src="https://www.youtube.com/embed/T63USk9W_IY"
            title="START Munich Application Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-brand-pink md:text-4xl lg:text-5xl">
            Got Questions? Let&apos;s Talk.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
            Curious about START Munich or unsure about the application process?
            Join one of our upcoming events and get all your questions answered. Meet the team, learn what we're all about, and find out how you can become part of our entrepreneurial community.
          </p>
        </div>

        <div className="max-w-7xl mx-auto mt-12 flex gap-6 overflow-x-auto px-4 pb-4 scrollbar-hide sm:px-6 lg:px-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {applyEvents.map((event, index) => (
            <UpcomingEventTile
              key={event.id}
              title={event.name}
              date={event.month}
              imageUrl={event.image}
              description={event.description}
              className="flex h-[35.5rem] w-[86vw] max-w-[320px] flex-none flex-col self-stretch sm:w-[300px] lg:w-[320px]"
              ctaHref={event.ctaHref}
              ctaLabel={event.ctaLabel}
              ctaDisabledLabel="Registration opens soon"
            />
          ))}
        </div>
      </section>

      {/* What Makes START Unique */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* Jumpstart Into Entrepreneurship */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[4/1] w-full overflow-hidden rounded-lg">
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
        <div className="mt-8 flex justify-center">
          <a
            href="https://tally.so/r/eqL4yQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-brand-pink px-10 py-4 text-lg font-bold text-white transition-all duration-1000 hover:shadow-[0_0_30px_rgba(208,0,111,0.4)]"
          >
            Start Application Now
          </a>
        </div>
        </div>
      </section>

    </div>
  )
}
