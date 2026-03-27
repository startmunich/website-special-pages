"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Script from "next/script"
import Hero from "@/components/Hero"
import HeroCard from "@/components/HeroCard"
import { useAnimatedNumber } from "@/lib/useAnimatedNumber"

export const dynamic = 'force-dynamic'

interface Member {
  id: number
  name: string
  batch: string
  role: string
  study?: string
  university?: string
  company?: string
  linkedinUrl?: string
  imageUrl: string
  profileImage?: string
  bio?: string
  expertise?: string[]
  achievements?: string
  gender?: string
}

interface Batch {
  name: string
  semester: string
  year: string
  groupImageUrl: string
  memberCount: number
}

interface BoardMember {
  name: string
  role: string
  imageUrl: string
  profileImage?: string
}

interface Board {
  id: string
  name: string
  year: string
  imageUrl: string
  executiveBoard: BoardMember[]
  departmentBoard: BoardMember[]
}

// Fetch members from API
async function fetchMembers(): Promise<Member[]> {
  try {
    const response = await fetch('/api/members');
    if (!response.ok) throw new Error('Failed to fetch members');
    return await response.json();
  } catch (error) {
    console.error('Error fetching members:', error);
    return [];
  }
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedBatch, setExpandedBatch] = useState<string | null>(null)
  const [expandedBoard, setExpandedBoard] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [batchMembers, setBatchMembers] = useState<Member[]>([])
  const [loadingBatch, setLoadingBatch] = useState(false)
  const [boardLoading, setBoardLoading] = useState(false)
  const itemsPerPage = 12

  // Feature flags
  const showAdvisoryBoard = false // Set to true to show the advisory board section

  // Use animated number hook for statistics (faster animation - 800ms)
  const animatedActiveMembers = useAnimatedNumber(192, loading, 800)
  const animatedAlumniCount = useAnimatedNumber(800, loading, 800)

  // Helper functions - defined early so they can be used in useEffects
  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/)
    if (words.length === 0) return ''
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
    return (words[0][0] + words[words.length - 1][0]).toUpperCase()
  }

  const isPlaceholderImage = (url?: string) => {
    if (!url) return true
    const normalized = url.toLowerCase().trim()
    return normalized === '/batch.jpeg' || normalized.endsWith('/batch.jpeg') || 
           normalized === '/batch.jpg' || normalized.endsWith('/batch.jpg') ||
           normalized === '/batch.png' || normalized.endsWith('/batch.png') ||
           normalized === '/example.png' || normalized.endsWith('/example.png')
  }

  // Load members on mount
  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true)
      const data = await fetchMembers()
      setMembers(data)
      setLoading(false)
    }
    loadMembers()
  }, [])

  // Load batch members when expandedBatch changes
  useEffect(() => {
    if (expandedBatch) {
      const loadBatchMembers = async () => {
        setLoadingBatch(true)
        try {
          const response = await fetch(`/api/members/batch/${encodeURIComponent(expandedBatch)}`)
          if (response.ok) {
            const data = await response.json()
            console.log('API Response data:', data)
            if (Array.isArray(data) && data.length > 0) {
              // Log first few members to check imageUrl
              console.log('First member imageUrl:', data[0]?.imageUrl)
              console.log('Checking if placeholder:', isPlaceholderImage(data[0]?.imageUrl))
              // Transform API response to add profileImage field (clean up placeholder images)
              const transformedData = data.map((member: Member) => ({
                ...member,
                profileImage: isPlaceholderImage(member.imageUrl) ? undefined : member.imageUrl
              }))
              console.log('Transformed data:', transformedData)
              setBatchMembers(transformedData)
            } else {
              // Fallback to mock members, keeps the same card styling
              setBatchMembers(members.filter(m => m.batch === expandedBatch))
            }
          } else {
            // Fallback to filtering from all members
            setBatchMembers(members.filter(m => m.batch === expandedBatch))
          }
        } catch (error) {
          console.error('Error fetching batch members:', error)
          // Fallback to filtering from all members
          setBatchMembers(members.filter(m => m.batch === expandedBatch))
        }
        setLoadingBatch(false)
      }
      loadBatchMembers()
    } else {
      setBatchMembers([])
    }
  }, [expandedBatch, members])

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[\.\-&\/]/g, ' ')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim()

  const roleSynonyms: Record<string, string[]> = {
    cfo: ['chief financial officer', 'chief financial officer (cfo)'],
    'vice president': ['vice-president', 'vice president', 'vp'],
    'md finance operations': ['md finance & operations', 'md finance and operations'],
    'md partnerships': ['md partnerships', 'md partnership'],
    'md marketing': ['md marketing'],
    'md people': ['md people'],
    'md events': ['md events'],
    president: ['president'],
  }

  const roleFallbackImages: Record<string, string> = {
    cfo: '/batch.jpeg',
    president: '/batch.jpeg',
    'vice president': '/batch.jpeg',
    'md events': '/batch.jpeg',
    'md marketing': '/batch.jpeg',
    'md people': '/batch.jpeg',
    'md finance operations': '/batch.jpeg',
    'md finance & operations': '/batch.jpeg',
    'md partnerships': '/batch.jpeg',
  }

  const getFallbackImageByRole = (role: string) => {
    const normalizedRole = normalize(role)
    return (
      roleFallbackImages[normalizedRole] ||
      Object.entries(roleFallbackImages).find(([key]) => normalizedRole.includes(key))?.[1] ||
      '/batch.jpeg'
    )
  }

  const termStartYearFromBoard = (board: Board) => {
    if (board.year && board.year.includes('-')) {
      const [from, to] = board.year.split('-').map((v) => v.trim())
      if (/^\d{4}$/.test(from)) {
        return from
      }
    }

    const parts = board.id.split('-').map((p) => Number(p.trim()))
    if (parts.length === 2 && !Number.isNaN(parts[0])) {
      const from = parts[0] < 100 ? 2000 + parts[0] : parts[0]
      return `${from}`
    }

    return '2024'
  }

  const findByRole = (normalizedBoardMembers: any[]) => (role: string) => {
    if (!role) return null
    const normalizedRole = normalize(role)

    let match = normalizedBoardMembers.find((m) => normalize(m.role || '') === normalizedRole)
    if (match) return match

    const normalizedRoleKey = Object.keys(roleSynonyms).find((key) => {
      return key === normalizedRole || roleSynonyms[key].includes(normalizedRole)
    })

    if (normalizedRoleKey) {
      const aliases = [normalizedRoleKey, ...(roleSynonyms[normalizedRoleKey] || [])].map(normalize)
      match = normalizedBoardMembers.find((m) => {
        const candidate = normalize(m.role || '')
        return aliases.some((alias) => candidate.includes(alias) || alias.includes(candidate))
      })
      if (match) return match
    }

    match = normalizedBoardMembers.find((m) => {
      const candidateRole = normalize(m.role || '')
      return candidateRole.includes(normalizedRole) || normalizedRole.includes(candidateRole)
    })
    if (match) return match

    return null
  }

  const loadBoardMembers = async (boardId: string) => {
    setBoardLoading(true)
    try {
      const board = boards.find((b) => b.id === boardId)
      if (!board) return

      const termStartYear = termStartYearFromBoard(board)
      const response = await fetch(`/api/board?termStartYears=${encodeURIComponent(termStartYear)}`)
      if (!response.ok) {
        console.warn('Board API not available for', termStartYear)
        return
      }

      const data = await response.json()
      if (!data) return

      const candidateData = Array.isArray(data)
        ? data
        : data?.data && Array.isArray(data.data)
          ? data.data
          : []

      const rawMembers: any[] = []
      candidateData.forEach((item: any) => {
        if (item && Array.isArray(item.members)) {
          rawMembers.push(...item.members)
        } else if (item && Array.isArray(item.boardMembers)) {
          rawMembers.push(...item.boardMembers)
        } else if (item && Array.isArray(item.memberList)) {
          rawMembers.push(...item.memberList)
        } else if (item && item.name && item.role) {
          rawMembers.push(item)
        }
      })

      if (rawMembers.length === 0) return

      const normalizedBoardMembers = rawMembers.flatMap((member: any) => {
        const normalizedName = member.name || member.fullName || member.displayName || 'Board Member'
        const normalizedRole = member.role || member.position || member.title || ''
        const profileImage = member.profileImage || ''

        const splitRoles = normalizedRole
          .split(',')
          .map((r: string) => r.trim())
          .filter((r: string) => r.length > 0)

        if (splitRoles.length <= 1) {
          return [{
            ...member,
            name: normalizedName,
            role: normalizedRole,
            profileImage,
          }]
        }

        return splitRoles.map((rolePart: string) => ({
          ...member,
          name: normalizedName,
          role: rolePart,
          profileImage,
        }))
      })

      const matchByRole = findByRole(normalizedBoardMembers)

      setBoards((prev) => prev.map((boardItem) => {
        if (boardItem.id !== boardId) return boardItem

        return {
          ...boardItem,
          executiveBoard: boardItem.executiveBoard.map((member) => {
            const match = matchByRole(member.role)
            const fallback = getFallbackImageByRole(member.role)
            return {
              ...member,
              name: match?.name || member.name,
              profileImage: match?.profileImage || member.profileImage || '',
              imageUrl: match?.profileImage || member.profileImage || member.imageUrl || fallback,
            }
          }),
          departmentBoard: boardItem.departmentBoard.map((member) => {
            const match = matchByRole(member.role)
            const fallback = getFallbackImageByRole(member.role)
            return {
              ...member,
              name: match?.name || member.name,
              profileImage: match?.profileImage || member.profileImage || '',
              imageUrl: match?.profileImage || member.profileImage || member.imageUrl || fallback,
            }
          }),
        }
      }))
    } catch (error) {
      console.error('Error fetching board data:', error)
    } finally {
      setBoardLoading(false)
    }
  }

  useEffect(() => {
    if (expandedBoard) {
      loadBoardMembers(expandedBoard)
    }
  }, [expandedBoard])

  useEffect(() => {
    const loadAllBoards = async () => {
      for (const board of boards) {
        await loadBoardMembers(board.id)
      }
    }

    void loadAllBoards()
  }, [])

  const [boards, setBoards] = useState<Board[]>([
    {
      id: '25-26',
      name: 'Board 25-26',
      year: '2025-2026',
      imageUrl: '/batch.jpeg',
      executiveBoard: [
        { name: 'BOARD MEMBER', role: 'CFO', imageUrl: '/batch.jpeg' },
        { name: 'BOARD MEMBER', role: 'President', imageUrl: '/batch.jpeg' },
        { name: 'BOARD MEMBER', role: 'Vice President', imageUrl: '/batch.jpeg' },
      ],
      departmentBoard: [
        { name: 'BOARD MEMBER', role: 'MD Events', imageUrl: '/batch.jpeg' },
        { name: 'BOARD MEMBER', role: 'MD Marketing', imageUrl: '/batch.jpeg' },
        { name: 'BOARD MEMBER', role: 'MD People', imageUrl: '/batch.jpeg' },
        { name: 'BOARD MEMBER', role: 'MD Finance & Operations', imageUrl: '/batch.jpeg' },
        { name: 'BOARD MEMBER', role: 'MD Partnerships', imageUrl: '/batch.jpeg' },
      ],
    },
    {
      id: '24-25',
      name: 'Board 24-25',
      year: '2024-2025',
      imageUrl: '/batch.jpeg',
      executiveBoard: [
        { name: 'SIMON BURMER', role: 'CFO', imageUrl: '/batch.jpeg' },
        { name: 'ALI SERAG EL DIN', role: 'President', imageUrl: '/batch.jpeg' },
        { name: 'DEFNE AYTUNA', role: 'Vice President', imageUrl: '/batch.jpeg' },
      ],
      departmentBoard: [
        { name: 'MOHAMMED THABIT', role: 'MD Events', imageUrl: '/batch.jpeg' },
        { name: 'PIOTR NOBIS', role: 'MD Marketing', imageUrl: '/batch.jpeg' },
        { name: 'ANNA HELETYCH', role: 'MD People', imageUrl: '/batch.jpeg' },
        { name: 'NIKLAS SIMAKOV', role: 'MD Finance & Operations', imageUrl: '/batch.jpeg' },
        { name: 'MARIUS HEUMADER', role: 'MD Partnerships', imageUrl: '/batch.jpeg' },
      ],
    },
  ])

  // Extract unique batches and ensure older batches are always present
  // Use consistent names like Winter/Summer to match your naming convention
  const defaultBatches = ['Winter 2021', 'Winter 2022', 'Summer 2022']
  const allBatches = Array.from(
    new Set([
      ...members.map(member => member.batch),
      ...defaultBatches,
    ])
  )
    .filter(batch => batch)
    .sort()
    .reverse()

  // Extract unique study subjects
  const allStudies = Array.from(
    new Set(members.map(member => member.study).filter((study): study is string => !!study))
  ).sort()

  // Calculate analytics
  const totalMembers = members.length
  const maleMembers = members.filter(m => m.gender?.toLowerCase() === 'male').length
  const femaleMembers = members.filter(m => m.gender?.toLowerCase() === 'female').length

  // Fixed gender distribution as requested
  const malePercentage = 61
  const femalePercentage = 39

  // Study topics distribution
  const studyDistribution = members.reduce((acc, member) => {
    if (member.study) {
      acc[member.study] = (acc[member.study] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  // Top Study Fields (fixed)
  const topStudies = [
    { study: 'Business Administration', count: 0, percentage: 35 },
    { study: 'Computer Science', count: 0, percentage: 35 },
    { study: 'Engineering', count: 0, percentage: 15 },
    { study: 'Others', count: 0, percentage: 15 },
  ]

  // Top Universities (fixed)
  const topUniversities = [
    { university: 'TUM', count: 0, percentage: 65 },
    { university: 'LMU', count: 0, percentage: 20 },
    { university: 'HM', count: 0, percentage: 7 },
    { university: 'AMD', count: 0, percentage: 3 },
    { university: 'Others', count: 0, percentage: 5 },
  ]

  // Mapping von Batch-Namen zu Bilddateinamen
  const batchImageMap: Record<string, string> = {
    'ws21': 'WS21.jpg',
    'ws22': 'WS22.jpg',
    'ws23': 'WS23.JPG',
    'ws24': 'WS24.JPG',
    'ws25': 'WS25.JPG',
    'ss22': 'SS22.jpg',
    'ss23': 'SS23.JPG',
    'ss24': 'SS24.jpg',
    'ss25': 'SS25.jpg'
  }

  // Funktion um Batch-Namen zu normalisieren (z.B. "Summer 2023" -> "ss23")
  function getBatchImageKey(batchName: string): string | null {
    const normalized = batchName.toLowerCase().trim()

    // Versuche "Winter/Summer YYYY" Format zu matchen.
    const fullMatch = normalized.match(/^(winter|summer)\s+(\d{4})$/)
    if (fullMatch) {
      const semester = fullMatch[1] === 'winter' ? 'ws' : 'ss'
      const year = fullMatch[2].slice(-2) // Letzte 2 Ziffern
      return `${semester}${year}`
    }

    // Versuche "WS/SS YYYY" Format mit vierstelliger Jahreszahl zu matchen
    const fourDigitMatch = normalized.match(/^(ws|ss)\s*(\d{4})$/)
    if (fourDigitMatch) {
      const semester = fourDigitMatch[1]
      const year = fourDigitMatch[2].slice(-2)
      return `${semester}${year}`
    }

    // Versuche "WS/SS YY" Format zu matchen
    const shortMatch = normalized.match(/^(ws|ss)\s*(\d{2})$/)
    if (shortMatch) {
      return `${shortMatch[1]}${shortMatch[2]}`
    }

    return null
  }

  // Prüfe ob ein Batch ab WS21 ist
  function isAfterWS21(batchName: string): boolean {
    const normalized = batchName.toLowerCase().trim()

    // Extrahiere Jahr und Semester
    let year: number | null = null
    let isWinter = false

    const fullMatch = normalized.match(/^(winter|summer)\s+(\d{4})$/)
    if (fullMatch) {
      year = parseInt(fullMatch[2].slice(-2))
      isWinter = fullMatch[1] === 'winter'
    }

    const shortMatch = normalized.match(/^(ws|ss)\s*(\d{2})$/)
    if (shortMatch) {
      year = parseInt(shortMatch[2])
      isWinter = shortMatch[1] === 'ws'
    }

    if (year === null) return false

    // WS21 = Winter 2021 ist der Cutoff
    // Alles ab WS21 soll angezeigt werden
    if (year > 21) return true
    if (year === 21 && isWinter) return true

    return false
  }

  // Group members by batch for batch cards
  const batchGroups = allBatches.map(batchName => {
    const batchMembers = members.filter(m => m.batch === batchName)
    const batchKey = getBatchImageKey(batchName)
    const shouldShowImage = isAfterWS21(batchName)

    // Bestimme das Bild: Nur wenn nach WS21 UND ein Mapping existiert
    let groupImageUrl = '/batch.jpeg' // Default
    if (shouldShowImage && batchKey && batchImageMap[batchKey]) {
      groupImageUrl = `/images/batches_group_pictures/${batchImageMap[batchKey]}`
    }

    return {
      name: batchName,
      semester: batchName.split(' ')[0] || 'Batch',
      year: batchName.split(' ')[1] || '',
      groupImageUrl,
      memberCount: batchMembers.length
    }
  })

  // Sort batches by year (newest first), then by semester
  const sortedBatches = batchGroups.sort((a, b) => {
    const yearDiff = parseInt(b.year) - parseInt(a.year)
    if (yearDiff !== 0) return yearDiff
    // If same year, Winter comes before Summer
    if (a.semester.toLowerCase().includes('winter') || a.semester.toLowerCase().startsWith('w')) return -1
    if (b.semester.toLowerCase().includes('winter') || b.semester.toLowerCase().startsWith('w')) return 1
    return 0
  })

  // No filtering needed anymore, show all members in batches

  if (loading) {
    return (
      <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-2xl font-bold text-[#00002c]">Loading members...</p>
        </div>
      </main>
    )
  }

  return (
    <>
      <Script id="iframe-height-sender" strategy="afterInteractive">
        {`
          function sendHeight() {
            const h = Math.max(
              document.documentElement.scrollHeight,
              document.body.scrollHeight
            );
            parent.postMessage({ type: "EMBED_HEIGHT", height: h }, "*");
          }

          window.addEventListener("load", sendHeight);
          const ro = new ResizeObserver(sendHeight);
          ro.observe(document.documentElement);
          document.addEventListener("DOMContentLoaded", sendHeight);
        `}
      </Script>

      <main className="min-h-screen bg-[#00002c]">
        {/* Hero Section with Full-Width Image */}
        <Hero
          backgroundImage="/member-background.png"
          title={
            <>
              START MUNICH
              <br />
              <span className="outline-text">MEMBERS</span>
            </>
          }
          description="Meet the ambitious student entrepreneurs building the future of technology and innovation"
        >
          {/* Statistics Boxes - Matching Startup Cards Style */}
          <div className="flex flex-col gap-6">
            {/** Active Members Card **/}
            <HeroCard>
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300 group-hover:to-[#d0006f] transition">
                  {Math.floor(animatedActiveMembers)}
                </span>
              </div>
              <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Active Members</p>
            </HeroCard>

            {/** Alumni Card **/}
            <HeroCard>
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300 group-hover:to-[#d0006f] transition">
                  {Math.floor(animatedAlumniCount)}
                </span>
                <span className="text-3xl font-bold text-[#d0006f]">+</span>
              </div>
              <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Alumni</p>
            </HeroCard>
          </div>
        </Hero>

        {/* Content Below Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          {/* Join Our Community CTA
          <div className="mb-16 relative">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#d0006f]/20 via-[#00002c] to-[#d0006f]/10 border border-[#d0006f]/30 p-1">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d0006f]/20 via-transparent to-[#d0006f]/20 animate-pulse"></div>
              
              <div className="relative bg-[#00002c] rounded-xl p-8 md:p-12">
                <div className="absolute top-10 right-10 w-32 h-32 bg-[#d0006f]/30 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#d0006f]/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#d0006f]/20 border border-[#d0006f]/40 rounded-full mb-4">
                      <div className="w-2 h-2 bg-[#d0006f] rounded-full animate-pulse"></div>
                      <span className="text-[#d0006f] font-bold text-xs tracking-widest uppercase">Applications Open</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                      Become Part of{" "}
                      <span className="no-stroke bg-gradient-to-r from-[#d0006f] via-pink-400 to-[#d0006f] bg-clip-text text-transparent animate-pulse">
                        Our Community
                      </span>
                    </h2>
                    
                    <p className="text-lg text-gray-300 mb-6 max-w-2xl leading-relaxed">
                      Join Munich's most vibrant student entrepreneur community and build your startup with like-minded founders.
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <a
                      href="https://www.startmunich.de/apply"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d0006f] to-pink-600 hover:from-[#d0006f] hover:to-[#d0006f] text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#d0006f]/50 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                      <span className="relative">Apply Now</span>
                      <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Analytics Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
              COMMUNITY <span className="outline-text">ANALYTICS</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Gender Distribution */}
              <div className="group relative backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 p-6 border border-white/20 hover:border-[#d0006f] transition-all duration-300 hover:shadow-lg hover:shadow-[#d0006f]/20">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Gender Distribution</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">Male</span>
                        <span className="text-sm font-bold text-white">{malePercentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000"
                          style={{ width: `${malePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">Female</span>
                        <span className="text-sm font-bold text-white">{femalePercentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-500 to-pink-400 transition-all duration-1000"
                          style={{ width: `${femalePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Study Topics Distribution */}
              <div className="group relative backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 p-6 border border-white/20 hover:border-[#d0006f] transition-all duration-300 hover:shadow-lg hover:shadow-[#d0006f]/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400 font-medium">Top Study Fields</p>
                </div>
                <div className="space-y-2">
                  {topStudies.map(({ study, count, percentage }, index) => (
                    <div key={study} className="flex items-center justify-between">
                      <span className="text-xs text-gray-300 truncate flex-1">{study}</span>
                      <span className="text-xs font-bold text-[#d0006f] ml-2">{percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* University Distribution */}
              <div className="group relative backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 p-6 border border-white/20 hover:border-[#d0006f] transition-all duration-300 hover:shadow-lg hover:shadow-[#d0006f]/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400 font-medium">Top Universities</p>
                </div>
                <div className="space-y-2">
                  {topUniversities.length > 0 ? (
                    topUniversities.map(({ university, count, percentage }, index) => (
                      <div key={university} className="flex items-center justify-between">
                        <span className="text-xs text-gray-300 truncate flex-1">{university}</span>
                        <span className="text-xs font-bold text-[#d0006f] ml-2">{percentage}%</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400">No university data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* The Boards Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
              THE <span className="outline-text">BOARDS</span>
            </h2>

            {/* Show expanded board if selected */}
            {expandedBoard ? (
              <div>
                <button
                  onClick={() => setExpandedBoard(null)}
                  className="mb-6 text-white/60 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to all boards
                </button>

                {boards.filter(board => board.id === expandedBoard).map((board) => (
                  <div key={board.id} className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-12">
                    {/* Executive Board */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-6 text-center">
                        THE <span className="outline-text">EXECUTIVE BOARD</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {board.executiveBoard.map((member, index) => (
                          <div key={index} className="group relative overflow-hidden transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg">
                            <div className="relative">
                              {member.profileImage ? (
                                <img
                                  src={member.profileImage}
                                  alt={member.name}
                                  className="w-full h-64 object-cover"
                                />
                              ) : (
                                <div className="w-full h-64 flex items-center justify-center bg-[#00002c] text-white text-4xl font-black">
                                  {getInitials(member.name)}
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#00002c] via-[#00002c]/50 to-transparent"></div>
                              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                                <h4 className="font-black text-white text-xl mb-1">{member.name}</h4>
                                <p className="text-white text-sm font-semibold">{member.role}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Department Board */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-6 text-center">
                        THE <span className="outline-text">DEPARTMENT BOARD</span>
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
                        {board.departmentBoard.map((member, index) => (
                          <div key={index} className="group relative overflow-hidden transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg">
                            <div className="relative">
                              {member.profileImage ? (
                                <img
                                  src={member.profileImage}
                                  alt={member.name}
                                  className="w-full h-48 object-cover"
                                />
                              ) : (
                                <div className="w-full h-48 flex items-center justify-center bg-[#00002c] text-white text-3xl font-black">
                                  {getInitials(member.name)}
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#00002c] via-[#00002c]/50 to-transparent"></div>
                              <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                                <h4 className="font-bold text-white text-sm mb-1">{member.name}</h4>
                                <p className="text-pink-300 text-xs font-semibold">{member.role}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Show grid of board cards */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {boards.map((board) => (
                  <button
                    key={board.id}
                    onClick={() => setExpandedBoard(board.id)}
                    className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#d0006f]/20 text-left"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={board.imageUrl}
                        alt={board.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00002c] via-[#00002c]/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl md:text-2xl font-black text-white">{board.name}</h3>
                        <p className="text-sm text-gray-300 mt-1">Click to view board members</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* The Advisory Boards Section */}
          {showAdvisoryBoard && (
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
                <span className="outline-text">THE</span> ADVISORY BOARDS
              </h2>

              {/* Show expanded board if selected */}
              {expandedBoard ? (
                <div>
                  <button
                    onClick={() => setExpandedBoard(null)}
                    className="mb-6 text-white/60 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to all boards
                  </button>

                  {boards.filter(board => board.id === expandedBoard).map((board) => (
                    <div key={board.id} className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-12">
                      {/* Executive Board */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-6 text-center">
                          THE <span className="outline-text">EXECUTIVE BOARD</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                          {board.executiveBoard.map((member, index) => (
                            <div key={index} className="group relative overflow-hidden transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg">
                              <div className="relative">
                                {member.profileImage ? (
                                  <img
                                    src={member.profileImage}
                                    alt={member.name}
                                    className="w-full h-64 object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-64 bg-[#00002c]" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#00002c] via-[#00002c]/50 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                                  <h4 className="font-black text-white text-xl mb-1">{member.name}</h4>
                                  <p className="text-white text-sm font-semibold">{member.role}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Department Board */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-6 text-center">
                          THE <span className="outline-text">DEPARTMENT BOARD</span>
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
                          {board.departmentBoard.map((member, index) => (
                            <div key={index} className="group relative overflow-hidden transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg">
                              <div className="relative">
                                {member.profileImage || member.imageUrl ? (
                                  <img
                                    src={member.profileImage || member.imageUrl}
                                    alt={member.name}
                                    className="w-full h-48 object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-48 bg-[#00002c]" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#00002c] via-[#00002c]/50 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                                  <h4 className="font-bold text-white text-sm mb-1">{member.name}</h4>
                                  <p className="text-pink-300 text-xs font-semibold">{member.role}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Show grid of board cards */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {boards.map((board) => (
                    <button
                      key={board.id}
                      onClick={() => setExpandedBoard(board.id)}
                      className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#d0006f]/20 text-left"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={board.imageUrl}
                          alt={board.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00002c] via-[#00002c]/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-xl md:text-2xl font-black text-white">{board.name}</h3>
                          <p className="text-sm text-gray-300 mt-1">Click to view board members</p>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}


          {/* Batch Images Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
              OUR <span className="outline-text">BATCHES</span>
            </h2>

            {/* Show expanded batch full width if selected */}
            {expandedBatch ? (
              <div>
                <button
                  onClick={() => setExpandedBatch(null)}
                  className="mb-6 text-white/60 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to all batches
                </button>

                {sortedBatches.filter(b => b.name === expandedBatch).map((batch) => (
                  <div key={batch.name} className="space-y-0">
                    <h3 className="text-2xl md:text-3xl font-black text-white text-left">
                      {batch.name}
                    </h3>
                    <div className="w-full block relative bg-white/5 border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#d0006f]/20">
                      {/* Background Image - Large (80% viewport height) */}
                      <div className="relative w-full h-[70vh] md:h-[70vh] overflow-hidden bg-[#00002c]">
                        <img
                          src={batch.groupImageUrl}
                          alt={batch.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00002c]/40 via-[#00002c]/10 to-transparent"></div>
                      </div>

                      {/* Hover effect accent */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </div>

                    {/* Members Grid */}
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      {loadingBatch ? (
                        <div className="flex justify-center items-center py-12">
                          <p className="text-white">Loading batch members...</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                          {batchMembers.map((member) => (
                            <a
                              key={member.id}
                              href={member.linkedinUrl || '#'}
                              target={member.linkedinUrl ? "_blank" : undefined}
                              rel={member.linkedinUrl ? "noopener noreferrer" : undefined}
                              className={`group relative overflow-hidden transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg hover:scale-105 ${member.linkedinUrl ? 'cursor-pointer' : 'cursor-default'} z-10 aspect-square`}
                            >
                              <div className="relative w-full h-full">
                                {member.profileImage ? (
                                  <img
                                    src={member.profileImage}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-[#00002c] text-[#b8c4d8] text-4xl font-black opacity-90">
                                    {getInitials(member.name)}
                                  </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-[#00002c]/40 via-[#00002c]/10 to-transparent"></div>

                                {member.linkedinUrl && (
                                  <div className="absolute top-2 right-2">
                                    <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                                      <svg className="w-4 h-4 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                      </svg>
                                    </div>
                                  </div>
                                )}

                                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                                  <h4 className="font-black text-white text-xl mb-1">{member.name}</h4>
                                  <p className="text-pink-300 text-xs font-semibold">{member.study || member.role}</p>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Show grid of batch thumbnails */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedBatches.map((batch) => (
                  <div key={batch.name} className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-black text-white">
                      {batch.name}
                    </h3>
                    <button
                      onClick={() => setExpandedBatch(batch.name)}
                      className="w-full group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#d0006f]/20"
                    >
                      {/* Background Image */}
                      <div className="relative h-[400px] overflow-hidden bg-[#00002c]">
                        <img
                          src={batch.groupImageUrl}
                          alt={batch.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00002c]/40 via-[#00002c]/10 to-transparent"></div>
                      </div>

                      {/* Hover effect accent */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d0006f] to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>        </div>
      </main>
    </>
  )
}
