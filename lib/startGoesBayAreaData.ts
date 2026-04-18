import type {
    BayAreaCompanyLogo,
    BayAreaOverviewItem,
    BayAreaYearContent,
    BayAreaVisit,
} from '@/app/start-goes-bay-area/types'

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
            { name: 'a16z', context: 'San Francisco', logoPath: '/startlogo.svg', websiteUrl: 'https://a16z.com/' },
            { name: 'Etched', context: 'South San Francisco', logoPath: '/startlogo.svg', websiteUrl: 'https://www.etched.com/' },
            { name: 'LinkedIn Co-founder', context: 'Redwood City', logoPath: '/startlogo.svg', websiteUrl: 'https://www.linkedin.com/in/reidhoffman/' },
        ],
        heroStats: [
            { label: 'Year', value: 'Year 1' },
            { label: 'Visits', value: '11' },
            { label: 'Participants', value: '18' },
        ],
        timelineIntro: 'Documented March 2025 program with startup, VC, corporate, university, and hackathon sessions across the Bay Area.',
        timelineMilestones: [
            {
                date: 'March 4, 2025',
                title: 'Corporate Product Track Started',
                description: 'Program opened with Google and Apple visits alongside a Minoa session in Silicon Valley.',
            },
            {
                date: 'March 9, 2025',
                title: 'AI for Good Hackathon',
                description: 'An education-focused hackathon block added a collaborative build sprint to the trip.',
            },
            {
                date: 'March 14, 2025',
                title: 'Deep-Tech & Legal Closing Day',
                description: 'Program concluded in San Francisco with PsiQuantum and Orrick sessions.',
            },
        ],
        detailedVisitsIntro: 'Day-by-day schedule imported from the 2025 Bay Area program file.',
        detailedDays: [
            {
                weekGroup: 'Week 1',
                date: 'March 4, 2025',
                heading: 'Google & Apple Visits + Minoa',
                subheading: 'Corporate and startup operator sessions across Mountain View and Cupertino.',
                visits: [
                    {
                        visitType: 'company',
                        time: 'Morning session',
                        name: 'Google Visit',
                        location: 'Mountain View',
                        description: 'Corporate campus visit and discussion on product and innovation in large-scale technology organizations.',
                        websiteUrl: 'https://about.google/',
                    },
                    {
                        visitType: 'company',
                        time: 'Midday session',
                        name: 'Apple Visit',
                        location: 'Cupertino',
                        description: 'Corporate visit focused on product excellence and execution at global scale.',
                        websiteUrl: 'https://www.apple.com/',
                    },
                    {
                        visitType: 'company',
                        time: 'Afternoon session',
                        name: 'Minoa Session',
                        location: 'Mountain View',
                        description: 'Startup exchange session with operator insights on building and scaling products.',
                    },
                ],
            },
            {
                weekGroup: 'Week 1',
                date: 'March 5, 2025',
                heading: 'Uncork Capital Office Visit',
                subheading: 'VC perspective on early-stage investment and startup selection.',
                visits: [
                    {
                        visitType: 'company',
                        time: 'Day session',
                        name: 'Uncork Capital Office Visit',
                        location: 'San Francisco',
                        description: 'On-site exchange with Uncork Capital on venture strategy and portfolio building.',
                        websiteUrl: 'https://uncork.vc/',
                    },
                ],
            },
            {
                weekGroup: 'Week 1',
                date: 'March 6, 2025',
                heading: 'Pendulum & Dave Hersh Session',
                subheading: 'Founder and operator session focused on startup building in San Francisco.',
                visits: [
                    {
                        visitType: 'company',
                        time: 'Day session',
                        name: 'Pendulum & Dave Hersh Session',
                        location: 'San Francisco',
                        description: 'Startup session with Pendulum and Dave Hersh on growth and execution.',
                    },
                ],
            },
            {
                weekGroup: 'Week 1',
                date: 'March 7, 2025',
                heading: 'Netlify, Boost VC & Amprion Day',
                subheading: 'Combined startup and venture sessions hosted in San Francisco.',
                visits: [
                    {
                        visitType: 'company',
                        time: 'Morning session',
                        name: 'Netlify',
                        location: 'San Francisco',
                        description: 'Startup infrastructure session on developer platforms and modern web product execution.',
                        websiteUrl: 'https://www.netlify.com/',
                    },
                    {
                        visitType: 'company',
                        time: 'Midday session',
                        name: 'Boost VC',
                        location: 'San Francisco',
                        description: 'Investor exchange on early-stage venture theses and founder support.',
                        websiteUrl: 'https://www.boost.vc/',
                    },
                    {
                        visitType: 'company',
                        time: 'Afternoon session',
                        name: 'Amprion',
                        location: 'San Francisco',
                        description: 'Session with industry operators on execution in infrastructure-focused domains.',
                        websiteUrl: 'https://www.amprion.net/',
                    },
                ],
            },
            {
                weekGroup: 'Week 1',
                date: 'March 8, 2025',
                heading: 'Yosemite National Park Trip',
                subheading: 'Offsite team day in Yosemite National Park.',
                visits: [
                    {
                        visitType: 'community',
                        time: 'All day',
                        name: 'Yosemite National Park Trip',
                        location: 'Yosemite National Park',
                        description: 'Travel and team-bonding day before continuing the second program week.',
                        websiteUrl: 'https://www.nps.gov/yose/index.htm',
                    },
                ],
            },
            {
                weekGroup: 'Week 1',
                date: 'March 9, 2025',
                heading: 'AI for Good Hackathon',
                subheading: 'University-business hackathon format in San Francisco.',
                visits: [
                    {
                        visitType: 'hackathon',
                        time: 'All day',
                        name: 'AI for Good Hackathon',
                        location: 'San Francisco',
                        description: 'A collaborative hackathon centered on practical AI use cases and impact-oriented ideas.',
                    },
                ],
            },
            {
                weekGroup: 'Week 2',
                date: 'March 10, 2025',
                heading: 'Etched Visit',
                subheading: 'Deep-tech startup session in South San Francisco.',
                visits: [
                    {
                        visitType: 'company',
                        time: 'Day session',
                        name: 'Etched Visit',
                        location: 'South San Francisco',
                        description: 'Visit focused on startup execution in advanced technology domains.',
                        websiteUrl: 'https://www.etched.com/',
                    },
                ],
            },
            {
                weekGroup: 'Week 2',
                date: 'March 11, 2025',
                heading: 'Benchling, Prifina & UC Berkeley',
                subheading: 'Cross-ecosystem sessions spanning startups and university environment.',
                visits: [
                    {
                        visitType: 'company',
                        time: 'Morning session',
                        name: 'Benchling',
                        location: 'San Francisco',
                        description: 'Company session focused on product development at the intersection of software and life sciences.',
                        websiteUrl: 'https://www.benchling.com/',
                    },
                    {
                        visitType: 'company',
                        time: 'Midday session',
                        name: 'Prifina',
                        location: 'San Francisco',
                        description: 'Startup exchange on data products and founder execution.',
                        websiteUrl: 'https://www.prifina.com/',
                    },
                    {
                        visitType: 'community',
                        time: 'Afternoon session',
                        name: 'UC Berkeley',
                        location: 'Berkeley',
                        description: 'University ecosystem visit with perspectives on research, talent, and entrepreneurship.',
                        websiteUrl: 'https://www.berkeley.edu/',
                    },
                ],
            },
            {
                weekGroup: 'Week 2',
                date: 'March 12, 2025',
                heading: 'a16z & Pheast',
                subheading: 'Venture and startup sessions in San Francisco.',
                visits: [
                    {
                        visitType: 'company',
                        time: 'Morning session',
                        name: 'a16z',
                        location: 'San Francisco',
                        description: 'Venture capital session on investment perspective, market timing, and startup readiness.',
                        websiteUrl: 'https://a16z.com/',
                    },
                    {
                        visitType: 'company',
                        time: 'Afternoon session',
                        name: 'Pheast',
                        location: 'San Francisco',
                        description: 'Startup operator session with practical product and execution insights.',
                    },
                ],
            },
            {
                weekGroup: 'Week 2',
                date: 'March 13, 2025',
                heading: 'Start2 Group, LinkedIn Co-founder, AccessOwl & Soff',
                subheading: 'High-density founder and startup day in Redwood City.',
                visits: [
                    {
                        visitType: 'company',
                        time: 'Morning session',
                        name: 'Start2 Group',
                        location: 'Redwood City',
                        description: 'Ecosystem operator session on transatlantic startup support and market entry.',
                        websiteUrl: 'https://www.start2.group/',
                    },
                    {
                        visitType: 'person',
                        time: 'Late morning session',
                        name: 'LinkedIn Co-founder',
                        location: 'Redwood City',
                        description: 'Founder conversation on scaling iconic products and building enduring teams.',
                        personLinkedInUrl: 'https://www.linkedin.com/in/reidhoffman/',
                    },
                    {
                        visitType: 'company',
                        time: 'Afternoon session',
                        name: 'AccessOwl',
                        location: 'Redwood City',
                        description: 'Startup exchange focused on execution and operator learnings.',
                        websiteUrl: 'https://www.accessowl.com/',
                    },
                    {
                        visitType: 'company',
                        time: 'Evening session',
                        name: 'Soff',
                        location: 'Redwood City',
                        description: 'Session with startup builders on product, growth, and team dynamics.',
                    },
                ],
            },
            {
                weekGroup: 'Week 2',
                date: 'March 14, 2025',
                heading: 'PsiQuantum & Orrick',
                subheading: 'Deep-tech and legal-focused closing day in San Francisco.',
                visits: [
                    {
                        visitType: 'company',
                        time: 'Morning session',
                        name: 'PsiQuantum',
                        location: 'San Francisco',
                        description: 'Deep-tech session on frontier company building in advanced hardware and infrastructure.',
                        websiteUrl: 'https://www.psiquantum.com/',
                    },
                    {
                        visitType: 'company',
                        time: 'Afternoon session',
                        name: 'Orrick',
                        location: 'San Francisco',
                        description: 'Legal ecosystem session on startup financing, company formation, and growth-stage structuring.',
                        websiteUrl: 'https://www.orrick.com/',
                    },
                ],
            },
        ],
        hostsIntro: 'Hosts and ecosystem touchpoints documented in the 2025 program.',
        hosts: [
            { name: 'Netlify', websiteUrl: 'https://www.netlify.com/' },
            { name: 'Boost VC', websiteUrl: 'https://www.boost.vc/' },
            { name: 'Uncork Capital', websiteUrl: 'https://uncork.vc/' },
            { name: 'a16z', websiteUrl: 'https://a16z.com/' },
            { name: 'Start2 Group', websiteUrl: 'https://www.start2.group/' },
            { name: 'UC Berkeley', websiteUrl: 'https://www.berkeley.edu/' },
        ],
        teamIntro: 'Core organizers who launched the first Bay Area year.',
        teamMembers: [
            { name: 'Arian Gohari', role: 'Orga Team' },
            { name: 'Philipp Noel von Lovenberg', role: 'Orga Team' },
            { name: 'Nikolai Müller', role: 'Orga Team' },
            { name: 'Michael', role: 'Orga Team' },
            { name: 'Mark Orester', role: 'Orga Team' },
        ],
    },
    {
        id: '2026',
        label: '2026',
        groupPictureUrl: '/ourMembers/batches_group_pictures/WS25.JPG',
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
        hostsIntro: 'A curated look at the startups, teams, and organizations we visited across the Bay Area.',
        hosts: [
            { name: 'GACC West', logoPath: '/bayarea/logos/gacc-west.svg', websiteUrl: 'https://www.gaccwest.com/' },
            { name: 'Start2 Group', logoPath: '/bayarea/logos/start2-group.svg', websiteUrl: 'https://www.start2.group/' },
            { name: 'CodeRabbit', logoPath: '/bayarea/logos/coderabbit.svg', websiteUrl: 'https://coderabbit.ai/' },
            { name: 'Nvidia', logoPath: '/bayarea/logos/nvidia.svg', websiteUrl: 'https://www.nvidia.com/' },
            { name: 'WindBorne Systems', logoPath: '/bayarea/logos/windborne-systems.svg', websiteUrl: 'https://www.windbornesystems.com/' },
            { name: 'Sebastian Thrun Session' },
            { name: 'Maschmeyer Group', logoPath: '/bayarea/logos/maschmeyer-group.svg', websiteUrl: 'https://www.maschmeyergroup.com/' },
            { name: 'Coherence Neuro', logoPath: '/bayarea/logos/coherence-neuro.svg', websiteUrl: 'https://www.coherenceneuro.com/' },
            { name: 'Rippling', logoPath: '/bayarea/logos/rippling.svg', websiteUrl: 'https://www.rippling.com/' },
            { name: 'Stanford University', logoPath: '/bayarea/logos/stanford-university.svg', websiteUrl: 'https://www.stanford.edu/' },
            { name: 'The Residency', logoPath: '/bayarea/logos/the-residency.svg' },
            { name: 'Google X', logoPath: '/bayarea/logos/google-x.svg', websiteUrl: 'https://x.company/' },
            { name: 'Inflammatix', logoPath: '/bayarea/logos/inflammatix.svg', websiteUrl: 'https://www.inflammatix.com/' },
            { name: 'Sofar Ocean', logoPath: '/bayarea/logos/sofar-ocean.svg', websiteUrl: 'https://www.sofarocean.com/' },
            { name: 'Magrathea', logoPath: '/bayarea/logos/magrathea.svg', websiteUrl: 'https://www.magratheametals.com/' },
            { name: 'Y Combinator', logoPath: '/bayarea/logos/y-combinator.svg', websiteUrl: 'https://www.ycombinator.com/' },
            { name: 'Boost VC', logoPath: '/bayarea/logos/boost-vc.svg', websiteUrl: 'https://www.boost.vc/' },
            { name: 'Pillsbury', logoPath: '/bayarea/logos/pillsbury.svg', websiteUrl: 'https://www.pillsburylaw.com/' },
            { name: 'Founders Inc', logoPath: '/bayarea/logos/founders-inc.svg', websiteUrl: 'https://foundersinc.com/' },
            { name: 'satlyt.ai', logoPath: '/bayarea/logos/satlyt-ai.svg', websiteUrl: 'https://satlyt.ai/' },
            { name: 'Savor', logoPath: '/bayarea/logos/savor.svg', websiteUrl: 'https://www.savor.it/' },
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
        groupPictureUrl: '/ourMembers/batches_group_pictures/WS25.JPG',
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

const normalizeCompanyKey = (name: string) =>
    name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '')
        .trim()

const collectYearCompanyLogos = (year: BayAreaYearContent): BayAreaCompanyLogo[] => {
    const highlightLogos: BayAreaCompanyLogo[] = year.highlightVisits
        .filter((visit) => Boolean(visit.logoPath) && visit.logoPath !== '/startlogo.svg')
        .map((visit) => ({
            name: visit.name,
            logoPath: visit.logoPath!,
            websiteUrl: visit.websiteUrl,
        }))

    const detailedVisitLogos: BayAreaCompanyLogo[] = year.detailedDays
        .flatMap((day) => day.visits)
        .filter(
            (visit): visit is BayAreaVisit & { logoPath: string } =>
                visit.visitType === 'company' && Boolean(visit.logoPath)
        )
        .map((visit) => ({
            name: visit.name,
            logoPath: visit.logoPath,
            websiteUrl: visit.websiteUrl,
        }))

    const hostLogos: BayAreaCompanyLogo[] = year.hosts
        .filter((host): host is { name: string; logoPath: string; websiteUrl?: string } => Boolean(host.logoPath))
        .map((host) => ({
            name: host.name,
            logoPath: host.logoPath,
            websiteUrl: host.websiteUrl,
        }))

    return [...highlightLogos, ...detailedVisitLogos, ...hostLogos]
}

export const bayAreaVisitCompanyLogos: BayAreaCompanyLogo[] = (() => {
    const uniqueLogosByCompany = new Map<string, BayAreaCompanyLogo>()

    for (const year of bayAreaYearContent) {
        if (year.isPreview) {
            continue
        }

        const yearLogos = collectYearCompanyLogos(year)
        for (const logo of yearLogos) {
            const key = normalizeCompanyKey(logo.name)
            const existing = uniqueLogosByCompany.get(key)

            if (!existing) {
                uniqueLogosByCompany.set(key, logo)
                continue
            }

            // Keep whichever entry has a website URL when duplicates exist across years.
            if (!existing.websiteUrl && logo.websiteUrl) {
                uniqueLogosByCompany.set(key, {
                    ...existing,
                    websiteUrl: logo.websiteUrl,
                })
            }
        }
    }

    return Array.from(uniqueLogosByCompany.values()).sort((a, b) => a.name.localeCompare(b.name))
})()
