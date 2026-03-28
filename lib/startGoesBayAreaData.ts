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
            { name: 'Operator Roundtable', context: 'San Francisco', logoPath: '/startlogo.svg' },
            { name: 'Seed Founder Panels', context: 'Palo Alto', logoPath: '/startlogo.svg' },
            { name: 'Growth Tactics Session', context: 'Mountain View', logoPath: '/startlogo.svg' },
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
                weekGroup: 'Week 1',
                date: 'April 8, 2025',
                heading: 'Founder Fundamentals Sprint',
                subheading: 'Direct conversations on early-stage execution and operator thinking.',
                visits: [
                    {
                        visitType: 'community',
                        time: '10:00–12:00',
                        name: 'Operator Roundtable',
                        location: 'San Francisco',
                        description: 'A curated founder and operator exchange format hosted within the START Munich network.',
                    },
                    {
                        visitType: 'community',
                        time: '14:00–16:00',
                        name: 'Seed Founder Panels',
                        location: 'Palo Alto',
                        description: 'A panel format where early-stage founders share tactical lessons on building from zero to one.',
                    },
                ],
            },
            {
                weekGroup: 'Week 1',
                date: 'April 10, 2025',
                heading: 'Go-to-Market Under Constraints',
                subheading: 'Practical growth and founder community exchange across the Bay Area.',
                visits: [
                    {
                        visitType: 'community',
                        time: '09:30–11:00',
                        name: 'Growth Tactics Session',
                        location: 'Mountain View',
                        description: 'A practical session focused on repeatable go-to-market and growth playbooks for startups.',
                    },
                    {
                        visitType: 'community',
                        time: '13:00–15:00',
                        name: 'Community Founder Meetup',
                        location: 'San Francisco',
                        description: 'A community gathering connecting founders for peer exchange, hiring insights, and partnership opportunities.',
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
            { name: 'Google X', context: 'Mountain View', logoPath: '/bayarea/logos/google-x.svg', websiteUrl: 'https://x.company/' },
            { name: 'Y Combinator', context: 'San Francisco', logoPath: '/bayarea/logos/y-combinator.svg', websiteUrl: 'https://www.ycombinator.com/' },
            { name: 'NVIDIA', context: 'Santa Clara', logoPath: '/bayarea/logos/nvidia.svg', websiteUrl: 'https://www.nvidia.com/' },
        ],
        heroStats: [
            { label: 'Year', value: 'Year 2' },
            { label: 'Visits', value: '17' },
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
                weekGroup: 'Week 1',
                date: 'March 1, 2026',
                heading: 'Golden Gate Kickoff',
                subheading: 'Team alignment and city kickoff to establish shared goals for the trip.',
                visits: [
                    {
                        visitType: 'community',
                        time: 'All day',
                        name: 'Golden Gate Bridge Kickoff',
                        location: 'San Francisco',
                        description: 'The official trip kickoff around the Golden Gate area to align the full delegation.',
                        note: 'Official start and full-team orientation day.',
                    },
                ],
            },
            {
                weekGroup: 'Week 1',
                date: 'March 2, 2026',
                heading: 'Transatlantic Builders & AI Tools',
                subheading: 'Market-entry insights and applied AI product discussions with ecosystem operators.',
                visits: [
                    {
                        visitType: 'company',
                        time: 'Day session',
                        name: 'GACC West',
                        location: 'San Francisco',
                        description: 'GACC West helps German and US companies with market entry and transatlantic business development.',
                        websiteUrl: 'https://www.gaccwest.com/',
                        logoPath: '/bayarea/logos/gacc-west.svg',
                    },
                    {
                        visitType: 'company',
                        time: 'Day session',
                        name: 'Start2 Group',
                        location: 'San Francisco',
                        description: 'Start2 Group is an innovation platform supporting startups and corporates across Europe and the US.',
                        websiteUrl: 'https://www.start2.group/',
                        logoPath: '/bayarea/logos/start2-group.svg',
                    },
                    {
                        visitType: 'company',
                        time: 'Day session',
                        name: 'CodeRabbit',
                        location: 'San Francisco',
                        description: 'CodeRabbit builds AI code review tooling that automates pull request feedback and code quality checks.',
                        websiteUrl: 'https://coderabbit.ai/',
                        logoPath: '/bayarea/logos/coderabbit.svg',
                    },
                ],
            },
            {
                weekGroup: 'Week 1',
                date: 'March 3, 2026',
                heading: 'Deep Tech & Climate Tech',
                subheading: 'Infrastructure and climate intelligence sessions with frontier technology teams.',
                visits: [
                    {
                        visitType: 'company',
                        time: 'Day session',
                        name: 'Nvidia',
                        location: 'Bay Area',
                        description: 'NVIDIA develops accelerated computing platforms powering AI, simulation, and robotics.',
                        websiteUrl: 'https://www.nvidia.com/',
                        logoPath: '/bayarea/logos/nvidia.svg',
                    },
                    {
                        visitType: 'company',
                        time: 'Day session',
                        name: 'WindBorne Systems',
                        location: 'Bay Area',
                        description: 'WindBorne Systems builds autonomous atmospheric sensing systems for better weather intelligence.',
                        websiteUrl: 'https://www.windbornesystems.com/',
                        logoPath: '/bayarea/logos/windborne-systems.svg',
                    },
                ],
            },
            {
                weekGroup: 'Week 1',
                date: 'March 4, 2026',
                heading: 'Silicon Valley Legends',
                subheading: 'First-principles company building exchange with experienced founder leadership.',
                visits: [
                    {
                        visitType: 'person',
                        time: 'Day session',
                        name: 'Sebastian Thrun Session',
                        location: 'Bay Area',
                        description: 'A founder session on first-principles innovation, autonomy, and building frontier technology ventures.',
                        personLinkedInUrl: 'https://www.linkedin.com/in/sebastianthrun/',
                    },
                ],
            },
            {
                weekGroup: 'Week 1',
                date: 'March 5, 2026',
                heading: 'Neurotech, Hypergrowth & Founder Energy',
                subheading: 'Scaling and execution conversations across neuroscience and high-growth operators.',
                visits: [
                    {
                        visitType: 'company',
                        time: 'Day session',
                        name: 'Maschmeyer Group',
                        location: 'Bay Area',
                        description: 'Maschmeyer Group invests in and supports high-growth technology companies.',
                        websiteUrl: 'https://www.maschmeyergroup.com/',
                        logoPath: '/bayarea/logos/maschmeyer-group.svg',
                    },
                    {
                        visitType: 'company',
                        time: 'Day session',
                        name: 'Coherence Neuro',
                        location: 'Bay Area',
                        description: 'Coherence Neuro develops neurotechnology solutions for brain-health diagnostics and care.',
                        websiteUrl: 'https://www.coherenceneuro.com/',
                        logoPath: '/bayarea/logos/coherence-neuro.svg',
                    },
                    {
                        visitType: 'company',
                        time: 'Day session',
                        name: 'Rippling',
                        location: 'Bay Area',
                        description: 'Rippling unifies HR, IT, payroll, and identity tools into one workforce platform.',
                        websiteUrl: 'https://www.rippling.com/',
                        logoPath: '/bayarea/logos/rippling.svg',
                    },
                ],
            },
            {
                weekGroup: 'Week 1',
                date: 'March 6, 2026',
                heading: 'Stanford & Hackerhouse Culture',
                subheading: 'Academic robotics perspective paired with community-driven builder culture.',
                visits: [
                    {
                        visitType: 'company',
                        time: 'Day session',
                        name: 'Stanford University',
                        location: 'Stanford',
                        description: 'Stanford is a leading research university with a deep-tech and entrepreneurship ecosystem.',
                        websiteUrl: 'https://www.stanford.edu/',
                        logoPath: '/bayarea/logos/stanford-university.svg',
                    },
                    {
                        visitType: 'community',
                        time: 'Evening session',
                        name: 'The Residency',
                        location: 'San Francisco',
                        description: 'A community-driven builder gathering focused on hacker-house culture and founder exchange.',
                    },
                ],
            },
            {
                weekGroup: 'Week 1',
                date: 'March 7, 2026',
                heading: 'Internal Moonshot Hackathon',
                subheading: 'In-team sprint to prototype bold concepts inspired by week one.',
                visits: [
                    {
                        visitType: 'hackathon',
                        time: 'All day',
                        name: 'Moonshot Hackathon Sprint',
                        location: 'San Francisco',
                        description: 'An internal sprint where participants prototype bold venture ideas under tight constraints.',
                    },
                ],
            },
            {
                weekGroup: 'Week 2',
                date: 'March 9, 2026',
                heading: 'Frontier AI Hardware & Robotics',
                subheading: 'Applied infrastructure and robotics sessions across San Jose and Mountain View.',
                visits: [
                    {
                        visitType: 'hackathon',
                        time: '09:00–11:30',
                        name: 'Google X Preparation Block',
                        location: 'In our Airbnbs',
                        description: 'A hackathon-style prep block focused on moonshot framing and rapid team alignment.',
                        note: 'Finalize workshop structure before external sessions.',
                    },
                    {
                        visitType: 'company',
                        time: '13:00–15:00',
                        name: 'Etched',
                        location: 'San Jose',
                        description: 'Etched builds specialized AI chips focused on high-performance transformer inference.',
                        websiteUrl: 'https://www.etched.com/',
                        note: 'AI accelerators and high-performance inference hardware.',
                        logoPath: '/bayarea/logos/etched.svg',
                    },
                    {
                        visitType: 'company',
                        time: '16:00–17:00',
                        name: 'Intrinsic (Google X spin-off)',
                        location: 'Mountain View',
                        description: 'Intrinsic develops software infrastructure to make industrial robotics easier to program and scale.',
                        websiteUrl: 'https://intrinsic.ai/',
                        note: 'Robotics software and autonomy systems.',
                        logoPath: '/bayarea/logos/intrinsic.svg',
                    },
                ],
            },
            {
                weekGroup: 'Week 2',
                date: 'March 10, 2026',
                heading: 'Moonshots & AI-Driven Biotech',
                subheading: 'High-velocity exchange on moonshot product bets and medical AI.',
                visits: [
                    {
                        visitType: 'company',
                        time: '09:45–13:00',
                        name: 'Google X',
                        location: 'Mountain View',
                        description: 'X, the Moonshot Factory, incubates breakthrough technologies tackling large global problems.',
                        websiteUrl: 'https://x.company/',
                        note: 'Tour, pitch session, rapid evaluation exchange, and lunch.',
                        logoPath: '/bayarea/logos/google-x.svg',
                    },
                    {
                        visitType: 'company',
                        time: '16:00–17:30',
                        name: 'Inflammatix',
                        location: 'Sunnyvale',
                        description: 'Inflammatix builds host-response diagnostics using machine learning for infectious disease care.',
                        websiteUrl: 'https://www.inflammatix.com/',
                        note: 'Machine learning meets molecular diagnostics.',
                        logoPath: '/bayarea/logos/inflammatix.svg',
                    },
                ],
            },
            {
                weekGroup: 'Week 2',
                date: 'March 11, 2026',
                heading: 'Climate Infrastructure + YC',
                subheading: 'Climate systems, industrial science, and accelerator perspectives in one day.',
                visits: [
                    {
                        visitType: 'company',
                        time: '10:00–11:30',
                        name: 'Sofar Ocean',
                        location: 'San Francisco',
                        description: 'Sofar Ocean provides ocean sensing and forecasting platforms for maritime and climate operations.',
                        websiteUrl: 'https://www.sofarocean.com/',
                        logoPath: '/bayarea/logos/sofar-ocean.svg',
                    },
                    {
                        visitType: 'company',
                        time: '13:00–14:30',
                        name: 'Magrathea',
                        location: 'Oakland',
                        description: 'Magrathea is building carbon-neutral magnesium production from seawater and industrial brines.',
                        websiteUrl: 'https://www.magratheametals.com/',
                        note: 'Carbon-neutral magnesium from seawater and brines.',
                        logoPath: '/bayarea/logos/magrathea.svg',
                    },
                    {
                        visitType: 'company',
                        time: '15:30–16:30',
                        name: 'Y Combinator',
                        location: 'San Francisco',
                        description: 'Y Combinator is a startup accelerator that has helped launch and scale thousands of companies.',
                        websiteUrl: 'https://www.ycombinator.com/',
                        logoPath: '/bayarea/logos/y-combinator.svg',
                    },
                ],
            },
            {
                weekGroup: 'Week 2',
                date: 'March 12, 2026',
                heading: 'Frontier VC & Founder-Level Thinking',
                subheading: 'Operator-grade fundraising, legal, and founder feedback sessions.',
                visits: [
                    {
                        visitType: 'company',
                        time: '10:00–11:30',
                        name: 'Boost VC',
                        location: 'San Francisco',
                        description: 'Boost VC is an early-stage venture firm investing in frontier technologies and deep tech.',
                        websiteUrl: 'https://www.boost.vc/',
                        logoPath: '/bayarea/logos/boost-vc.svg',
                    },
                    {
                        visitType: 'person',
                        time: '12:30–14:00',
                        name: 'Chris Bach Session',
                        location: 'San Francisco',
                        description: 'A founder and operator session focused on leadership, execution velocity, and resilient teams.',
                        personLinkedInUrl: 'https://www.linkedin.com/in/chrisbach/',
                    },
                    {
                        visitType: 'company',
                        time: '15:30–16:30',
                        name: 'Pillsbury',
                        location: 'San Francisco',
                        description: 'Pillsbury is an international law firm advising technology companies on growth and transactions.',
                        websiteUrl: 'https://www.pillsburylaw.com/',
                        logoPath: '/bayarea/logos/pillsbury.svg',
                    },
                    {
                        visitType: 'company',
                        time: '17:00',
                        name: 'Founders Inc',
                        location: 'San Francisco',
                        description: 'Founders Inc supports entrepreneurs with community, infrastructure, and startup execution resources.',
                        websiteUrl: 'https://foundersinc.com/',
                        logoPath: '/bayarea/logos/founders-inc.svg',
                    },
                    {
                        visitType: 'community',
                        time: '18:00–21:00',
                        name: 'German Founders Dinner',
                        location: 'San Francisco',
                        description: 'A community dinner connecting German-speaking founders, investors, and operators in the Bay Area.',
                    },
                ],
            },
            {
                weekGroup: 'Week 2',
                date: 'March 13, 2026',
                heading: 'AI, Satellite Intelligence & Food Tech',
                subheading: 'Cross-sector deep-tech exposure from earth observation to food innovation.',
                visits: [
                    {
                        visitType: 'company',
                        time: '10:00–11:30',
                        name: 'satlyt.ai',
                        location: 'Sunnyvale',
                        description: 'satlyt.ai builds AI-native satellite intelligence products for faster earth observation insights.',
                        websiteUrl: 'https://satlyt.ai/',
                        logoPath: '/bayarea/logos/satlyt-ai.svg',
                    },
                    {
                        visitType: 'company',
                        time: '14:00–16:00',
                        name: 'Savor',
                        location: 'San Jose',
                        description: 'Savor develops novel food technologies to create sustainable fats and ingredients.',
                        websiteUrl: 'https://www.savor.it/',
                        logoPath: '/bayarea/logos/savor.svg',
                    },
                    {
                        visitType: 'community',
                        time: '19:30–21:00',
                        name: 'Comedians Roast SF Tech Roast Show',
                        location: 'San Francisco',
                        description: 'A community comedy event that satirizes startup culture and Bay Area tech scenes.',
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
            { name: 'Frontier AI & Robotics Teams', context: 'In Scoping', logoPath: '/startlogo.svg' },
            { name: 'Early-Stage Founder Communities', context: 'In Outreach', logoPath: '/startlogo.svg' },
            { name: 'Deep Tech Operators', context: 'In Alignment', logoPath: '/startlogo.svg' },
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
