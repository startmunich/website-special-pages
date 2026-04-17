'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { NoiseTexture } from '@/components/ui/noise-texture';

export const dynamic = 'force-dynamic';

// Label Component - Consistent "//" labels throughout the page
function Label({
   children,
   className = '',
   style = {},
}: {
   children: React.ReactNode;
   className?: string;
   style?: React.CSSProperties;
}) {
   return (
      <span
         className={`font-mono uppercase tracking-[0.15em] ${className}`}
         style={{
            fontSize: '12px',
            color: 'var(--labs-text-body)',
            ...style,
         }}
      >
         {children}
      </span>
   );
}

// Section Header Component - Large centered section titles
function SectionHeader({ children }: { children: React.ReactNode }) {
   return (
      <div className='text-center mb-20'>
         <span
            className='font-mono uppercase tracking-[0.15em]'
            style={{
               fontSize: '16px',
               color: 'var(--labs-accent)',
            }}
         >
            {children}
         </span>
      </div>
   );
}

// Navigation Component
function LabsNavigation() {
   return (
      <header
         className='fixed top-0 left-0 right-0 z-50 bg-transparent'
         style={{
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(12px)',
         }}
      >
         <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
            <div className='max-w-5xl mx-auto'>
               <div className='flex items-center justify-between h-20'>
                  {/* Logo */}
                  <a href='#' className='flex flex-col leading-none py-2'>
                     <span
                        className='labs-heading font-medium'
                        style={{ fontSize: '18px' }}
                     >
                        START LABS
                     </span>
                     <span
                        className='labs-meta mt-[2px]'
                        style={{ color: 'var(--labs-accent)' }}
                     >
                        // MEDTECH EDITION
                     </span>
                  </a>

                  {/* Desktop Navigation */}
                  <nav className='hidden md:flex items-center gap-8'>
                     <a
                        href='#manifesto'
                        className='font-mono uppercase tracking-[0.15em] transition-all duration-200'
                        style={{ color: '#888888', fontSize: '10px' }}
                        onMouseEnter={(e) =>
                           (e.currentTarget.style.color = '#ffffff')
                        }
                        onMouseLeave={(e) =>
                           (e.currentTarget.style.color = '#888888')
                        }
                     >
                        About
                     </a>
                     <a
                        href='#program'
                        className='font-mono uppercase tracking-[0.15em] transition-all duration-200'
                        style={{ color: '#888888', fontSize: '10px' }}
                        onMouseEnter={(e) =>
                           (e.currentTarget.style.color = '#ffffff')
                        }
                        onMouseLeave={(e) =>
                           (e.currentTarget.style.color = '#888888')
                        }
                     >
                        How it works
                     </a>
                     <a
                        href='#faq'
                        className='font-mono uppercase tracking-[0.15em] transition-all duration-200'
                        style={{ color: '#888888', fontSize: '10px' }}
                        onMouseEnter={(e) =>
                           (e.currentTarget.style.color = '#ffffff')
                        }
                        onMouseLeave={(e) =>
                           (e.currentTarget.style.color = '#888888')
                        }
                     >
                        FAQ
                     </a>
                     <a
                        href='#apply'
                        className='group relative inline-block font-mono text-xs uppercase tracking-widest px-6 py-2 border overflow-hidden transition-all duration-300'
                        style={{
                           borderColor: 'var(--labs-accent)',
                           color: 'var(--labs-accent)',
                        }}
                     >
                        <span className='relative z-10 transition-colors duration-300 group-hover:text-black'>
                           Apply Now
                        </span>
                        <div
                           className='absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out'
                           style={{ background: 'var(--labs-accent)' }}
                        ></div>
                     </a>
                  </nav>

                  {/* Mobile CTA */}
                  <a
                     href='#apply'
                     className='md:hidden group relative inline-block font-mono text-xs uppercase tracking-widest px-4 py-2 border overflow-hidden transition-all duration-300'
                     style={{
                        borderColor: 'var(--labs-accent)',
                        color: 'var(--labs-accent)',
                     }}
                  >
                     <span className='relative z-10 transition-colors duration-300 group-hover:text-black'>
                        Apply
                     </span>
                     <div
                        className='absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out'
                        style={{ background: 'var(--labs-accent)' }}
                     ></div>
                  </a>
               </div>
            </div>
         </div>
      </header>
   );
}

