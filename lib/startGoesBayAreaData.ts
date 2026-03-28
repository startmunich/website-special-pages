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
    time: string
    name: string
    location: string
    note?: string
    logoPath?: string
}

export interface BayAreaDetailedDay {
    date: string
    theme: string
    visits: BayAreaVisit[]
}

export interface BayAreaHost {
    name: string
    logoPath?: string
}

export interface BayAreaTeamMember {
    name: string
    role: string
}

export interface BayAreaHighlightVisit {
    name: string
    context: string
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

export const bayAreaHeroHighlights: BayAreaHeroStat[] = [
    { label: 'Duration', value: '2 Weeks' },
    { label: 'Annual Years', value: '3' },
    { label: 'Curated Participants', value: '20' },
]

export const bayAreaOverviewItems: BayAreaOverviewItem[] = [
    {
        title: 'Selective Exchange Program',
        description:
            'START goes Bay Area is a selective international exchange program organized by START Munich. The trip connects outstanding entrepreneurial talent from Europe with the innovation ecosystem in the San Francisco Bay Area.',
    },
    {
        title: 'Direct Access to Builders',
        description:
            'Across two weeks, participants meet founders, researchers, investors, and operators in person. The focus is practical: honest conversations, real product insights, and first-principles thinking from people building at the frontier.',
    },
    {
        title: 'Execution-First Experience',
        description:
            'The program combines company visits, ecosystem sessions, and an internal moonshot hackathon. The goal is to return home with stronger conviction, clearer frameworks, and momentum to execute.',
    },
]

export const bayAreaYearContent: BayAreaYearContent[] = [
    {
        id: '2025',
        label: '2025',
        groupPictureUrl: '/batch.jpeg',
        highlightVisits: [
            { name: 'Operator Roundtable', context: 'San Francisco' },
            { name: 'Seed Founder Panels', context: 'Palo Alto' },
            { name: 'Growth Tactics Session', context: 'Mountain View' },
        ],
        heroStats: [
            { label: 'Year', value: 'Year 1' },
            { label: 'Core Visits', value: '12' },
            { label: 'Participants', value: '18' },
        ],
        timelineIntro: 'The first year established the format and validated the exchange concept.',
        timelineMilestones: [
            {
                date: 'March 2025',
                title: 'Pilot Delegation Assembled',
                description: 'The inaugural group was selected and prepared through intensive pre-trip sessions.',
            },
            {
                date: 'April 2025',
                title: 'Founding Bay Area Sprint',
                description: 'Participants met founders, operators, and investors in a dense first exploration week.',
            },
            {
                date: 'May 2025',
                title: 'Operator Debrief & Playbook',
                description: 'The team translated learnings into internal frameworks and next-year improvements.',
            },
        ],
        detailedVisitsIntro: 'Representative sessions from the inaugural year.',
        detailedDays: [
            {
                date: 'April 8, 2025',
                theme: 'Founder Fundamentals',
                visits: [
                    {
                        time: '10:00–12:00',
                        name: 'Operator Roundtable',
                        location: 'San Francisco',
                    },
                    {
                        time: '14:00–16:00',
                        name: 'Seed Founder Panels',
                        location: 'Palo Alto',
                    },
                ],
            },
            {
                date: 'April 10, 2025',
                theme: 'Go-to-Market Under Constraints',
                visits: [
                    {
                        time: '09:30–11:00',
                        name: 'Growth Tactics Session',
                        location: 'Mountain View',
                    },
                    {
                        time: '13:00–15:00',
                        name: 'Community Founder Meetup',
                        location: 'San Francisco',
                    },
                ],
            },
        ],
        hostsIntro: 'Key hosts and ecosystem touchpoints from the first year.',
        hosts: [
            { name: 'GACC West', logoPath: '/bayarea/logos/gacc-west.svg' },
            { name: 'Start2 Group', logoPath: '/bayarea/logos/start2-group.svg' },
            { name: 'Founder House Sessions' },
            { name: 'University Exchange Circles' },
            { name: 'Community Operator Meetups' },
        ],
        teamIntro: 'Core organizers who launched the first Bay Area year.',
        teamMembers: [
            { name: 'Annemarie Schimkat', role: 'Orga Team' },
            { name: 'Christopher Hassinger', role: 'Orga Team' },
            { name: 'Philipp Noel von Lovenberg', role: 'Orga Team' },
        ],
    },
    {
        id: '2026',
        label: '2026',
        groupPictureUrl: '/batch.jpeg',
        highlightVisits: [
            { name: 'Google X', context: 'Mountain View' },
            { name: 'Y Combinator', context: 'San Francisco' },
            { name: 'Nvidia', context: 'Bay Area Session' },
        ],
        heroStats: [
            { label: 'Year', value: 'Year 2' },
            { label: 'Visits in Plan', value: '17' },
            { label: 'Participants', value: '20' },
        ],
        timelineIntro: 'Complete journey milestones and detailed Bay Area visits from week two.',
        timelineMilestones: [
            {
                date: 'February 28, 2026',
                title: 'Arrival in San Francisco',
                description:
                    'Team arrives at SFO, picks up cars, checks into Airbnbs, and sets up logistics for the trip.',
            },
            {
                date: 'March 1, 2026',
                title: 'Golden Gate Kickoff',
                description:
                    'Official start with full-team kickoff at the Golden Gate Bridge and first alignment day in the city.',
            },
            {
                date: 'March 2, 2026',
                title: 'Transatlantic Builders & AI Tools',
                description:
                    'Visits at GACC West / Start2 Group and CodeRabbit focused on market entry and applied AI products.',
            },
            {
                date: 'March 3, 2026',
                title: 'Deep Tech & Climate Tech',
                description:
                    'Sessions with Nvidia and WindBorne Systems to learn about infrastructure, hardware, and climate intelligence.',
            },
            {
                date: 'March 4, 2026',
                title: 'Silicon Valley Legends',
                description:
                    'Exchange with Sebastian Thrun on first-principles thinking and building frontier companies.',
            },
            {
                date: 'March 5, 2026',
                title: 'Neurotech, Hypergrowth & Founder Energy',
                description:
                    'Conversations at Maschmeyer Group, Coherence Neuro, and Rippling on scaling and founder execution.',
            },
            {
                date: 'March 6, 2026',
                title: 'Stanford & Hackerhouse Culture',
                description:
                    'Stanford robotics day plus evening community experience with The Residency.',
            },
            {
                date: 'March 7, 2026',
                title: 'Internal Moonshot Hackathon',
                description:
                    'Internal sprint to prototype bold ideas inspired by the first week of company and ecosystem sessions.',
            },
            {
                date: 'March 9–13, 2026',
                title: 'Week 2 Bay Area Visits',
                description:
                    'A dense run of deep-tech, VC, and founder visits across Mountain View, San Jose, Oakland, and San Francisco.',
            },
            {
                date: 'March 14, 2026',
                title: 'Departure & Wrap-Up',
                description:
                    'Final reflection day, closing conversations, and evening departure flight back home.',
            },
        ],
        detailedVisitsIntro: 'Detailed Bay Area visits for the 2026 year.',
        detailedDays: [
            {
                date: 'March 9, 2026',
                theme: 'Frontier AI Hardware & Robotics',
                visits: [
                    {
                        time: '09:00–11:30',
                        name: 'Google X Preparation Block',
                        location: 'In our Airbnbs',
                        note: 'Finalize workshop structure before external sessions.',
                    },
                    {
                        time: '13:00–15:00',
                        name: 'Etched',
                        location: 'San Jose',
                        note: 'AI accelerators and high-performance inference hardware.',
                        logoPath: '/bayarea/logos/etched.svg',
                    },
                    {
                        time: '16:00–17:00',
                        name: 'Intrinsic (Google X spin-off)',
                        location: 'Mountain View',
                        note: 'Robotics software and autonomy systems.',
                        logoPath: '/bayarea/logos/intrinsic.svg',
                    },
                ],
            },
            {
                date: 'March 10, 2026',
                theme: 'Moonshots & AI-Driven Biotech',
                visits: [
                    {
                        time: '09:45–13:00',
                        name: 'Google X',
                        location: 'Mountain View',
                        note: 'Tour, pitch session, rapid evaluation exchange, and lunch.',
                        logoPath: '/bayarea/logos/google-x.svg',
                    },
                    {
                        time: '16:00–17:30',
                        name: 'Inflammatix',
                        location: 'Sunnyvale',
                        note: 'Machine learning meets molecular diagnostics.',
                        logoPath: '/bayarea/logos/inflammatix.svg',
                    },
                ],
            },
            {
                date: 'March 11, 2026',
                theme: 'Climate Infrastructure + YC',
                visits: [
                    {
                        time: '10:00–11:30',
                        name: 'Sofar Ocean',
                        location: 'San Francisco',
                        logoPath: '/bayarea/logos/sofar-ocean.svg',
                    },
                    {
                        time: '13:00–14:30',
                        name: 'Magrathea',
                        location: 'Oakland',
                        note: 'Carbon-neutral magnesium from seawater and brines.',
                        logoPath: '/bayarea/logos/magrathea.svg',
                    },
                    {
                        time: '15:30–16:30',
                        name: 'Y Combinator',
                        location: 'San Francisco',
                        logoPath: '/bayarea/logos/y-combinator.svg',
                    },
                ],
            },
            {
                date: 'March 12, 2026',
                theme: 'Frontier VC & Founder-Level Thinking',
                visits: [
                    {
                        time: '10:00–11:30',
                        name: 'Boost VC',
                        location: 'San Francisco',
                        logoPath: '/bayarea/logos/boost-vc.svg',
                    },
                    {
                        time: '12:30–14:00',
                        name: 'Chris Bach Session',
                        location: 'San Francisco',
                    },
                    {
                        time: '15:30–16:30',
                        name: 'Pillsbury',
                        location: 'San Francisco',
                        logoPath: '/bayarea/logos/pillsbury.svg',
                    },
                    {
                        time: '17:00',
                        name: 'Founders Inc',
                        location: 'San Francisco',
                        logoPath: '/bayarea/logos/founders-inc.svg',
                    },
                    {
                        time: '18:00–21:00',
                        name: 'German Founders Dinner',
                        location: 'San Francisco',
                    },
                ],
            },
            {
                date: 'March 13, 2026',
                theme: 'AI, Satellite Intelligence & Food Tech',
                visits: [
                    {
                        time: '10:00–11:30',
                        name: 'satlyt.ai',
                        location: 'Sunnyvale',
                        logoPath: '/bayarea/logos/satlyt-ai.svg',
                    },
                    {
                        time: '14:00–16:00',
                        name: 'Savor',
                        location: 'San Jose',
                        logoPath: '/bayarea/logos/savor.svg',
                    },
                    {
                        time: '19:30–21:00',
                        name: 'Comedians Roast SF Tech Roast Show',
                        location: 'San Francisco',
                    },
                ],
            },
        ],
        hostsIntro: 'Selected hosts and ecosystem touchpoints from the 2026 trip plan.',
        hosts: [
            { name: 'GACC West', logoPath: '/bayarea/logos/gacc-west.svg' },
            { name: 'Start2 Group', logoPath: '/bayarea/logos/start2-group.svg' },
            { name: 'CodeRabbit', logoPath: '/bayarea/logos/coderabbit.svg' },
            { name: 'Nvidia', logoPath: '/bayarea/logos/nvidia.svg' },
            { name: 'WindBorne Systems', logoPath: '/bayarea/logos/windborne-systems.svg' },
            { name: 'Sebastian Thrun Session' },
            { name: 'Maschmeyer Group', logoPath: '/bayarea/logos/maschmeyer-group.svg' },
            { name: 'Coherence Neuro', logoPath: '/bayarea/logos/coherence-neuro.svg' },
            { name: 'Rippling', logoPath: '/bayarea/logos/rippling.svg' },
            { name: 'Stanford University', logoPath: '/bayarea/logos/stanford-university.svg' },
            { name: 'The Residency', logoPath: '/bayarea/logos/the-residency.svg' },
            { name: 'Google X', logoPath: '/bayarea/logos/google-x.svg' },
            { name: 'Inflammatix', logoPath: '/bayarea/logos/inflammatix.svg' },
            { name: 'Sofar Ocean', logoPath: '/bayarea/logos/sofar-ocean.svg' },
            { name: 'Magrathea', logoPath: '/bayarea/logos/magrathea.svg' },
            { name: 'Y Combinator', logoPath: '/bayarea/logos/y-combinator.svg' },
            { name: 'Boost VC', logoPath: '/bayarea/logos/boost-vc.svg' },
            { name: 'Pillsbury', logoPath: '/bayarea/logos/pillsbury.svg' },
            { name: 'Founders Inc', logoPath: '/bayarea/logos/founders-inc.svg' },
            { name: 'satlyt.ai', logoPath: '/bayarea/logos/satlyt-ai.svg' },
            { name: 'Savor', logoPath: '/bayarea/logos/savor.svg' },
        ],
        teamIntro: 'Team members referenced in the planning data for this Bay Area year.',
        teamMembers: [
            { name: 'Annemarie Schimkat', role: 'Orga Team' },
            { name: 'Christopher Hassinger', role: 'Orga Team' },
            { name: 'Philipp Noel von Lovenberg', role: 'Orga Team' },
            { name: 'Arian Gohari', role: 'Orga Team' },
            { name: 'Linde Liu', role: 'Orga Team' },
        ],
    },
    {
        id: '2027',
        label: '2027',
        isPreview: true,
        groupPictureUrl: '/batch.jpeg',
        highlightVisits: [
            { name: 'Frontier AI & Robotics Teams', context: 'In Scoping' },
            { name: 'Early-Stage Founder Communities', context: 'In Outreach' },
            { name: 'Deep Tech Operators', context: 'In Alignment' },
        ],
        heroStats: [
            { label: 'Year', value: 'Year 3' },
            { label: 'Status', value: 'Preview' },
            { label: 'Focus', value: 'In Planning' },
        ],
        timelineIntro: 'Early timeline for the next year. Additional milestones will be published as planning advances.',
        timelineMilestones: [
            {
                date: 'Q1 2027',
                title: 'Participant Selection Window',
                description: 'Applications, interviews, and final cohort selection.',
            },
            {
                date: 'Q2 2027',
                title: 'Partner & Host Alignment',
                description: 'Finalize company sessions, ecosystem partners, and thematic tracks.',
            },
            {
                date: 'Q3 2027',
                title: 'Bay Area Year Execution',
                description: 'On-site year with the next generation of participants.',
            },
        ],
        detailedVisitsIntro: 'Detailed daily visits for 2027 are currently being curated.',
        detailedDays: [],
        detailedVisitsPreviewText:
            'A full day-by-day schedule will be published once hosts and session windows are confirmed.',
        hostsIntro: 'Initial outreach list for the upcoming year.',
        hosts: [
            { name: 'Returning Ecosystem Hosts' },
            { name: 'Frontier AI & Robotics Teams' },
            { name: 'Early-Stage Founder Communities' },
            { name: 'Deep Tech Operators' },
        ],
        teamIntro: 'The organizing team for 2027 will be announced with the planning update.',
        teamMembers: [],
    },
]
