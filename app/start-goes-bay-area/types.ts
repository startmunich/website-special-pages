export interface BayAreaHeroStat {
    label: string
    value: string
}

export type BayAreaYearId = '2025' | '2026' | '2027'

export interface BayAreaOverviewItem {
    title: string
    description: string
}

export interface BayAreaTimelineMilestone {
    date: string
    title: string
    description: string
}

export interface BayAreaVisit {
    visitType: 'company' | 'community' | 'hackathon' | 'person'
    time: string
    name: string
    location: string
    description: string
    websiteUrl?: string
    personLinkedInUrl?: string
    note?: string
    logoPath?: string
}

export type BayAreaWeekGroup = 'Week 1' | 'Week 2'

export interface BayAreaDetailedDay {
    weekGroup: BayAreaWeekGroup
    date: string
    heading: string
    subheading: string
    visits: BayAreaVisit[]
}

export interface BayAreaHost {
    name: string
    logoPath?: string
    websiteUrl?: string
}

export interface BayAreaTeamMember {
    name: string
    role: string
}

export interface BayAreaHighlightVisit {
    name: string
    context: string
    logoPath?: string
    websiteUrl?: string
}

export interface BayAreaCompanyLogo {
    name: string
    logoPath: string
    websiteUrl?: string
}

export interface BayAreaYearContent {
    id: BayAreaYearId
    label: string
    isPreview?: boolean
    groupPictureUrl: string
    highlightVisits: BayAreaHighlightVisit[]
    heroStats: BayAreaHeroStat[]
    timelineIntro: string
    timelineMilestones: BayAreaTimelineMilestone[]
    detailedVisitsIntro: string
    detailedDays: BayAreaDetailedDay[]
    detailedVisitsPreviewText?: string
    hostsIntro: string
    hosts: BayAreaHost[]
    teamIntro: string
    teamMembers: BayAreaTeamMember[]
}