// Hero Section
function HeroSection() {
   return (
      <section
         className='relative min-h-screen pt-20 overflow-hidden'
         style={{ background: 'var(--labs-bg)' }}
      >
         {/* Video Background */}
         <div className='absolute inset-0 z-0'>
            <video
               autoPlay
               muted
               loop
               playsInline
               poster='/labs/videos/START_LABS_poster.jpg'
               className='absolute inset-0 w-full h-full object-cover opacity-40'
            >
               <source
                  src='/labs/videos/START_LABS_trimmed_video.mp4'
                  type='video/mp4'
               />
            </video>
            <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/95'></div>
            <NoiseTexture noiseOpacity={0.15} />
         </div>

         <div className='relative z-10 min-h-[calc(100vh-80px)] flex flex-col justify-end'>
            {/* Main Content */}
            <div className='max-w-[1400px] mx-auto px-6 md:px-12 pb-20 w-full'>
               <div className='max-w-5xl mx-auto'>
                  {/* Spec Label */}
                  {/* <div className='mb-8'>
                     <Label>// Medtech Edition</Label>
                  </div> */}

                  {/* Main Headline */}
                  <h1 className='mb-6'>
                     <div className='labs-heading text-[clamp(36px,8vw,72px)] leading-[0.9]'>
                        You're not a student.
                        <br />
                        You're a{' '}
                        <span style={{ color: 'var(--labs-accent)' }}>
                           founder.
                        </span>
                     </div>
                  </h1>

                  {/* Subheadline */}
                  <div className='mb-6 max-w-2xl'>
                     <p
                        className='font-mono leading-relaxed'
                        style={{
                           fontSize: '12px',
                           color: 'var(--labs-text-body)',
                        }}
                     >
                        Most programs teach entrepreneurship.
                        <br />
                        We just make you build a company. Like actually.
                     </p>
                  </div>

                  {/* CTA */}
                  <div className='mb-6'>
                     <a
                        href='https://tally.so/r/n9Axzp'
                        target='_blank'
                        rel='noopener'
                        className='group relative inline-block font-mono text-xs font-semibold uppercase tracking-[0.15em] px-12 py-4 border overflow-hidden transition-all duration-300'
                        style={{
                           borderColor: 'var(--labs-accent)',
                           color: 'var(--labs-accent)',
                        }}
                     >
                        <span className='relative z-10 transition-colors duration-300 group-hover:text-black'>
                           Apply Now
                        </span>
                        <div
                           className='absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out'
                           style={{ background: 'var(--labs-accent)' }}
                        ></div>
                     </a>
                  </div>

                  {/* Program Specs */}
                  <div
                     className='font-mono'
                     style={{
                        fontSize: '12px',
                        color: 'var(--labs-text-body)',
                     }}
                  >
                     // Deadline: 30 April 2026 · Limited spots · Munich,
                     in-person
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

// Organized By Section
function OrganizedBySection() {
   return (
      <section
         className='py-12 relative overflow-hidden'
         style={{
            background: 'var(--labs-bg)',
         }}
      >
         {/* Gradient blobs */}
         <div className='absolute inset-0 pointer-events-none z-[1]'>
            <div
               className='absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[100px]'
               style={{
                  background:
                     'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
               }}
            ></div>
         </div>

         <div className='max-w-[1400px] mx-auto px-6 md:px-12 relative z-10'>
            <div className='flex flex-col items-center gap-6'>
               <Label>// Organized by</Label>
               <div className='flex items-center gap-6'>
                  <a
                     href='https://www.startmunich.de/'
                     target='_blank'
                     rel='noopener'
                     className='transition-opacity hover:opacity-100 opacity-60'
                  >
                     <img
                        alt='START Munich'
                        src='https://raw.githubusercontent.com/genepearl/start-labs-2026/main/images/startmunich.png'
                        className='h-11 w-auto mix-blend-screen'
                     />
                  </a>
                  <span className='labs-meta'>×</span>
                  <a
                     href='https://www.one-aim.org/'
                     target='_blank'
                     rel='noopener'
                     className='transition-opacity hover:opacity-100 opacity-60'
                  >
                     <img
                        alt='OneAIM'
                        src='https://raw.githubusercontent.com/genepearl/start-labs-2026/main/images/oneaim.png'
                        className='h-10 w-auto mix-blend-screen'
                     />
                  </a>
               </div>
            </div>
         </div>
      </section>
   );
}

// What is START Labs Section
function WhatIsStartLabsSection() {
   return (
      <section
         className='labs-reveal relative py-32 overflow-hidden'
         style={{ background: '#ffffff' }}
      >
         {/* Noise texture */}
         <NoiseTexture noiseOpacity={0.15} className='opacity-30' />

         {/* Gradient blobs */}
         <div className='absolute inset-0 pointer-events-none z-[1]'>
            <div
               className='absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background:
                     'radial-gradient(circle, rgba(45,212,191,0.25) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background:
                     'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
               }}
            ></div>
         </div>

         <div className='max-w-[1400px] mx-auto px-6 md:px-12 relative z-10'>
            <div className='max-w-5xl mx-auto'>
               {/* Section Header */}
               <div className='text-center mb-20'>
                  <span
                     className='font-mono uppercase tracking-[0.15em]'
                     style={{ fontSize: '16px', color: 'var(--labs-accent)' }}
                  >
                     // What is START Labs
                  </span>
               </div>

               {/* Headline */}
               <h2
                  className='labs-heading text-[clamp(32px,5vw,56px)] leading-[1.1] mb-12 text-center'
                  style={{ color: '#000000' }}
               >
                  The only no-program program.
               </h2>

               {/* Body content */}
               <div className='max-w-3xl mx-auto space-y-6'>
                  <p
                     className='font-mono leading-relaxed'
                     style={{ fontSize: '13px', color: '#555555' }}
                  >
                     START Labs is an 8-week program that connects ambitious
                     builders with organizations that have real, unsolved
                     problems.
                  </p>

                  <p
                     className='font-mono leading-relaxed'
                     style={{ fontSize: '13px', color: '#555555' }}
                  >
                     No classrooms. No sticky notes. No pretend startups.
                  </p>

                  <p
                     className='font-mono leading-relaxed'
                     style={{ fontSize: '13px', color: '#555555' }}
                  >
                     From day one, you're a founder — working directly with a
                     challenge partner to build an actual solution. You're not
                     starting from zero. You're starting from one. The problem
                     is already scoped. The partner is already there. You just
                     have to build.
                  </p>

                  <p
                     className='font-mono leading-relaxed'
                     style={{ fontSize: '13px', color: '#555555' }}
                  >
                     Each batch focuses on a single vertical. Challenge partners
                     bring the problems. Student teams build the solutions. If
                     both sides see value, they keep going — as a startup, a
                     pilot, or something else entirely. That part is up to you.
                  </p>

                  <p
                     className='font-mono leading-relaxed font-semibold'
                     style={{ fontSize: '13px', color: '#000000' }}
                  >
                     We don't simulate entrepreneurship. We just remove
                     everything standing between you and it.
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
}

// Problem Section
function ProblemSection() {
   return (
      <section
         className='labs-reveal relative py-32 overflow-hidden'
         style={{
            background: 'var(--labs-bg)',
         }}
      >
         {/* Noise texture */}
         <NoiseTexture noiseOpacity={0.15} className='opacity-30' />

         {/* Gradient blobs */}
         <div className='absolute inset-0 pointer-events-none z-[1]'>
            <div
               className='absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background:
                     'radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background:
                     'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
               }}
            ></div>
         </div>

         <div className='max-w-[1400px] mx-auto px-6 md:px-12 relative z-10'>
            <div className='max-w-5xl mx-auto'>
               {/* Section Header */}
               <div className='text-center mb-20'>
                  <span
                     className='font-mono uppercase tracking-[0.15em]'
                     style={{ fontSize: '16px', color: 'var(--labs-accent)' }}
                  >
                     // The problem
                  </span>
               </div>

               {/* Main Statement */}
               <h2 className='labs-heading text-[clamp(32px,5vw,56px)] leading-[1.1] mb-12 text-center'>
                  <span
                     className='block'
                     style={{ color: 'var(--labs-text-primary)' }}
                  >
                     The world isn't broken.
                  </span>
                  <span
                     className='block'
                     style={{ color: 'var(--labs-text-primary)' }}
                  >
                     It's disconnected.
                  </span>
               </h2>

               {/* Intro body */}
               <div className='max-w-2xl mx-auto mb-20 text-center'>
                  <p
                     className='font-mono leading-relaxed'
                     style={{
                        fontSize: '13px',
                        color: 'var(--labs-text-body)',
                     }}
                  >
                     Ambitious builders are launching their fifth AI notetaker.
                     Organizations with real problems are stuck fighting fires.
                     They never meet.
                  </p>
               </div>

               {/* Two-card grid */}
               <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-20'>
                  <div
                     className='labs-reveal group p-10 bg-white/5 backdrop-blur-sm border border-t-2 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] cursor-default'
                     style={{
                        borderTopColor: 'var(--labs-accent)',
                        borderColor: 'rgba(255,255,255,0.1)',
                     }}
                  >
                     <div className='relative z-10'>
                        <div className='mb-6'>
                           <span
                              className='font-mono uppercase tracking-[0.15em] transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                              style={{
                                 fontSize: '12px',
                                 color: 'var(--labs-accent)',
                              }}
                           >
                              // On one side
                           </span>
                        </div>
                        <div
                           className='labs-heading mb-4 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                           style={{
                              fontSize: 'var(--labs-size-heading-sm)',
                              color: 'var(--labs-text-primary)',
                           }}
                        >
                           Healthcare organizations
                        </div>
                        <div
                           className='font-mono leading-relaxed transition-colors duration-300 group-hover:text-[var(--labs-text-primary)]'
                           style={{
                              fontSize: '12px',
                              color: 'var(--labs-text-body)',
                           }}
                        >
                           Real problems. No bandwidth, no time, no angle to
                           solve them.
                        </div>
                     </div>
                  </div>

                  <div
                     className='labs-reveal group p-10 bg-white/5 backdrop-blur-sm border border-t-2 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] cursor-default'
                     style={{
                        borderTopColor: 'var(--labs-accent)',
                        borderColor: 'rgba(255,255,255,0.1)',
                        transitionDelay: '100ms',
                     }}
                  >
                     <div className='relative z-10'>
                        <div className='mb-6'>
                           <span
                              className='font-mono uppercase tracking-[0.15em] transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                              style={{
                                 fontSize: '12px',
                                 color: 'var(--labs-accent)',
                              }}
                           >
                              // On the other
                           </span>
                        </div>
                        <div
                           className='labs-heading mb-4 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                           style={{
                              fontSize: 'var(--labs-size-heading-sm)',
                              color: 'var(--labs-text-primary)',
                           }}
                        >
                           Ambitious builders
                        </div>
                        <div
                           className='font-mono leading-relaxed transition-colors duration-300 group-hover:text-[var(--labs-text-primary)]'
                           style={{
                              fontSize: '12px',
                              color: 'var(--labs-text-body)',
                           }}
                        >
                           Real skills. No problem worth their time.
                        </div>
                     </div>
                  </div>
               </div>

               {/* Closing line */}
               <div className='text-center'>
                  <div
                     className='labs-heading mb-4 leading-[1.3]'
                     style={{
                        fontSize: 'var(--labs-size-heading-md)',
                        color: 'var(--labs-text-primary)',
                     }}
                  >
                     Builders and problems are never in the same room.
                     <br />
                     <span style={{ color: 'var(--labs-accent)' }}>
                        We fix that.
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

