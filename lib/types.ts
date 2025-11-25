// Shared type definitions for the application

export interface Founder {
  name: string
  role: string
  batch: string
  imageUrl: string
  linkedinUrl?: string
}

export interface Company {
  id: number
  name: string
  website: string
  summary: string
  description: string
  logoUrl: string
  foundingYear: number | string
  category: string[]
  founders: Founder[]
  totalRaised?: string
  employees?: number
  isSpotlight?: boolean
  isYCombinator?: boolean
  companyLinkedin?: string
  investmentRound?: string
  milestones?: string
  supportingPrograms?: string
  lastUpdated?: string
  isMTZ?: boolean
  isEWOR?: boolean
}
