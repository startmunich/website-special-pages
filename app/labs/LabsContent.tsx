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
         className='fixed top-0 left-0 right-0 z-50'
         style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
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

            {/* Subtle colored gradients */}
            <div className='absolute inset-0 pointer-events-none z-[1]'>
               <div
                  className='absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px]'
                  style={{
                     background: 'radial-gradient(circle, rgba(45,212,191,0.35) 0%, transparent 70%)',
                  }}
               ></div>
               <div
                  className='absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full blur-[130px]'
                  style={{
                     background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                  }}
               ></div>
            </div>
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
                        style={{ fontSize: '12px', color: 'var(--labs-text-body)' }}
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
                  <div className='font-mono' style={{ fontSize: '12px', color: 'var(--labs-text-body)' }}>
                     // Deadline: 30 April 2026 · Limited spots · Munich, in-person
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
         className='py-16 border-y relative overflow-hidden'
         style={{
            background: 'var(--labs-bg)',
            borderColor: 'var(--labs-border)',
         }}
      >
         {/* Gradient blobs */}
         <div className='absolute inset-0 pointer-events-none z-[1]'>
            <div
               className='absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[100px]'
               style={{
                  background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
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

// Problem Section
function ProblemSection() {
   return (
      <section
         className='labs-reveal relative py-32 border-y overflow-hidden'
         style={{ background: '#ffffff', borderColor: 'rgba(0,0,0,0.1)' }}
      >
         {/* Noise texture */}
         <NoiseTexture noiseOpacity={0.15} className='opacity-30' />

         {/* Gradient blobs */}
         <div className='absolute inset-0 pointer-events-none z-[1]'>
            <div
               className='absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background: 'radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
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
               <h2 className='labs-heading text-[clamp(32px,5vw,56px)] leading-[1.1] mb-20 text-center'>
                  <span className='block' style={{ color: '#000000' }}>Medicine is built on</span>
                  <span className='block' style={{ color: '#000000' }}>controlled conditions.</span>
                  <span className='block' style={{ color: 'var(--labs-accent)' }}>
                     Real life doesn't care.
                  </span>
               </h2>

               {/* Problem Grid */}
               <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>
                  <div
                     className='labs-reveal group p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] cursor-default border-t-2 bg-[#f8f8f8] border'
                     style={{ transitionDelay: '0ms', borderTopColor: 'var(--labs-accent)', borderColor: 'rgba(0,0,0,0.1)' }}
                  >
                     <div
                        className='labs-heading mb-4 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                        style={{ fontSize: 'var(--labs-size-heading-sm)', color: '#000000' }}
                     >
                        The AI model
                     </div>
                     <div
                        className='font-mono leading-relaxed transition-colors duration-300 group-hover:text-[#000000]'
                        style={{ fontSize: '12px', color: '#666666' }}
                     >
                        aced validation. Nobody checked it since.
                     </div>
                  </div>
                  <div
                     className='labs-reveal group p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] cursor-default border-t-2 bg-[#f8f8f8] border'
                     style={{ transitionDelay: '100ms', borderTopColor: 'var(--labs-accent)', borderColor: 'rgba(0,0,0,0.1)' }}
                  >
                     <div
                        className='labs-heading mb-4 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                        style={{ fontSize: 'var(--labs-size-heading-sm)', color: '#000000' }}
                     >
                        The lab test
                     </div>
                     <div
                        className='font-mono leading-relaxed transition-colors duration-300 group-hover:text-[#000000]'
                        style={{ fontSize: '12px', color: '#666666' }}
                     >
                        works perfectly. The patient is at km 15.
                     </div>
                  </div>
                  <div
                     className='labs-reveal group p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] cursor-default border-t-2 bg-[#f8f8f8] border'
                     style={{ transitionDelay: '200ms', borderTopColor: 'var(--labs-accent)', borderColor: 'rgba(0,0,0,0.1)' }}
                  >
                     <div
                        className='labs-heading mb-4 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                        style={{ fontSize: 'var(--labs-size-heading-sm)', color: '#000000' }}
                     >
                        The protocol
                     </div>
                     <div
                        className='font-mono leading-relaxed transition-colors duration-300 group-hover:text-[#000000]'
                        style={{ fontSize: '12px', color: '#666666' }}
                     >
                        made sense on paper. The real world had other plans.
                     </div>
                  </div>
               </div>

               {/* Supply-Demand Cards */}
               <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-20'>
                  <div
                     className='labs-reveal group p-10 bg-[#f8f8f8] border border-t-2 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] cursor-default'
                     style={{ borderTopColor: 'var(--labs-accent)', borderColor: 'rgba(0,0,0,0.1)' }}
                  >
                     <div
                        className='absolute right-0 top-0 font-display font-black text-[120px] leading-none opacity-[0.02] pointer-events-none select-none transition-all duration-500 group-hover:opacity-[0.04]'
                        style={{ color: 'var(--labs-accent)' }}
                     >
                        ⚡
                     </div>
                     <div className='relative z-10'>
                        <div className='mb-6'>
                           <span
                              className='font-mono uppercase tracking-[0.15em] transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                              style={{ fontSize: '12px', color: 'var(--labs-accent)' }}
                           >
                              // The problem
                           </span>
                        </div>
                        <div
                           className='labs-heading mb-4 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                           style={{ fontSize: 'var(--labs-size-heading-sm)', color: '#000000' }}
                        >
                           Healthcare organizations
                        </div>
                        <div
                           className='font-mono leading-relaxed transition-colors duration-300 group-hover:text-[#000000]'
                           style={{ fontSize: '12px', color: '#666666' }}
                        >
                           Drowning in real-world problems
                           <br />
                           nobody's had time to solve.
                        </div>
                     </div>
                  </div>

                  <div
                     className='labs-reveal group p-10 bg-[#f8f8f8] border border-t-2 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] cursor-default'
                     style={{
                        borderTopColor: 'var(--labs-accent)',
                        borderColor: 'rgba(0,0,0,0.1)',
                        transitionDelay: '100ms',
                     }}
                  >
                     <div
                        className='absolute right-0 top-0 font-display font-black text-[120px] leading-none opacity-[0.02] pointer-events-none select-none transition-all duration-500 group-hover:opacity-[0.04]'
                        style={{ color: 'var(--labs-accent)' }}
                     >
                        ⚡
                     </div>
                     <div className='relative z-10'>
                        <div className='mb-6'>
                           <span
                              className='font-mono uppercase tracking-[0.15em] transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                              style={{ fontSize: '12px', color: 'var(--labs-accent)' }}
                           >
                              // The opportunity
                           </span>
                        </div>
                        <div
                           className='labs-heading mb-4 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                           style={{ fontSize: 'var(--labs-size-heading-sm)', color: '#000000' }}
                        >
                           Ambitious builders
                        </div>
                        <div
                           className='font-mono leading-relaxed transition-colors duration-300 group-hover:text-[#000000]'
                           style={{ fontSize: '12px', color: '#666666' }}
                        >
                           The skills to close the gap.
                           <br />
                           Just waiting for the right problem.
                        </div>
                     </div>
                  </div>
               </div>

               {/* Closing line */}
               <div className='text-center'>
                  <div
                     className='labs-heading mb-4 leading-[1.3]'
                     style={{ fontSize: 'var(--labs-size-heading-md)', color: '#000000' }}
                  >
                     The gap between controlled and real
                     <br />
                     is where the most important problems live.
                     <br />
                     <span style={{ color: 'var(--labs-accent)' }}>We put the right people there.</span>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

// How It Works Section (combines Manifesto, About, and Program)
function HowItWorksSection({ onManifestoClick }: { onManifestoClick: () => void }) {
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
         className='labs-reveal relative py-32 border-y overflow-hidden scroll-mt-20'
         style={{
            background: 'var(--labs-bg)',
            borderColor: 'var(--labs-border)',
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
               style={{ color: '#ffffff' }}
            >
               02
            </div>
         </div>

         <div className='max-w-[1400px] mx-auto px-6 md:px-12 relative z-10'>
            <div className='max-w-5xl mx-auto'>
               {/* Section Header */}
               <SectionHeader>// How it works</SectionHeader>

               {/* Main Heading */}
               <h2 className='labs-heading text-[clamp(32px,5vw,56px)] leading-[1.1] mb-8'>
                  <span className='block'>8 weeks.</span>
                  <span
                     className='block'
                     style={{ color: 'var(--labs-text-body)' }}
                  >
                     Real problems.
                  </span>
                  <span
                     className='block'
                     style={{ color: 'var(--labs-text-body)' }}
                  >
                     Real startup.
                  </span>
               </h2>

               {/* Manifesto Link */}
               <div className='mb-20'>
                  <button
                     onClick={onManifestoClick}
                     className='group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:translate-x-1'
                     style={{ color: 'var(--labs-accent)' }}
                  >
                     <span className='transition-colors duration-300 group-hover:text-white'>
                        Read our manifesto
                     </span>
                     <span className='text-lg transition-transform duration-300 group-hover:translate-x-1'>
                        →
                     </span>
                  </button>
               </div>

               {/* Core Specs - With watermark numbers and enhanced hover */}
               <div className='mb-6 labs-reveal'>
                  <Label>// Core Specs</Label>
               </div>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-20'>
                  <div
                     className='labs-reveal group p-10 bg-white/5 backdrop-blur-sm border border-t-2 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] cursor-default'
                     style={{
                        borderTopColor: 'var(--labs-accent)',
                        borderColor: 'rgba(255,255,255,0.1)',
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
                           className='labs-heading mb-4 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                           style={{ fontSize: 'var(--labs-size-heading-sm)' }}
                        >
                           8 Weeks
                        </div>
                        <div
                           className='labs-body leading-relaxed transition-colors duration-300 group-hover:text-[var(--labs-text-primary)]'
                           style={{ fontSize: '12px' }}
                        >
                           Not 6 months. Not a semester. 8 intense weeks to
                           build, test, iterate, and sell. If you can't ship
                           something meaningful in 8 weeks, you won't ship it in
                           8 months.
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
                     <div
                        className='absolute left-0 top-0 font-display font-black text-[120px] leading-none opacity-[0.04] pointer-events-none select-none transition-all duration-500 group-hover:opacity-[0.08] group-hover:scale-110'
                        style={{ color: 'var(--labs-accent)' }}
                     >
                        02
                     </div>
                     <div className='relative z-10'>
                        <div
                           className='labs-heading mb-4 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                           style={{ fontSize: 'var(--labs-size-heading-sm)' }}
                        >
                           Student-Run
                        </div>
                        <div
                           className='labs-body leading-relaxed transition-colors duration-300 group-hover:text-[var(--labs-text-primary)]'
                           style={{ fontSize: '12px' }}
                        >
                           Built by students, for students. No corporate
                           sponsors dictating direction. No professors grading
                           deliverables. Just founders helping founders build
                           real companies.
                        </div>
                     </div>
                  </div>

                  <div
                     className='labs-reveal group p-10 bg-white/5 backdrop-blur-sm border border-t-2 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] cursor-default'
                     style={{
                        borderTopColor: 'var(--labs-accent)',
                        borderColor: 'rgba(255,255,255,0.1)',
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
                           className='labs-heading mb-4 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                           style={{ fontSize: 'var(--labs-size-heading-sm)' }}
                        >
                           Real Problems
                        </div>
                        <div
                           className='labs-body leading-relaxed transition-colors duration-300 group-hover:text-[var(--labs-text-primary)]'
                           style={{ fontSize: '12px' }}
                        >
                           Sourced directly from hospitals, clinics, and
                           healthcare organizations. Problems that exist right now,
                           in the real world, with real consequences if nobody
                           solves them.
                        </div>
                     </div>
                  </div>

                  <div
                     className='labs-reveal group p-10 bg-white/5 backdrop-blur-sm border border-t-2 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] cursor-default'
                     style={{
                        borderTopColor: 'var(--labs-accent)',
                        borderColor: 'rgba(255,255,255,0.1)',
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
                           className='labs-heading mb-4 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                           style={{ fontSize: 'var(--labs-size-heading-sm)' }}
                        >
                           Your Startup
                        </div>
                        <div
                           className='labs-body leading-relaxed transition-colors duration-300 group-hover:text-[var(--labs-text-primary)]'
                           style={{ fontSize: '12px' }}
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
                     style={{ background: 'var(--labs-border)' }}
                  ></div>

                  {/* Mobile line */}
                  <div
                     className='md:hidden absolute left-6 top-0 bottom-0 w-px'
                     style={{ background: 'var(--labs-border)' }}
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
                                          className='p-8 bg-white/5 backdrop-blur-sm border group-hover:border-[var(--labs-accent)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] border-l-2'
                                          style={{
                                             borderLeftColor:
                                                hoveredIndex === index
                                                   ? 'var(--labs-accent)'
                                                   : 'transparent',
                                             borderColor: 'rgba(255,255,255,0.1)',
                                          }}
                                       >
                                          <div className='mb-3'>
                                             <Label className='transition-colors duration-300 group-hover:text-[var(--labs-accent)]'>
                                                {item.week} · {item.tag}
                                             </Label>
                                          </div>
                                          <h3
                                             className='labs-heading mb-3 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                                             style={{
                                                fontSize:
                                                   'var(--labs-size-heading-sm)',
                                             }}
                                          >
                                             {item.title}
                                          </h3>
                                          <p
                                             className='labs-body leading-relaxed transition-colors duration-300 group-hover:text-[var(--labs-text-primary)]'
                                             style={{ fontSize: '12px' }}
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
                                          className='p-8 bg-white/5 backdrop-blur-sm border group-hover:border-[var(--labs-accent)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] border-l-2'
                                          style={{
                                             borderLeftColor:
                                                hoveredIndex === index
                                                   ? 'var(--labs-accent)'
                                                   : 'transparent',
                                             borderColor: 'rgba(255,255,255,0.1)',
                                          }}
                                       >
                                          <div className='mb-3'>
                                             <Label className='transition-colors duration-300 group-hover:text-[var(--labs-accent)]'>
                                                {item.week} · {item.tag}
                                             </Label>
                                          </div>
                                          <h3
                                             className='labs-heading mb-3 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                                             style={{
                                                fontSize:
                                                   'var(--labs-size-heading-sm)',
                                             }}
                                          >
                                             {item.title}
                                          </h3>
                                          <p
                                             className='labs-body leading-relaxed transition-colors duration-300 group-hover:text-[var(--labs-text-primary)]'
                                             style={{ fontSize: '12px' }}
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
                                          borderColor: 'var(--labs-text-meta)',
                                          background: 'var(--labs-bg)',
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
                                 className='p-6 bg-white/5 backdrop-blur-sm border group-hover:border-[var(--labs-accent)] transition-all duration-300 border-l-2'
                                 style={{
                                    borderLeftColor:
                                       hoveredIndex === index
                                          ? 'var(--labs-accent)'
                                          : 'transparent',
                                    borderColor: 'rgba(255,255,255,0.1)',
                                 }}
                              >
                                 <div className='mb-2'>
                                    <Label className='transition-colors duration-300 group-hover:text-[var(--labs-accent)]'>
                                       {item.week} · {item.tag}
                                    </Label>
                                 </div>
                                 <h3
                                    className='labs-heading mb-2 transition-colors duration-300 group-hover:text-[var(--labs-accent)]'
                                    style={{
                                       fontSize: 'var(--labs-size-heading-sm)',
                                    }}
                                 >
                                    {item.title}
                                 </h3>
                                 <p
                                    className='labs-body leading-relaxed transition-colors duration-300 group-hover:text-[var(--labs-text-primary)]'
                                    style={{ fontSize: '12px' }}
                                 >
                                    {item.desc}
                                 </p>
                              </div>

                              {/* Mobile dot */}
                              <div className='absolute left-6 top-0 w-3 h-3 -ml-[6px]'>
                                 <div
                                    className='absolute inset-0 rounded-full border-2 transition-all duration-300 group-hover:scale-150 group-hover:border-[var(--labs-accent)] group-hover:bg-[var(--labs-accent)]'
                                    style={{
                                       borderColor: 'var(--labs-text-meta)',
                                       background: 'var(--labs-bg)',
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

// Proof Callout Section - Visual break with stats
function ProofCalloutSection() {
   return (
      <section
         className='labs-reveal relative py-20 border-y overflow-hidden'
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
                  background: 'radial-gradient(circle, rgba(34,197,94,0.35) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]'
               style={{
                  background: 'radial-gradient(circle, rgba(45,212,191,0.3) 0%, transparent 70%)',
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
                        <Label style={{ color: '#555555' }}>// Proof of concept</Label>
                     </div>
                     <h3
                        className='labs-heading mb-4'
                        style={{ fontSize: 'var(--labs-size-heading-md)', color: '#000000' }}
                     >
                        We've done this before.
                     </h3>
                     <p
                        className='leading-relaxed font-mono'
                        style={{ fontSize: '12px', color: '#555555' }}
                     >
                        GovTech Edition 2025 produced 3 working startups in 8 weeks.
                        Real problems from municipalities. Real solutions that shipped.
                        We won the Bavarian Best Practice Award for it.
                     </p>
                  </div>

                  <div className='grid grid-cols-3 gap-6'>
                     <div
                        className='labs-reveal group p-6 text-center transition-all duration-300 hover:-translate-y-1 border bg-white'
                        style={{ transitionDelay: '0ms', borderColor: 'rgba(0,0,0,0.1)' }}
                     >
                        <div className='labs-heading text-5xl mb-2 transition-colors duration-300 group-hover:text-[var(--labs-accent)]' style={{ color: '#000000' }}>
                           3
                        </div>
                        <div className='font-mono text-[10px] uppercase tracking-[0.15em]' style={{ color: '#888888' }}>Startups</div>
                     </div>
                     <div
                        className='labs-reveal group p-6 text-center transition-all duration-300 hover:-translate-y-1 border bg-white'
                        style={{ transitionDelay: '100ms', borderColor: 'rgba(0,0,0,0.1)' }}
                     >
                        <div className='labs-heading text-5xl mb-2 transition-colors duration-300 group-hover:text-[var(--labs-accent)]' style={{ color: '#000000' }}>
                           8
                        </div>
                        <div className='font-mono text-[10px] uppercase tracking-[0.15em]' style={{ color: '#888888' }}>Weeks</div>
                     </div>
                     <div
                        className='labs-reveal group p-6 text-center transition-all duration-300 hover:-translate-y-1 border bg-white'
                        style={{ transitionDelay: '200ms', borderColor: 'rgba(0,0,0,0.1)' }}
                     >
                        <div className='labs-heading text-5xl mb-2 transition-colors duration-300 group-hover:text-[var(--labs-accent)]' style={{ color: '#000000' }}>
                           1
                        </div>
                        <div className='font-mono text-[10px] uppercase tracking-[0.15em]' style={{ color: '#888888' }}>Award</div>
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

         {/* Gradient blobs */}
         <div className='absolute inset-0 pointer-events-none z-[1]'>
            <div
               className='absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background: 'radial-gradient(circle, rgba(244,114,182,0.3) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background: 'radial-gradient(circle, rgba(59,130,246,0.28) 0%, transparent 70%)',
               }}
            ></div>
         </div>

         <div className='max-w-[1400px] mx-auto px-6 md:px-12 relative z-10'>
            <div className='max-w-5xl mx-auto'>
               {/* Section Header */}
               <SectionHeader>// Candidate profile</SectionHeader>

               <div className='mb-20'>
                  <h2
                     className='labs-heading mb-6'
                     style={{ fontSize: 'var(--labs-size-heading-lg)' }}
                  >
                     Are you the one?
                  </h2>
                  <div className='font-mono' style={{ fontSize: '12px', color: 'var(--labs-text-body)' }}>
                     // No MedTech experience needed. No connections required.
                     <br />
                     // Just the right mindset.
                  </div>
               </div>

               {/* Criteria Grid */}
               <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                  {/* Apply If */}
                  <div
                     className='labs-reveal group p-10 bg-[#f8f8f8] border border-t-2 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,212,191,0.15)] cursor-default'
                     style={{ borderTopColor: 'var(--labs-accent)', borderColor: 'rgba(0,0,0,0.1)' }}
                  >
                     <div
                        className='absolute left-0 top-0 font-display font-black text-[160px] leading-none opacity-[0.02] pointer-events-none select-none transition-all duration-500 group-hover:opacity-[0.04]'
                        style={{ color: 'var(--labs-accent)' }}
                     >
                        ✓
                     </div>
                     <div className='relative z-10'>
                        <div className='flex items-center gap-3 mb-8'>
                           <div
                              className='w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150'
                              style={{ background: 'var(--labs-accent)' }}
                           ></div>
                           <span className='font-mono uppercase tracking-[0.15em] font-semibold transition-colors duration-300 group-hover:text-[var(--labs-accent)]' style={{ fontSize: '12px', color: '#555555' }}>
                              // Apply if
                           </span>
                        </div>

                        <div className='space-y-6'>
                           <div className='flex gap-4 transition-all duration-300 hover:translate-x-1'>
                              <div
                                 className='w-1 h-1 mt-2 flex-shrink-0'
                                 style={{ background: 'var(--labs-accent)' }}
                              ></div>
                              <div>
                                 <div
                                    className='font-mono font-semibold mb-1 transition-colors duration-300'
                                    style={{
                                       color: '#000000',
                                       fontSize: '12px',
                                    }}
                                 >
                                    Hard problems energize you.
                                 </div>
                                 <div
                                    className='font-mono leading-relaxed'
                                    style={{ fontSize: '12px', color: '#666666' }}
                                 >
                                    You don't quit when things get tough. You
                                    get obsessed.
                                 </div>
                              </div>
                           </div>

                           <div className='flex gap-4 transition-all duration-300 hover:translate-x-1'>
                              <div
                                 className='w-1 h-1 mt-2 flex-shrink-0'
                                 style={{ background: 'var(--labs-accent)' }}
                              ></div>
                              <div>
                                 <div
                                    className='font-mono font-semibold mb-1 transition-colors duration-300'
                                    style={{
                                       color: '#000000',
                                       fontSize: '12px',
                                    }}
                                 >
                                    The status quo makes you angry.
                                 </div>
                                 <div
                                    className='font-mono leading-relaxed'
                                    style={{ fontSize: '12px', color: '#666666' }}
                                 >
                                    You see broken systems and think "I can fix
                                    this."
                                 </div>
                              </div>
                           </div>

                           <div className='flex gap-4 transition-all duration-300 hover:translate-x-1'>
                              <div
                                 className='w-1 h-1 mt-2 flex-shrink-0'
                                 style={{ background: 'var(--labs-accent)' }}
                              ></div>
                              <div>
                                 <div
                                    className='font-mono font-semibold mb-1 transition-colors duration-300'
                                    style={{
                                       color: '#000000',
                                       fontSize: '12px',
                                    }}
                                 >
                                    You have fire. Not just interest.
                                 </div>
                                 <div
                                    className='font-mono leading-relaxed'
                                    style={{ fontSize: '12px', color: '#666666' }}
                                 >
                                    Genuine, can't-sleep-at-night passion for
                                    building things that matter.
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Don't Apply If */}
                  <div
                     className='labs-reveal group p-10 labs-card border-t-2 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-default'
                     style={{
                        borderTopColor: 'var(--labs-text-meta)',
                        transitionDelay: '100ms',
                     }}
                  >
                     <div
                        className='absolute left-0 top-0 font-display font-black text-[160px] leading-none opacity-[0.02] pointer-events-none select-none transition-all duration-500 group-hover:opacity-[0.04]'
                        style={{ color: 'var(--labs-text-meta)' }}
                     >
                        ✗
                     </div>
                     <div className='relative z-10'>
                        <div className='flex items-center gap-3 mb-8'>
                           <div
                              className='w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150'
                              style={{ background: 'var(--labs-text-meta)' }}
                           ></div>
                           <span className='font-mono uppercase tracking-[0.15em] font-semibold transition-colors duration-300 group-hover:text-[var(--labs-text-primary)]' style={{ fontSize: '12px', color: 'var(--labs-text-body)' }}>
                              // Don't apply if
                           </span>
                        </div>

                        <div className='space-y-6'>
                           <div className='flex gap-4 transition-all duration-300 hover:translate-x-1'>
                              <div
                                 className='w-1 h-1 mt-2 flex-shrink-0'
                                 style={{ background: 'var(--labs-text-meta)' }}
                              ></div>
                              <div>
                                 <div
                                    className='font-mono font-semibold mb-1 transition-colors duration-300'
                                    style={{
                                       color: 'var(--labs-text-primary)',
                                       fontSize: '12px',
                                    }}
                                 >
                                    Your calendar is already drowning.
                                 </div>
                                 <div
                                    className='font-mono leading-relaxed'
                                    style={{ fontSize: '12px', color: 'var(--labs-text-body)' }}
                                 >
                                    We need 10+ hours per week of real
                                    commitment.
                                 </div>
                              </div>
                           </div>

                           <div className='flex gap-4 transition-all duration-300 hover:translate-x-1'>
                              <div
                                 className='w-1 h-1 mt-2 flex-shrink-0'
                                 style={{ background: 'var(--labs-text-meta)' }}
                              ></div>
                              <div>
                                 <div
                                    className='font-mono font-semibold mb-1 transition-colors duration-300'
                                    style={{
                                       color: 'var(--labs-text-primary)',
                                       fontSize: '12px',
                                    }}
                                 >
                                    You want a cozy lecture series.
                                 </div>
                                 <div
                                    className='font-mono leading-relaxed'
                                    style={{ fontSize: '12px', color: 'var(--labs-text-body)' }}
                                 >
                                    This is hands-on, messy, and real.
                                 </div>
                              </div>
                           </div>

                           <div className='flex gap-4 transition-all duration-300 hover:translate-x-1'>
                              <div
                                 className='w-1 h-1 mt-2 flex-shrink-0'
                                 style={{ background: 'var(--labs-text-meta)' }}
                              ></div>
                              <div>
                                 <div
                                    className='font-mono font-semibold mb-1 transition-colors duration-300'
                                    style={{
                                       color: 'var(--labs-text-primary)',
                                       fontSize: '12px',
                                    }}
                                 >
                                    You're collecting badges for your CV.
                                 </div>
                                 <div
                                    className='font-mono leading-relaxed'
                                    style={{ fontSize: '12px', color: 'var(--labs-text-body)' }}
                                 >
                                    Build something you actually care about, or
                                    don't apply.
                                 </div>
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
                        style={{ fontSize: '12px', color: 'var(--labs-text-body)' }}
                     >
                        // Don't fit these boxes? You might be exactly who we need.{' '}
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
         className='labs-reveal py-32 border-y'
         style={{
            background: 'var(--labs-bg)',
            borderColor: 'var(--labs-border)',
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

// Apply Section
function ApplySection() {
   return (
      <section
         id='apply'
         className='labs-reveal relative py-32 border-y overflow-hidden scroll-mt-20'
         style={{ background: '#ffffff', borderColor: 'rgba(0,0,0,0.1)' }}
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
               <h2 className='labs-heading text-[clamp(36px,6vw,64px)] leading-[0.95] mb-16' style={{ color: '#000000' }}>
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
               It depends. Some manage both, especially if they can adjust hours.
               Just be{' '}
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
         className='labs-reveal relative py-32 border-y scroll-mt-20 overflow-hidden'
         style={{
            background: 'var(--labs-bg)',
            borderColor: 'var(--labs-border)',
         }}
      >
         {/* Noise texture */}
         <NoiseTexture noiseOpacity={0.25} />

         {/* Gradient blobs */}
         <div className='absolute inset-0 pointer-events-none z-[1]'>
            <div
               className='absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background: 'radial-gradient(circle, rgba(251,146,60,0.3) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px]'
               style={{
                  background: 'radial-gradient(circle, rgba(45,212,191,0.3) 0%, transparent 70%)',
               }}
            ></div>
            <div
               className='absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-[120px]'
               style={{
                  background: 'radial-gradient(circle, rgba(167,139,250,0.28) 0%, transparent 70%)',
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
      <footer
         className='py-16 relative overflow-hidden'
         style={{
            background: 'var(--labs-bg)',
         }}
      >
         <div className='max-w-[1400px] mx-auto px-6 md:px-12 text-center relative z-10'>
            <Label>// START Labs © 2026 · MedTech Edition</Label>
         </div>
      </footer>
   );
}

// Manifesto Modal
function ManifestoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
   if (!isOpen) return null;

   return (
      <div
         className='fixed inset-0 z-[100] flex items-center justify-center p-6'
         onClick={onClose}
      >
         {/* Backdrop with blur */}
         <div
            className='absolute inset-0'
            style={{
               background: 'rgba(0, 0, 0, 0.85)',
               backdropFilter: 'blur(12px)',
               WebkitBackdropFilter: 'blur(12px)',
            }}
         />

         {/* Modal Card */}
         <div
            className='relative max-w-3xl w-full max-h-[80vh] overflow-y-auto bg-white/5 border border-white/10 p-10 md:p-14'
            onClick={(e) => e.stopPropagation()}
            style={{
               backdropFilter: 'blur(20px)',
               WebkitBackdropFilter: 'blur(20px)',
            }}
         >
            {/* Close Button */}
            <button
               onClick={onClose}
               className='absolute top-6 right-6 w-8 h-8 border border-white/20 flex items-center justify-center transition-all duration-300 hover:border-[var(--labs-accent)] hover:rotate-90'
            >
               <div className='w-4 h-px bg-white/60'></div>
               <div className='w-px h-4 absolute bg-white/60'></div>
            </button>

            {/* Header */}
            <div className='mb-10'>
               <span
                  className='font-mono uppercase tracking-[0.15em]'
                  style={{ fontSize: '12px', color: 'var(--labs-accent)' }}
               >
                  // Our Manifesto
               </span>
            </div>

            {/* Manifesto Content */}
            <div className='space-y-8'>
               <div className='group'>
                  <p
                     className='labs-body leading-relaxed transition-colors duration-300 group-hover:text-[var(--labs-text-primary)]'
                     style={{ fontSize: '13px' }}
                  >
                     When a clinician depends on what you build, you stop theorizing and start shipping. That's the only thing that changes behavior. Not workshops. Not feedback forms. Actual stakes.
                  </p>
               </div>

               <div className='group'>
                  <p
                     className='labs-body leading-relaxed transition-colors duration-300 group-hover:text-[var(--labs-text-primary)]'
                     style={{ fontSize: '13px' }}
                  >
                     This isn't a pitch competition. It's not an accelerator. It's not a hackathon. You're building a company — and you're selling to real customers from day one.
                  </p>
               </div>

               <div className='group'>
                  <p
                     className='labs-body leading-relaxed transition-colors duration-300 group-hover:text-[var(--labs-text-primary)]'
                     style={{ fontSize: '13px' }}
                  >
                     No hand-holding. No certificates. No "learning outcomes." Just real clinical partners, waiting to see if you can solve their problems before someone else does.
                  </p>
               </div>

               <div className='group'>
                  <p
                     className='labs-body leading-relaxed transition-colors duration-300 group-hover:text-[var(--labs-text-primary)]'
                     style={{ fontSize: '13px' }}
                  >
                     At the end of 8 weeks, you either have a startup with paying customers, or you don't. That's the only metric that matters.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

// Main Component
export default function LabsContent() {
   const [manifestoOpen, setManifestoOpen] = useState(false);

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
            <ProblemSection />
            <HowItWorksSection onManifestoClick={() => setManifestoOpen(true)} />
            <ProofCalloutSection />
            <CriteriaSection />
            {/* <ProofSection /> */}
            <ApplySection />
            <FAQSection />
            <LabsFooter />

            {/* Manifesto Modal */}
            <ManifestoModal isOpen={manifestoOpen} onClose={() => setManifestoOpen(false)} />
         </main>
      </>
   );
}