// How It Works Section (combines Manifesto, About, and Program)
function HowItWorksSection() {
   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

   const timelineItems = [
      {
         week: 'Week 01',
         tag: 'Kickoff',
         title: 'Onboarding day',
         desc: "Meet your clinical partners. Understand the challenge firsthand. From day one, you're a founder — not a participant.",
      },
      {
         week: 'Week 02',
         tag: 'Experts',
         title: 'Roast Session 1',
         desc: "Founders, clinicians, and healthcare operators who've built in this space. Ask them anything.",
      },
      {
         week: 'Week 04',
         tag: 'Milestone',
         title: 'Midterm pitch',
         desc: 'Present your progress to clinical partners. Pivot or persevere based on real feedback. No grades. Real consequences.',
      },
      {
         week: 'Week 06',
         tag: 'Experts',
         title: 'Roast Session 2',
         desc: 'Deep dive with industry experts. Get tactical advice on your biggest challenges.',
      },
      {
         week: 'Week 08',
         tag: 'Final',
         title: 'Demo day',
         desc: 'Present your MVP to partners, clinicians, and a live audience. Real stakes. No safety net.',
         isLast: true,
      },
   ];

   return (
      <section
         id='manifesto'
         className='labs-reveal relative py-32 overflow-hidden scroll-mt-20'
         style={{
            background: '#ffffff',
            borderColor: 'rgba(0,0,0,0.1)',
         }}
      >
         {/* Anchor for navigation */}
         <div id='program' className='absolute -top-20'></div>

         {/* Noise texture */}
         <NoiseTexture noiseOpacity={0.25} />

         {/* Animated background gradient blobs */}
         <div className='absolute inset-0 pointer-events-none z-[1]'>
            <div
               className='absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] animate-blob'
               style={{
                  background:
                     'radial-gradient(circle, rgba(45,212,191,0.3) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute top-1/2 right-1/4 w-96 h-96 rounded-full blur-[120px] animate-blob animation-delay-2000'
               style={{
                  background:
                     'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full blur-[120px] animate-blob animation-delay-4000'
               style={{
                  background:
                     'radial-gradient(circle, rgba(251,146,60,0.25) 0%, transparent 70%)',
               }}
            ></div>
         </div>

         {/* Decorative side accent - large section number */}
         <div className='hidden lg:block absolute left-6 top-32 opacity-[0.02] pointer-events-none select-none'>
            <div
               className='font-display font-black text-[240px] leading-none'
               style={{ color: '#000000' }}
            >
               02
            </div>
         </div>

         <div className='max-w-[1400px] mx-auto px-6 md:px-12 relative z-10'>
            <div className='max-w-5xl mx-auto'>
               {/* Section Header */}
               <SectionHeader>// How it works</SectionHeader>

               {/* Main Heading */}
               <h2 className='labs-heading text-[clamp(32px,5vw,56px)] leading-[1.1] mb-16'>
                  <span className='block' style={{ color: '#000000' }}>
                     8 weeks.
                  </span>
                  <span className='block' style={{ color: '#666666' }}>
                     Real stakes.
                  </span>
                  <span className='block' style={{ color: '#666666' }}>
                     Real startup.
                  </span>
               </h2>

               {/* Manifesto paragraphs */}
               <div className='max-w-3xl mx-auto mb-20 space-y-6'>
                  <p
                     className='font-mono leading-relaxed'
                     style={{
                        fontSize: '13px',
                        color: '#555555',
                     }}
                  >
                     When a clinician depends on what you build, you stop
                     theorizing and start shipping. When real users break your
                     prototype, you learn more in a week than a year of
                     lectures. Not workshops. Actual stakes.
                  </p>

                  <p
                     className='font-mono leading-relaxed'
                     style={{
                        fontSize: '13px',
                        color: '#555555',
                     }}
                  >
                     This isn't a pitch competition. It's not an accelerator.
                     It's not a hackathon. You're building a company — selling
                     to real customers from day one.
                  </p>

                  <p
                     className='font-mono leading-relaxed'
                     style={{
                        fontSize: '13px',
                        color: '#555555',
                     }}
                  >
                     At the end of 8 weeks, you either have a startup with
                     paying customers, or you don't. That's the only metric that
                     matters.
                  </p>
               </div>

               {/* Core Specs - With watermark numbers and enhanced hover */}
               <div className='mb-6 labs-reveal'>
                  <Label>// Core Specs</Label>
               </div>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-20'>
                  <div
                     className='labs-reveal group p-10 bg-gray-50 border border-t-2 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] cursor-default'
                     style={{
                        borderTopColor: 'var(--labs-accent)',
                        borderColor: 'rgba(0,0,0,0.08)',
                        transitionDelay: '0ms',
                     }}
                  >
                     <div
                        className='absolute left-0 top-0 font-display font-black text-[120px] leading-none opacity-[0.04] pointer-events-none select-none transition-all duration-500 group-hover:opacity-[0.08] group-hover:scale-110'
                        style={{ color: 'var(--labs-accent)' }}
                     >
                        01
                     </div>
                     <div className='relative z-10'>
                        <div
                           className='font-black uppercase mb-4 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                           style={{
                              fontSize: 'var(--labs-size-heading-sm)',
                              color: '#000000',
                           }}
                        >
                           8 Weeks
                        </div>
                        <div
                           className='font-mono leading-relaxed transition-colors duration-300 group-hover:text-[#000000]'
                           style={{ fontSize: '12px', color: '#555555' }}
                        >
                           Not 6 months. Not a semester. 8 intense weeks to
                           build, test, iterate, and sell. If you can't ship
                           something meaningful in 8 weeks, you won't ship it in
                           8 months.
                        </div>
                     </div>
                  </div>

                  <div
                     className='labs-reveal group p-10 bg-gray-50 border border-t-2 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] cursor-default'
                     style={{
                        borderTopColor: 'var(--labs-accent)',
                        borderColor: 'rgba(0,0,0,0.08)',
                        transitionDelay: '100ms',
                     }}
                  >
                     <div
                        className='absolute left-0 top-0 font-display font-black text-[120px] leading-none opacity-[0.04] pointer-events-none select-none transition-all duration-500 group-hover:opacity-[0.08] group-hover:scale-110'
                        style={{ color: 'var(--labs-accent)' }}
                     >
                        02
                     </div>
                     <div className='relative z-10'>
                        <div
                           className='font-black uppercase mb-4 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                           style={{
                              fontSize: 'var(--labs-size-heading-sm)',
                              color: '#000000',
                           }}
                        >
                           Student-Run
                        </div>
                        <div
                           className='font-mono leading-relaxed transition-colors duration-300 group-hover:text-[#000000]'
                           style={{ fontSize: '12px', color: '#555555' }}
                        >
                           Built by students, for students. No corporate
                           sponsors dictating direction. No professors grading
                           deliverables. Just founders helping founders build
                           real companies.
                        </div>
                     </div>
                  </div>

                  <div
                     className='labs-reveal group p-10 bg-gray-50 border border-t-2 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] cursor-default'
                     style={{
                        borderTopColor: 'var(--labs-accent)',
                        borderColor: 'rgba(0,0,0,0.08)',
                        transitionDelay: '200ms',
                     }}
                  >
                     <div
                        className='absolute left-0 top-0 font-display font-black text-[120px] leading-none opacity-[0.04] pointer-events-none select-none transition-all duration-500 group-hover:opacity-[0.08] group-hover:scale-110'
                        style={{ color: 'var(--labs-accent)' }}
                     >
                        03
                     </div>
                     <div className='relative z-10'>
                        <div
                           className='font-black uppercase mb-4 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                           style={{
                              fontSize: 'var(--labs-size-heading-sm)',
                              color: '#000000',
                           }}
                        >
                           Real Problems
                        </div>
                        <div
                           className='font-mono leading-relaxed transition-colors duration-300 group-hover:text-[#000000]'
                           style={{ fontSize: '12px', color: '#555555' }}
                        >
                           Sourced directly from hospitals, clinics, and
                           healthcare organizations. Problems that exist right
                           now, in the real world, with real consequences if
                           nobody solves them.
                        </div>
                     </div>
                  </div>

                  <div
                     className='labs-reveal group p-10 bg-gray-50 border border-t-2 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] cursor-default'
                     style={{
                        borderTopColor: 'var(--labs-accent)',
                        borderColor: 'rgba(0,0,0,0.08)',
                        transitionDelay: '300ms',
                     }}
                  >
                     <div
                        className='absolute left-0 top-0 font-display font-black text-[120px] leading-none opacity-[0.04] pointer-events-none select-none transition-all duration-500 group-hover:opacity-[0.08] group-hover:scale-110'
                        style={{ color: 'var(--labs-accent)' }}
                     >
                        04
                     </div>
                     <div className='relative z-10'>
                        <div
                           className='font-black uppercase mb-4 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                           style={{
                              fontSize: 'var(--labs-size-heading-sm)',
                              color: '#000000',
                           }}
                        >
                           Your Startup
                        </div>
                        <div
                           className='font-mono leading-relaxed transition-colors duration-300 group-hover:text-[#000000]'
                           style={{ fontSize: '12px', color: '#555555' }}
                        >
                           You build it. You own it. 100% of the equity. We're
                           not taking a cut. We're not "partnering." This is
                           your company.
                        </div>
                     </div>
                  </div>
               </div>

               {/* Timeline - Alternating Design */}
               <div className='mb-12 labs-reveal'>
                  <Label>// Program Timeline</Label>
               </div>
               <div className='relative'>
                  {/* Center line */}
                  <div
                     className='hidden md:block absolute left-1/2 top-0 bottom-0 w-px -ml-px'
                     style={{ background: 'rgba(0,0,0,0.1)' }}
                  ></div>

                  {/* Mobile line */}
                  <div
                     className='md:hidden absolute left-6 top-0 bottom-0 w-px'
                     style={{ background: 'rgba(0,0,0,0.1)' }}
                  ></div>

                  {timelineItems.map((item, index) => {
                     const isLeft = index % 2 === 0;
                     return (
                        <div
                           key={index}
                           className={`labs-reveal group relative pb-24 ${item.isLast ? 'pb-0' : ''}`}
                           style={{ transitionDelay: `${index * 80}ms` }}
                           onMouseEnter={() => setHoveredIndex(index)}
                           onMouseLeave={() => setHoveredIndex(null)}
                        >
                           {/* Desktop Layout */}
                           <div className='hidden md:block'>
                              <div className='grid grid-cols-2 gap-12 items-start relative'>
                                 {/* Left side content (for even indices) */}
                                 {isLeft && (
                                    <div className='text-right pr-8'>
                                       <div
                                          className='p-8 bg-gray-50 border group-hover:border-[var(--labs-accent)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] border-l-2'
                                          style={{
                                             borderLeftColor:
                                                hoveredIndex === index
                                                   ? 'var(--labs-accent)'
                                                   : 'transparent',
                                             borderColor: 'rgba(0,0,0,0.08)',
                                          }}
                                       >
                                          <div className='mb-3'>
                                             <Label className='transition-colors duration-300 group-hover:text-[var(--labs-accent)]'>
                                                {item.week} · {item.tag}
                                             </Label>
                                          </div>
                                          <h3
                                             className='font-black uppercase mb-3 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                                             style={{
                                                fontSize:
                                                   'var(--labs-size-heading-sm)',
                                                color: '#000000',
                                             }}
                                          >
                                             {item.title}
                                          </h3>
                                          <p
                                             className='font-mono leading-relaxed transition-colors duration-300 group-hover:text-[#000000]'
                                             style={{
                                                fontSize: '12px',
                                                color: '#555555',
                                             }}
                                          >
                                             {item.desc}
                                          </p>
                                       </div>
                                    </div>
                                 )}

                                 {/* Empty space when content is on opposite side */}
                                 {!isLeft && <div></div>}

                                 {/* Right side content (for odd indices) */}
                                 {!isLeft && (
                                    <div className='text-left pl-8'>
                                       <div
                                          className='p-8 bg-gray-50 border group-hover:border-[var(--labs-accent)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] border-l-2'
                                          style={{
                                             borderLeftColor:
                                                hoveredIndex === index
                                                   ? 'var(--labs-accent)'
                                                   : 'transparent',
                                             borderColor: 'rgba(0,0,0,0.08)',
                                          }}
                                       >
                                          <div className='mb-3'>
                                             <Label className='transition-colors duration-300 group-hover:text-[var(--labs-accent)]'>
                                                {item.week} · {item.tag}
                                             </Label>
                                          </div>
                                          <h3
                                             className='font-black uppercase mb-3 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                                             style={{
                                                fontSize:
                                                   'var(--labs-size-heading-sm)',
                                                color: '#000000',
                                             }}
                                          >
                                             {item.title}
                                          </h3>
                                          <p
                                             className='font-mono leading-relaxed transition-colors duration-300 group-hover:text-[#000000]'
                                             style={{
                                                fontSize: '12px',
                                                color: '#555555',
                                             }}
                                          >
                                             {item.desc}
                                          </p>
                                       </div>
                                    </div>
                                 )}

                                 {/* Center dot */}
                                 <div className='absolute left-1/2 top-0 w-3 h-3 -ml-[6px]'>
                                    <div
                                       className='absolute inset-0 rounded-full border-2 transition-all duration-300 group-hover:scale-150 group-hover:border-[var(--labs-accent)] group-hover:bg-[var(--labs-accent)]'
                                       style={{
                                          borderColor: '#CCCCCC',
                                          background: '#ffffff',
                                       }}
                                    ></div>
                                    <div
                                       className='absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping'
                                       style={{
                                          background: 'var(--labs-accent)',
                                       }}
                                    ></div>
                                 </div>
                              </div>
                           </div>

                           {/* Mobile Layout */}
                           <div className='md:hidden pl-16'>
                              <div
                                 className='p-6 bg-gray-50 border group-hover:border-[var(--labs-accent)] transition-all duration-300 border-l-2'
                                 style={{
                                    borderLeftColor:
                                       hoveredIndex === index
                                          ? 'var(--labs-accent)'
                                          : 'transparent',
                                    borderColor: 'rgba(0,0,0,0.08)',
                                 }}
                              >
                                 <div className='mb-2'>
                                    <Label className='transition-colors duration-300 group-hover:text-[var(--labs-accent)]'>
                                       {item.week} · {item.tag}
                                    </Label>
                                 </div>
                                 <h3
                                    className='font-black uppercase mb-2 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                                    style={{
                                       fontSize: 'var(--labs-size-heading-sm)',
                                       color: '#000000',
                                    }}
                                 >
                                    {item.title}
                                 </h3>
                                 <p
                                    className='font-mono leading-relaxed transition-colors duration-300 group-hover:text-[#000000]'
                                    style={{
                                       fontSize: '12px',
                                       color: '#555555',
                                    }}
                                 >
                                    {item.desc}
                                 </p>
                              </div>

                              {/* Mobile dot */}
                              <div className='absolute left-6 top-0 w-3 h-3 -ml-[6px]'>
                                 <div
                                    className='absolute inset-0 rounded-full border-2 transition-all duration-300 group-hover:scale-150 group-hover:border-[var(--labs-accent)] group-hover:bg-[var(--labs-accent)]'
                                    style={{
                                       borderColor: '#CCCCCC',
                                       background: '#ffffff',
                                    }}
                                 ></div>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </section>
   );
}

