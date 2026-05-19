'use client';

import { useState, useEffect, use } from 'react';
import posthog from 'posthog-js';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import type { Company } from '@/lib/types';

// Fetch companies from API
async function fetchCompanies(): Promise<Company[]> {
  try {
    const response = await fetch('/api/startups');
    if (!response.ok) throw new Error('Failed to fetch startups');
    return await response.json();
  } catch (error) {
    console.error('Error fetching startups:', error);
    return [];
  }
}

export default function StartupDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCompany = async () => {
      setLoading(true);
      const companies = await fetchCompanies();
      const foundCompany = companies.find((c) => c.id.toString() === id);

      if (!foundCompany) {
        notFound();
        return;
      }

      setCompany(foundCompany);
      setLoading(false);
    };
    loadCompany();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#00002c] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-2xl font-bold text-white">Loading startup details...</p>
        </div>
      </main>
    );
  }

  if (!company) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#00002c]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Company Details */}
        <div className="relative mx-auto max-w-4xl rounded-2xl border border-white/20 bg-[#00002c]">
          {/* Close Button */}
          <button
            onClick={() => router.back()}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-white/20"
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="p-8">
            {/* Header with Logo */}
            <div className="mb-6 flex flex-col gap-6 md:flex-row">
              <div className="flex h-48 w-full flex-shrink-0 items-center justify-center rounded-lg border-2 border-white/20 bg-white p-6 transition-all hover:border-[#d0006f] md:w-48">
                <img
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  className="h-auto max-h-full w-auto max-w-full object-contain"
                />
              </div>

              <div className="flex-1">
                <h1 className="h1-small mb-3 text-5xl font-bold text-white">{company.name}</h1>

                {/* Categories */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {company.category.map((cat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full border border-[#d0006f]/40 bg-[#d0006f]/20 px-3 py-1 text-xs font-medium text-[#d0006f]"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Quick Info */}
                <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400">
                  {company.lastUpdated && (
                    <>
                      <span>
                        Infromation Updated{' '}
                        {new Date(company.lastUpdated).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </>
                  )}
                </div>
                {/* Links */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      posthog.capture('startup_website_clicked', {
                        startup_id: company.id,
                        startup_name: company.name,
                        website: company.website,
                      })
                    }
                    className="inline-flex items-center gap-2 font-medium text-[#d0006f] transition-colors hover:text-pink-400"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Visit Website
                  </a>
                  {company.companyLinkedin && (
                    <a
                      href={company.companyLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-[#d0006f] transition-colors hover:text-pink-400"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      Visit LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="mb-3 text-lg font-semibold text-white">About</h2>
              <p className="leading-relaxed text-gray-300">{company.description}</p>
            </div>

            {/* Supporting Programs */}
            {company.supportingPrograms && (
              <div className="mb-6">
                <h2 className="mb-4 text-lg font-semibold text-white">Programs</h2>
                <div className="flex flex-wrap gap-2">
                  {company.supportingPrograms
                    .split(',')
                    .filter((p) => p.trim())
                    .map((program, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-gray-300"
                      >
                        {program.trim()}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Company Info */}
            <div className="mb-6">
              <h2 className="mb-3 text-lg font-semibold text-white">Company Info</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">Founded</p>
                  <p className="text-base font-semibold text-white">{company.foundingYear}</p>
                </div>
              </div>
            </div>

            {/* Founders */}
            {company.founders.length > 0 && (
              <div className="mb-1 pb-1">
                <h2 className="mb-4 text-lg font-semibold text-white">
                  {company.founders.length > 1 ? 'Founders' : 'Founder'}
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {company.founders.map((founder, idx) => (
                    <div key={idx} className="flex items-center gap-4 rounded-lg bg-white/5 p-4">
                      {founder.linkedinUrl ? (
                        <a
                          href={founder.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0"
                        >
                          <img
                            src={founder.imageUrl}
                            alt={founder.name}
                            className="h-16 w-16 rounded-full border-2 border-white/20 object-cover transition-all hover:border-[#d0006f]"
                          />
                        </a>
                      ) : (
                        <img
                          src={founder.imageUrl}
                          alt={founder.name}
                          className="h-16 w-16 rounded-full border-2 border-white/20 object-cover"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="mb-1 text-base font-semibold text-white">
                          {founder.name}
                          {founder.batch && (
                            <span className="ml-2 font-normal text-gray-500">
                              (Batch: {founder.batch})
                            </span>
                          )}
                        </p>
                        <p className="mb-1 text-sm text-gray-400">{founder.role}</p>
                      </div>
                      {founder.linkedinUrl && (
                        <a
                          href={founder.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#d0006f] transition-colors hover:text-pink-400"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Links */}
            {/* <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
              <a
                href={`https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d0006f] to-pink-600 hover:from-[#d0006f] hover:to-[#d0006f] text-white font-semibold rounded-xl transition-all hover:scale-105"
              >
                Visit Website
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              {company.companyLinkedin && (
                <a
                  href={company.companyLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