// The Experience Section
function TheExperienceSection() {
   return (
      <section
         className='labs-reveal relative py-32 overflow-hidden'
         style={{
            background: 'var(--labs-bg)',
         }}
      >
         {/* Noise texture */}
         <NoiseTexture noiseOpacity={0.25} />

         {/* Gradient blobs */}
         <div className='absolute inset-0 pointer-events-none z-[1]'>
            <div
               className='absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background:
                     'radial-gradient(circle, rgba(251,146,60,0.25) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute bottom-1/3 right-1/3 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background:
                     'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
               }}
            ></div>
         </div>

         <div className='max-w-[1400px] mx-auto px-6 md:px-12 relative z-10'>
            <div className='max-w-5xl mx-auto'>
               {/* Section Header */}
               <SectionHeader>// The experience</SectionHeader>

               {/* Headline */}
               <h2
                  className='labs-heading text-[clamp(32px,5vw,56px)] leading-[1.1] mb-8 text-center'
                  style={{ color: 'var(--labs-text-primary)' }}
               >
                  What it actually feels like.
               </h2>

               {/* Body text */}
               <div className='max-w-2xl mx-auto mb-12 text-center'>
                  <p
                     className='font-mono leading-relaxed'
                     style={{
                        fontSize: '13px',
                        color: 'var(--labs-text-body)',
                     }}
                  >
                     You pitch. You get roasted. You improve. You ship.
                     <br />
                     Last cohort had 120+ people in the room on demo day.
                  </p>
               </div>

               {/* Video embed */}
               <div className='aspect-video w-full max-w-4xl mx-auto'>
                  <iframe
                     src='https://drive.google.com/file/d/1HQK9_Kry5IDKO2OHlfFuNbhQ2kH8nNGO/preview'
                     className='w-full h-full border'
                     style={{ borderColor: 'var(--labs-border)' }}
                     allow='autoplay'
                  ></iframe>
               </div>
            </div>
         </div>
      </section>
   );
}

// Proof Callout Section - Visual break with stats
function ProofCalloutSection() {
   return (
      <section
         className='labs-reveal relative py-20 overflow-hidden'
         style={{
            background: '#f5f5f5',
            borderColor: 'rgba(0,0,0,0.1)',
         }}
      >
         {/* Noise texture */}
         <NoiseTexture noiseOpacity={0.15} className='opacity-30' />

         {/* Gradient blobs */}
         <div className='absolute inset-0 pointer-events-none z-[1]'>
            <div
               className='absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px]'
               style={{
                  background:
                     'radial-gradient(circle, rgba(34,197,94,0.35) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]'
               style={{
                  background:
                     'radial-gradient(circle, rgba(45,212,191,0.3) 0%, transparent 70%)',
               }}
            ></div>
         </div>

         <div className='max-w-[1400px] mx-auto px-6 md:px-12 relative z-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
               {/* Left: Image */}
               <div
                  className='labs-reveal relative aspect-[16/10] overflow-hidden border group'
                  style={{ borderColor: 'rgba(0,0,0,0.15)' }}
               >
                  <img
                     src='/labs/images/award.png'
                     alt='Bavarian Best Practice Award'
                     className='w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent'></div>
                  <div className='absolute bottom-6 left-6 right-6'>
                     <div className='mb-2'>
                        <Label style={{ color: 'var(--labs-accent)' }}>
                           // GovTech Edition 2025
                        </Label>
                     </div>
                     <h3
                        className='labs-heading'
                        style={{
                           fontSize: 'var(--labs-size-heading-sm)',
                           color: 'var(--labs-text-primary)',
                        }}
                     >
                        Bavarian Best Practice Award Winner
                     </h3>
                  </div>
               </div>

               {/* Right: Stats */}
               <div className='space-y-8'>
                  <div>
                     <div className='mb-3'>
                        <Label style={{ color: '#555555' }}>
                           // Proof of concept
                        </Label>
                     </div>
                     <h3
                        className='labs-heading mb-4'
                        style={{
                           fontSize: 'var(--labs-size-heading-md)',
                           color: '#000000',
                        }}
                     >
                        We've done this before.
                     </h3>
                     <p
                        className='leading-relaxed font-mono'
                        style={{ fontSize: '12px', color: '#555555' }}
                     >
                        GovTech Edition 2025 produced 3 working startups in 8
                        weeks. Real problems from municipalities. Real solutions
                        that shipped. We won the Bavarian Best Practice Award
                        for it.
                     </p>
                  </div>

                  <div className='grid grid-cols-3 gap-6'>
                     <div
                        className='labs-reveal group p-6 text-center transition-all duration-300 hover:-translate-y-1 border bg-white'
                        style={{
                           transitionDelay: '0ms',
                           borderColor: 'rgba(0,0,0,0.1)',
                        }}
                     >
                        <div
                           className='labs-heading text-5xl mb-2 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                           style={{ color: '#000000' }}
                        >
                           3
                        </div>
                        <div
                           className='font-mono text-[10px] uppercase tracking-[0.15em]'
                           style={{ color: '#888888' }}
                        >
                           Startups
                        </div>
                     </div>
                     <div
                        className='labs-reveal group p-6 text-center transition-all duration-300 hover:-translate-y-1 border bg-white'
                        style={{
                           transitionDelay: '100ms',
                           borderColor: 'rgba(0,0,0,0.1)',
                        }}
                     >
                        <div
                           className='labs-heading text-5xl mb-2 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                           style={{ color: '#000000' }}
                        >
                           8
                        </div>
                        <div
                           className='font-mono text-[10px] uppercase tracking-[0.15em]'
                           style={{ color: '#888888' }}
                        >
                           Weeks
                        </div>
                     </div>
                     <div
                        className='labs-reveal group p-6 text-center transition-all duration-300 hover:-translate-y-1 border bg-white'
                        style={{
                           transitionDelay: '200ms',
                           borderColor: 'rgba(0,0,0,0.1)',
                        }}
                     >
                        <div
                           className='labs-heading text-5xl mb-2 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                           style={{ color: '#000000' }}
                        >
                           1
                        </div>
                        <div
                           className='font-mono text-[10px] uppercase tracking-[0.15em]'
                           style={{ color: '#888888' }}
                        >
                           Award
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

// Criteria Section
function CriteriaSection() {
   return (
      <section
         className='labs-reveal relative py-32 overflow-hidden'
         style={{ background: 'var(--labs-bg)' }}
      >
         {/* Noise texture */}
         <NoiseTexture noiseOpacity={0.25} />

         {/* Background decorative images */}
         <div className='absolute inset-0 opacity-[0.04] pointer-events-none'>
            <div className='absolute left-0 top-1/4 w-[400px] h-[300px]'>
               <img
                  src='/labs/images/demoday.jpg'
                  alt=''
                  className='w-full h-full object-cover mix-blend-screen'
               />
            </div>
         </div>

         <div className='max-w-[1400px] mx-auto px-6 md:px-12 relative z-10'>
            <div className='max-w-5xl mx-auto'>
               {/* Section Header */}
               <SectionHeader>// Candidate profile</SectionHeader>

               <div className='mb-12 text-center'>
                  <h2
                     className='labs-heading mb-6'
                     style={{ fontSize: 'var(--labs-size-heading-lg)' }}
                  >
                     Are you the one?
                  </h2>
                  <div
                     className='font-mono'
                     style={{
                        fontSize: '12px',
                        color: 'var(--labs-text-body)',
                     }}
                  >
                     // No MedTech experience needed. No connections required.
                     Just the right mindset.
                  </div>
               </div>

               {/* Role pills */}
               <div className='flex flex-wrap items-center justify-center gap-3 mb-10'>
                  {['Builders', 'Engineers', 'Designers', 'Sellers', 'Clinicians'].map((role) => (
                     <div
                        key={role}
                        className='font-mono uppercase tracking-wider px-4 py-2 border'
                        style={{
                           fontSize: '11px',
                           color: 'var(--labs-text-body)',
                           borderColor: 'var(--labs-border)',
                           background: 'rgba(255,255,255,0.02)',
                        }}
                     >
                        {role}
                     </div>
                  ))}
               </div>

               {/* Criteria Grid */}
               <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
                  {/* Apply If */}
                  <div
                     className='labs-reveal group relative overflow-hidden transition-all duration-300'
                  >
                     {/* Top accent bar - green */}
                     <div
                        className='absolute top-0 left-0 right-0 h-[2px]'
                        style={{ background: '#10b981' }}
                     ></div>

                     <div className='pt-8 pb-10 px-0'>
                        <div className='mb-10'>
                           <div
                              className='font-mono uppercase tracking-[0.2em] mb-3'
                              style={{ fontSize: '10px', color: '#10b981', letterSpacing: '0.2em' }}
                           >
                              Apply if
                           </div>
                        </div>

                        <div className='space-y-7'>
                           <div className='border-l-2 border-white/5 pl-5 transition-all duration-300 hover:border-white/15'>
                              <div
                                 className='font-mono font-semibold mb-2'
                                 style={{
                                    color: 'var(--labs-text-primary)',
                                    fontSize: '13px',
                                    lineHeight: '1.5',
                                 }}
                              >
                                 Hard problems energize you.
                              </div>
                              <div
                                 className='font-mono leading-relaxed'
                                 style={{
                                    fontSize: '12px',
                                    color: 'var(--labs-text-body)',
                                    lineHeight: '1.6',
                                 }}
                              >
                                 You don't quit when things get tough. You get obsessed.
                              </div>
                           </div>

                           <div className='border-l-2 border-white/5 pl-5 transition-all duration-300 hover:border-white/15'>
                              <div
                                 className='font-mono font-semibold mb-2'
                                 style={{
                                    color: 'var(--labs-text-primary)',
                                    fontSize: '13px',
                                    lineHeight: '1.5',
                                 }}
                              >
                                 The status quo makes you angry.
                              </div>
                              <div
                                 className='font-mono leading-relaxed'
                                 style={{
                                    fontSize: '12px',
                                    color: 'var(--labs-text-body)',
                                    lineHeight: '1.6',
                                 }}
                              >
                                 You see broken systems and think "I can fix this."
                              </div>
                           </div>

                           <div className='border-l-2 border-white/5 pl-5 transition-all duration-300 hover:border-white/15'>
                              <div
                                 className='font-mono font-semibold mb-2'
                                 style={{
                                    color: 'var(--labs-text-primary)',
                                    fontSize: '13px',
                                    lineHeight: '1.5',
                                 }}
                              >
                                 You have fire. Not just interest.
                              </div>
                              <div
                                 className='font-mono leading-relaxed'
                                 style={{
                                    fontSize: '12px',
                                    color: 'var(--labs-text-body)',
                                    lineHeight: '1.6',
                                 }}
                              >
                                 Genuine, can't-sleep-at-night passion for building things that matter.
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Don't Apply If */}
                  <div
                     className='labs-reveal group relative overflow-hidden transition-all duration-300'
                     style={{ transitionDelay: '100ms' }}
                  >
                     {/* Top accent bar - red */}
                     <div
                        className='absolute top-0 left-0 right-0 h-[2px]'
                        style={{ background: '#ef4444' }}
                     ></div>

                     <div className='pt-8 pb-10 px-0'>
                        <div className='mb-10'>
                           <div
                              className='font-mono uppercase tracking-[0.2em] mb-3'
                              style={{ fontSize: '10px', color: '#ef4444', letterSpacing: '0.2em' }}
                           >
                              Don't apply if
                           </div>
                        </div>

                        <div className='space-y-7'>
                           <div className='border-l-2 border-white/5 pl-5 transition-all duration-300 hover:border-white/15'>
                              <div
                                 className='font-mono font-semibold mb-2'
                                 style={{
                                    color: 'var(--labs-text-primary)',
                                    fontSize: '13px',
                                    lineHeight: '1.5',
                                 }}
                              >
                                 Your calendar is already drowning.
                              </div>
                              <div
                                 className='font-mono leading-relaxed'
                                 style={{
                                    fontSize: '12px',
                                    color: 'var(--labs-text-body)',
                                    lineHeight: '1.6',
                                 }}
                              >
                                 We need 10+ hours per week of real commitment.
                              </div>
                           </div>

                           <div className='border-l-2 border-white/5 pl-5 transition-all duration-300 hover:border-white/15'>
                              <div
                                 className='font-mono font-semibold mb-2'
                                 style={{
                                    color: 'var(--labs-text-primary)',
                                    fontSize: '13px',
                                    lineHeight: '1.5',
                                 }}
                              >
                                 You want a cozy lecture series.
                              </div>
                              <div
                                 className='font-mono leading-relaxed'
                                 style={{
                                    fontSize: '12px',
                                    color: 'var(--labs-text-body)',
                                    lineHeight: '1.6',
                                 }}
                              >
                                 This is hands-on, messy, and real.
                              </div>
                           </div>

                           <div className='border-l-2 border-white/5 pl-5 transition-all duration-300 hover:border-white/15'>
                              <div
                                 className='font-mono font-semibold mb-2'
                                 style={{
                                    color: 'var(--labs-text-primary)',
                                    fontSize: '13px',
                                    lineHeight: '1.5',
                                 }}
                              >
                                 You're collecting badges for your CV.
                              </div>
                              <div
                                 className='font-mono leading-relaxed'
                                 style={{
                                    fontSize: '12px',
                                    color: 'var(--labs-text-body)',
                                    lineHeight: '1.6',
                                 }}
                              >
                                 Build something you actually care about, or don't apply.
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Edge Cases + Visual */}
               <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div
                     className='labs-reveal group border-l-2 pl-8 labs-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--labs-accent)]'
                     style={{ borderColor: 'var(--labs-border)' }}
                  >
                     <div
                        className='font-mono leading-relaxed'
                        style={{
                           fontSize: '12px',
                           color: 'var(--labs-text-body)',
                        }}
                     >
                        // Don't fit these boxes? You might be exactly who we
                        need.{' '}
                        <a
                           href='https://tally.so/r/n9Axzp'
                           target='_blank'
                           rel='noopener'
                           style={{ color: 'var(--labs-accent)' }}
                           className='font-semibold underline hover:opacity-80 transition-opacity duration-300'
                        >
                           Apply anyway. →
                        </a>
                     </div>
                  </div>

                  {/* Visual proof image */}
                  <div
                     className='labs-reveal group relative aspect-[16/10] overflow-hidden border'
                     style={{
                        borderColor: 'var(--labs-border)',
                        transitionDelay: '100ms',
                     }}
                  >
                     <img
                        src='/labs/images/partner.jpg'
                        alt='Past participants'
                        className='w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500'
                     />
                     <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
                     <div className='absolute bottom-4 left-4'>
                        <Label style={{ color: 'var(--labs-text-primary)' }}>
                           // GovTech 2025
                        </Label>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

// Proof Section
function ProofSection() {
   return (
      <section
         id='proof'
         className='labs-reveal py-32 '
         style={{
            background: 'var(--labs-bg)',
         }}
      >
         <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
            <div className='max-w-5xl mx-auto'>
               {/* Section Header */}
               <SectionHeader>// Section 04: Proof of Concept</SectionHeader>

               <div className='mb-20'>
                  <h2
                     className='labs-heading mb-4'
                     style={{ fontSize: 'var(--labs-size-heading-md)' }}
                  >
                     We successfully ran{' '}
                     <span style={{ color: 'var(--labs-text-body)' }}>
                        GovTech Edition
                     </span>{' '}
                     in 2025.
                  </h2>
               </div>

               {/* Stats Grid */}
               <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-20'>
                  <div className='p-12 text-center labs-card'>
                     <div className='labs-heading text-6xl mb-3'>3</div>
                     <div className='labs-meta'>Challenges</div>
                  </div>
                  <div className='p-12 text-center labs-card'>
                     <div className='labs-heading text-6xl mb-3'>3</div>
                     <div className='labs-meta'>Startups</div>
                  </div>
                  <div className='p-12 text-center labs-card'>
                     <div className='labs-heading text-6xl mb-3'>1</div>
                     <div className='labs-meta'>
                        Bavarian Best Practice Award
                     </div>
                  </div>
               </div>

               {/* Image Carousel */}
               <div className='mb-20'>
                  <div className='text-center mb-8'>
                     <Label>// Program Archive 2025</Label>
                  </div>

                  <div className='flex md:hidden items-center gap-2 px-6 mb-4 labs-meta'>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-3 h-3'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                     >
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth='2'
                           d='M9 5l7 7-7 7'
                        />
                     </svg>
                     <span>Swipe</span>
                  </div>

                  <div className='flex gap-6 overflow-x-auto pb-4 carousel-scroll'>
                     {[
                        'letter.JPG',
                        'demoday.jpg',
                        'award.png',
                        'winner.jpg',
                        'partner.jpg',
                     ].map((img, i) => (
                        <div
                           key={i}
                           className='flex-shrink-0 w-[400px] h-[250px] relative group overflow-hidden border'
                           style={{ borderColor: 'var(--labs-border)' }}
                        >
                           <img
                              src={`/labs/images/${img}`}
                              alt={`Archive ${i + 1}`}
                              className='w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500'
                           />
                           <div
                              className='absolute top-3 left-3 labs-meta px-2 py-1'
                              style={{ background: 'rgba(0,0,0,0.9)' }}
                           >
                              {String(i + 1).padStart(2, '0')}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Project Grid */}
               <div>
                  <div className='mb-8'>
                     <Label>// Deliverables</Label>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                     <div className='p-10 group labs-card transition-all duration-300'>
                        <div className='labs-meta mb-4'>
                           Landratsamt Traunstein
                        </div>
                        <div
                           className='labs-heading mb-3 group-hover:opacity-70 transition-opacity'
                           style={{ fontSize: 'var(--labs-size-heading-sm)' }}
                        >
                           DataNexus
                        </div>
                        <div className='labs-body leading-relaxed'>
                           GDPR-compliant platform.
                           <br />3 days saved per user yearly.
                        </div>
                     </div>

                     <div className='p-10 group labs-card transition-all duration-300'>
                        <div className='labs-meta mb-4'>BayKommun</div>
                        <div
                           className='labs-heading mb-3 group-hover:opacity-70 transition-opacity'
                           style={{ fontSize: 'var(--labs-size-heading-sm)' }}
                        >
                           DiviData
                        </div>
                        <div className='labs-body leading-relaxed'>
                           Built for a sector where
                           <br />
                           70% of digital projects fail.
                        </div>
                     </div>

                     <div className='p-10 group labs-card transition-all duration-300'>
                        <div className='labs-meta mb-4'>Stadt Landshut</div>
                        <div
                           className='labs-heading mb-3 group-hover:opacity-70 transition-opacity'
                           style={{ fontSize: 'var(--labs-size-heading-sm)' }}
                        >
                           FileFlow
                        </div>
                        <div className='labs-body leading-relaxed'>
                           Automated letter pipeline.
                           <br />
                           €160,000 annual savings.
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

// How to Apply Section
function HowToApplySection() {
   return (
      <section
         className='labs-reveal relative py-32 overflow-hidden'
         style={{ background: '#ffffff' }}
      >
         {/* Noise texture */}
         <NoiseTexture noiseOpacity={0.15} className='opacity-30' />

         {/* Gradient blobs */}
         <div className='absolute inset-0 pointer-events-none z-[1]'>
            <div
               className='absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background:
                     'radial-gradient(circle, rgba(45,212,191,0.25) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background:
                     'radial-gradient(circle, rgba(234,179,8,0.2) 0%, transparent 70%)',
               }}
            ></div>
         </div>

         <div className='max-w-[1400px] mx-auto px-6 md:px-12 relative z-10'>
            <div className='max-w-5xl mx-auto text-center'>
               {/* Section Header */}
               <div className='mb-20'>
                  <span
                     className='font-mono uppercase tracking-[0.15em]'
                     style={{ fontSize: '16px', color: 'var(--labs-accent)' }}
                  >
                     // How to apply
                  </span>
               </div>

               {/* Headline */}
               <h2
                  className='labs-heading text-[clamp(32px,5vw,56px)] leading-[1.1] mb-8'
                  style={{ color: '#000000' }}
               >
                  Super simple.
               </h2>

               {/* Body */}
               <div className='max-w-2xl mx-auto mb-12'>
                  <p
                     className='font-mono leading-relaxed'
                     style={{ fontSize: '13px', color: '#555555' }}
                  >
                     Fill out a short written application. If we like what we
                     read, we'll reach out for a quick interview.
                  </p>
                  <p
                     className='font-mono leading-relaxed mt-4'
                     style={{ fontSize: '13px', color: '#555555' }}
                  >
                     We review on a rolling basis — the sooner you apply, the
                     sooner we can meet. Deadline is 30 April 2026.
                  </p>
               </div>

               {/* CTA */}
               <a
                  href='https://tally.so/r/n9Axzp'
                  target='_blank'
                  rel='noopener'
                  className='group relative inline-block font-mono text-xs font-semibold uppercase tracking-[0.15em] px-12 py-4 border overflow-hidden transition-all duration-300'
                  style={{
                     borderColor: 'var(--labs-accent)',
                     color: 'var(--labs-accent)',
                  }}
               >
                  <span className='relative z-10 transition-colors duration-300 group-hover:text-black'>
                     Apply Now
                  </span>
                  <div
                     className='absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out'
                     style={{ background: 'var(--labs-accent)' }}
                  ></div>
               </a>
            </div>
         </div>
      </section>
   );
}

// Apply Section
function ApplySection() {
   return (
      <section
         id='apply'
         className='labs-reveal relative py-32 overflow-hidden scroll-mt-20'
         style={{
            background: 'var(--labs-bg)',
         }}
      >
         {/* Animated background gradient blobs */}
         <div className='absolute inset-0 pointer-events-none z-[1]'>
            <div
               className='absolute top-1/2 left-1/4 w-96 h-96 rounded-full blur-[120px] animate-blob'
               style={{
                  background:
                     'radial-gradient(circle, rgba(45,212,191,0.3) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute top-1/2 right-1/4 w-96 h-96 rounded-full blur-[120px] animate-blob animation-delay-2000'
               style={{
                  background:
                     'radial-gradient(circle, rgba(168,85,247,0.28) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full blur-[120px] animate-blob animation-delay-4000'
               style={{
                  background:
                     'radial-gradient(circle, rgba(234,179,8,0.25) 0%, transparent 70%)',
               }}
            ></div>
         </div>

         {/* Rocket image - prominent but tasteful */}
         <div className='absolute inset-0 pointer-events-none'>
            <div className='absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.03]'>
               <img
                  src='/labs/images/rocket.png'
                  alt=''
                  className='w-full h-full object-contain'
               />
            </div>
         </div>

         <div className='max-w-[1400px] mx-auto px-6 md:px-12 text-center relative z-10'>
            <div className='max-w-5xl mx-auto'>
               <h2
                  className='labs-heading text-[clamp(36px,6vw,64px)] leading-[0.95] mb-16'
                  style={{ color: 'var(--labs-text-primary)' }}
               >
                  Stop reading.
                  <br />
                  <span style={{ color: 'var(--labs-accent)' }}>
                     Start building.
                  </span>
               </h2>

               <a
                  href='https://tally.so/r/n9Axzp'
                  target='_blank'
                  rel='noopener'
                  className='group relative inline-block font-mono text-xs font-semibold uppercase tracking-[0.15em] px-12 py-4 border overflow-hidden transition-all duration-300'
                  style={{
                     borderColor: 'var(--labs-accent)',
                     color: 'var(--labs-accent)',
                  }}
               >
                  <span className='relative z-10 transition-colors duration-300 group-hover:text-black'>
                     Apply Now
                  </span>
                  <div
                     className='absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out'
                     style={{ background: 'var(--labs-accent)' }}
                  ></div>
               </a>
            </div>
         </div>
      </section>
   );
}

// FAQ Section
function FAQSection() {
   const [openIndex, setOpenIndex] = useState<number | null>(null);

   const faqs = [
      {
         q: 'Do I need an idea to apply?',
         a: (
            <>
               <span style={{ color: 'var(--labs-accent)' }}>No.</span> The
               challenges come directly from hospitals, clinicians, researchers,
               and health-tech partners. We've already scoped the real problems.
               You bring the skills.
            </>
         ),
      },
      {
         q: 'Is this paid?',
         a: (
            <>
               Not in salary. But you'll work on{' '}
               <span style={{ color: 'var(--labs-accent)' }}>
                  real healthcare challenges
               </span>
               , build a working MVP, get hands-on mentorship, and have a shot
               at your{' '}
               <span style={{ color: 'var(--labs-accent)' }}>
                  first paying customer
               </span>
               . If that's not enough, this probably isn't for you.
            </>
         ),
      },
      {
         q: 'Do we have to give up equity?',
         a: (
            <>
               <span style={{ color: 'var(--labs-accent)' }}>No.</span> Your
               product, your pitch, your decision.{' '}
               <span style={{ color: 'var(--labs-accent)' }}>
                  Whoever builds, owns.
               </span>
            </>
         ),
      },
      {
         q: 'Do I need MedTech experience?',
         a: (
            <>
               <span style={{ color: 'var(--labs-accent)' }}>No.</span> We
               provide domain access, clinical partners, and problem context.
               You just need the skills and the drive to solve hard problems.
            </>
         ),
      },
      {
         q: 'Do I have to speak German?',
         a: (
            <>
               It helps on the business and sales side. If you're focused on
               tech or design, English is fine.
            </>
         ),
      },
      {
         q: 'Can I participate online?',
         a: (
            <>
               <span style={{ color: 'var(--labs-accent)' }}>No.</span> We go
               out and touch grass. In-person only, Munich.
            </>
         ),
      },
      {
         q: 'Do I have to be a student?',
         a: (
            <>
               Nope. Recent graduates and young professionals are welcome. No
               hard cut-off. If you're at the start of your career and want to
               build something real,{' '}
               <span style={{ color: 'var(--labs-accent)' }}>
                  we want you in
               </span>
               .
            </>
         ),
      },
      {
         q: 'Can I do it next to studying?',
         a: (
            <>
               Yes — but be realistic. If you're taking 6+ courses and a working
               student job, it might be a stretch. The{' '}
               <span style={{ color: 'var(--labs-accent)' }}>
                  more time you put in, the more you get out
               </span>
               .
            </>
         ),
      },
      {
         q: 'Can I do it next to a working student job?',
         a: (
            <>
               It depends. Some manage both, especially if they can adjust
               hours. Just be{' '}
               <span style={{ color: 'var(--labs-accent)' }}>
                  honest with yourself
               </span>{' '}
               about your capacity.
            </>
         ),
      },
   ];

   return (
      <section
         id='faq'
         className='labs-reveal relative py-32 scroll-mt-20 overflow-hidden'
         style={{
            background: 'var(--labs-bg)',
         }}
      >
         {/* Noise texture */}
         <NoiseTexture noiseOpacity={0.25} />

         {/* Gradient blobs */}
         <div className='absolute inset-0 pointer-events-none z-[1]'>
            <div
               className='absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background:
                     'radial-gradient(circle, rgba(251,146,60,0.3) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background:
                     'radial-gradient(circle, rgba(45,212,191,0.3) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-[120px]'
               style={{
                  background:
                     'radial-gradient(circle, rgba(167,139,250,0.28) 0%, transparent 70%)',
               }}
            ></div>
         </div>

         <div className='max-w-[1400px] mx-auto px-6 md:px-12 relative z-10'>
            <div className='max-w-5xl mx-auto'>
               {/* Section Header */}
               <SectionHeader>// Frequently asked</SectionHeader>

               <h2
                  className='labs-heading mb-8'
                  style={{ fontSize: 'var(--labs-size-heading-md)' }}
               >
                  Got questions?
               </h2>

               {/* Featured image */}
               <div
                  className='labs-reveal mb-16 relative aspect-[21/9] overflow-hidden border group'
                  style={{ borderColor: 'var(--labs-border)' }}
               >
                  <img
                     src='/labs/images/letter.JPG'
                     alt='Program details'
                     className='w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700'
                  />
                  <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent'></div>
                  <div className='absolute left-8 top-1/2 -translate-y-1/2'>
                     <Label
                        className='mb-2 block'
                        style={{ color: 'var(--labs-accent)' }}
                     >
                        // Everything you need to know
                     </Label>
                     <div
                        className='labs-heading'
                        style={{
                           fontSize: 'var(--labs-size-heading-sm)',
                           color: 'var(--labs-text-primary)',
                        }}
                     >
                        Common questions answered
                     </div>
                  </div>
               </div>

               <div className='space-y-2'>
                  {faqs.map((faq, i) => (
                     <div
                        key={i}
                        className='labs-reveal group border-l-2 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(45,212,191,0.08)] bg-white/5 backdrop-blur-sm border'
                        style={{
                           borderLeftColor:
                              openIndex === i
                                 ? 'var(--labs-accent)'
                                 : 'transparent',
                           borderColor: 'rgba(255,255,255,0.1)',
                           transitionDelay: `${i * 50}ms`,
                        }}
                     >
                        <button
                           onClick={() =>
                              setOpenIndex(openIndex === i ? null : i)
                           }
                           className='w-full text-left p-6 flex justify-between items-start gap-4 group/button'
                        >
                           <div className='flex items-start gap-4 flex-1'>
                              <span
                                 className='font-mono text-[10px] uppercase tracking-[0.15em] mt-1 transition-colors duration-300'
                                 style={{
                                    color:
                                       openIndex === i
                                          ? 'var(--labs-accent)'
                                          : 'var(--labs-text-meta)',
                                 }}
                              >
                                 {String(i + 1).padStart(2, '0')}
                              </span>
                              <span
                                 className='font-mono font-semibold transition-all duration-300 group-hover/button:translate-x-1'
                                 style={{
                                    fontSize: '12px',
                                    color:
                                       openIndex === i
                                          ? 'var(--labs-text-primary)'
                                          : 'var(--labs-text-body)',
                                 }}
                              >
                                 {faq.q}
                              </span>
                           </div>
                           <div
                              className={`w-5 h-5 border flex items-center justify-center transition-all duration-300 group-hover/button:border-[var(--labs-accent)] ${openIndex === i ? 'rotate-45 border-[var(--labs-accent)]' : ''}`}
                              style={{
                                 borderColor:
                                    openIndex === i
                                       ? 'var(--labs-accent)'
                                       : 'rgba(255,255,255,0.2)',
                              }}
                           >
                              <div
                                 className='w-2 h-px transition-colors duration-300'
                                 style={{
                                    background:
                                       openIndex === i
                                          ? 'var(--labs-accent)'
                                          : 'var(--labs-text-body)',
                                 }}
                              ></div>
                              <div
                                 className='w-px h-2 absolute transition-colors duration-300'
                                 style={{
                                    background:
                                       openIndex === i
                                          ? 'var(--labs-accent)'
                                          : 'var(--labs-text-body)',
                                 }}
                              ></div>
                           </div>
                        </button>
                        <div
                           className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 pb-6' : 'max-h-0'}`}
                        >
                           <div className='px-6 pl-[52px]'>
                              <p
                                 className='labs-body leading-relaxed'
                                 style={{ fontSize: '12px' }}
                              >
                                 {faq.a}
                              </p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}

// Footer
function LabsFooter() {
   return (
      <footer className='py-6 relative overflow-hidden'>
         <div className='max-w-[1400px] mx-auto px-6 md:px-12 text-center relative z-10'>
            <Label>// START Labs © 2026 · MedTech Edition</Label>
         </div>
      </footer>
   );
}

// Main Component
export default function LabsContent() {
   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  entry.target.classList.add('active');
               }
            });
         },
         { threshold: 0.15 },
      );

      document.querySelectorAll('.labs-reveal').forEach((el) => {
         observer.observe(el);
      });

      document.querySelectorAll('.carousel-scroll').forEach((el) => {
         (el as HTMLElement).scrollLeft = 0;
      });

      return () => observer.disconnect();
   }, []);

   return (
      <>
         <Script id='iframe-height-sender' strategy='afterInteractive'>
            {`
          function sendHeight() {
            if (window.parent !== window) {
              const height = document.documentElement.scrollHeight;
              window.parent.postMessage({ type: 'iframe-height', height: height }, '*');
            }
          }
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', sendHeight);
          } else {
            sendHeight();
          }
          window.addEventListener('resize', sendHeight);
        `}
         </Script>

         <main
            className='min-h-screen overflow-x-hidden labs-page'
            style={{ background: 'var(--labs-bg)' }}
         >
            <LabsNavigation />
            <HeroSection />
            <OrganizedBySection />
            <WhatIsStartLabsSection />
            <ProblemSection />
            <HowItWorksSection />
            {/* <TheExperienceSection /> */}
            <ProofCalloutSection />
            <CriteriaSection />
            {/* <ProofSection /> */}
            {/* <HowToApplySection /> */}
            <ApplySection />
            <FAQSection />
            <LabsFooter />
         </main>
      </>
   );
}
