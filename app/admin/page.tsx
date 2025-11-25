"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { Company } from "@/lib/types"

export const dynamic = 'force-dynamic'

function AdminPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams?.get('edit')

  const [view, setView] = useState<'list' | 'form'>('list')
  const [mode, setMode] = useState<'add' | 'edit'>('add')
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [selectedStartupId, setSelectedStartupId] = useState<string | null>(null)

  const [memberPictureFile, setMemberPictureFile] = useState<File | null>(null)
  const [companyLogoFile, setCompanyLogoFile] = useState<File | null>(null)
  const [memberPicturePreview, setMemberPicturePreview] = useState<string | null>(null)
  const [companyLogoPreview, setCompanyLogoPreview] = useState<string | null>(null)
  const [logoWarning, setLogoWarning] = useState<string | null>(null)
  const [batchWarning, setBatchWarning] = useState<string | null>(null)
  const [existingCategories, setExistingCategories] = useState<string[]>([])
  const [existingSupportingPrograms, setExistingSupportingPrograms] = useState<string[]>([])
  const [existingCompanyRoles, setExistingCompanyRoles] = useState<string[]>([])
  const [existingInvestmentRounds, setExistingInvestmentRounds] = useState<string[]>([])

  const [formData, setFormData] = useState({
    startupName: "",
    companyWebsite: "",
    shortDescription: "",
    descriptionLong: "",
    companyLogo: "",
    foundingYear: new Date().getFullYear().toString(),
    chategory: "",
    startMunichMember: "",
    companyRole: "Founder",
    batch: "",
    memberPicture: "",
    memberLinkedin: "",
    investmentSize: "",
    employees: "",
    featuredStartup: "no",
    yCombinatorAlumni: "no",
    mtz: "no",
    ewor: "no",
    companyLinkedin: "",
    lastInvestmentRound: "",
    firstMilestones: "",
    supportingPrograms: "",
  })

  // Load companies on mount and when view changes to list
  useEffect(() => {
    loadCompanies()
  }, [])

  useEffect(() => {
    if (view === 'list') {
      loadCompanies()
    }
  }, [view])

  // Handle edit query parameter
  useEffect(() => {
    if (editId) {
      handleEditStartup(editId)
    }
  }, [editId])

  const loadCompanies = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/startups')
      if (!response.ok) throw new Error('Failed to fetch startups')
      const data = await response.json()
      setCompanies(data)

      // Extract unique categories
      const categoriesSet = new Set<string>()
      data.forEach((company: Company) => {
        company.category?.forEach(cat => {
          if (cat && cat.trim()) {
            categoriesSet.add(cat.trim())
          }
        })
      })
      setExistingCategories(Array.from(categoriesSet).sort())

      // Extract unique supporting programs
      const programsSet = new Set<string>()
      data.forEach((company: Company) => {
        if (company.supportingPrograms) {
          company.supportingPrograms.split(',').forEach(prog => {
            const trimmed = prog.trim()
            if (trimmed) {
              programsSet.add(trimmed)
            }
          })
        }
      })
      setExistingSupportingPrograms(Array.from(programsSet).sort())

      // Extract unique company roles
      const rolesSet = new Set<string>()
      data.forEach((company: Company) => {
        company.founders?.forEach(founder => {
          if (founder.role && founder.role.trim()) {
            rolesSet.add(founder.role.trim())
          }
        })
      })
      setExistingCompanyRoles(Array.from(rolesSet).sort())

      // Extract unique investment rounds
      const roundsSet = new Set<string>()
      data.forEach((company: Company) => {
        if (company.investmentRound && company.investmentRound.trim()) {
          roundsSet.add(company.investmentRound.trim())
        }
      })
      setExistingInvestmentRounds(Array.from(roundsSet).sort())
    } catch (error) {
      console.error('Error fetching startups:', error)
      setError('Failed to load startups')
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = () => {
    setMode('add')
    setView('form')
    setSelectedStartupId(null)
    resetForm()
    window.history.pushState({}, '', '/admin')
  }

  const handleEditStartup = async (id: string) => {
    setSelectedStartupId(id)
    setMode('edit')
    setView('form')
    setLoading(true)
    setSaving(false)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch(`/api/startups/${id}`)
      if (!response.ok) throw new Error('Failed to fetch startup')

      const data = await response.json()

      setFormData({
        startupName: data.name || "",
        companyWebsite: data.website || "",
        shortDescription: data.summary || "",
        descriptionLong: data.description || "",
        companyLogo: data.logoUrl || "",
        foundingYear: data.foundingYear?.toString() || new Date().getFullYear().toString(),
        chategory: data.category?.join(", ") || "",
        startMunichMember: data.founders?.[0]?.name || "",
        companyRole: data.founders?.[0]?.role || "Founder",
        batch: data.founders?.[0]?.batch || "",
        memberPicture: data.founders?.[0]?.imageUrl || "",
        memberLinkedin: data.founders?.[0]?.linkedinUrl || "",
        investmentSize: data.totalRaised || "",
        employees: data.employees?.toString() || "",
        featuredStartup: data.isSpotlight ? "yes" : "no",
        yCombinatorAlumni: data.isYCombinator ? "yes" : "no",
        mtz: data.isMTZ ? "yes" : "no",
        ewor: data.isEWOR ? "yes" : "no",
        companyLinkedin: data.companyLinkedin || "",
        lastInvestmentRound: data.investmentRound || "",
        firstMilestones: data.milestones || "",
        supportingPrograms: data.supportingPrograms || "",
      })

      window.history.pushState({}, '', `/admin?edit=${id}`)
    } catch (err) {
      setError('Failed to load startup data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleBackToList = () => {
    setView('list')
    setMode('add')
    setSelectedStartupId(null)
    resetForm()
    window.history.pushState({}, '', '/admin')
  }

  const resetForm = () => {
    setFormData({
      startupName: "",
      companyWebsite: "",
      shortDescription: "",
      descriptionLong: "",
      companyLogo: "",
      foundingYear: new Date().getFullYear().toString(),
      chategory: "",
      startMunichMember: "",
      companyRole: "Founder",
      batch: "",
      memberPicture: "",
      memberLinkedin: "",
      investmentSize: "",
      employees: "",
      featuredStartup: "no",
      yCombinatorAlumni: "no",
      mtz: "no",
      ewor: "no",
      companyLinkedin: "",
      lastInvestmentRound: "",
      firstMilestones: "",
      supportingPrograms: "",
    })
    setMemberPictureFile(null)
    setCompanyLogoFile(null)
    setMemberPicturePreview(null)
    setCompanyLogoPreview(null)
    setLogoWarning(null)
    setBatchWarning(null)
    setError(null)
    setSuccess(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Validate batch format
    if (name === 'batch') {
      if (value.trim() === '') {
        setBatchWarning(null)
      } else {
        const batchPattern = /^(WS|SS)\d{2}$/
        if (!batchPattern.test(value.trim())) {
          setBatchWarning('Batch must follow format: WS23 or SS24')
        } else {
          setBatchWarning(null)
        }
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }))
  }



  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'memberPicture' | 'companyLogo') => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    if (fieldName === 'memberPicture') {
      setMemberPictureFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setMemberPicturePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setCompanyLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = async () => {
        const imageData = reader.result as string
        setCompanyLogoPreview(imageData)


      }
      reader.readAsDataURL(file)
    }
  }

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      // Check for duplicate startup name when adding
      if (mode === 'add') {
        const existingStartup = companies.find(
          company => company.name.toLowerCase().trim() === formData.startupName.toLowerCase().trim()
        )
        if (existingStartup) {
          throw new Error(`A startup with the name "${formData.startupName}" already exists. Please use a different name.`)
        }
      }

      const submitData = { ...formData }

      if (memberPictureFile) {
        submitData.memberPicture = await convertFileToBase64(memberPictureFile)
      }
      if (companyLogoFile) {
        submitData.companyLogo = await convertFileToBase64(companyLogoFile)
      }

      const url = mode === 'add' ? '/api/startups/add' : `/api/startups/${selectedStartupId}`
      const method = mode === 'add' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to ${mode} startup`)
      }

      setSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })

      // Reload companies to update lists
      await loadCompanies()

      if (mode === 'add') {
        // Reset form after a delay so success message is visible
        setTimeout(() => {
          resetForm()
          setSuccess(false)
        }, 3000)
      } else {
        setTimeout(() => {
          handleBackToList()
        }, 2000)
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedStartupId) return

    if (!confirm('Are you sure you want to delete this startup? This action cannot be undone.')) {
      return
    }

    setSaving(true)
    setError(null)

    try {
      const response = await fetch(`/api/startups/${selectedStartupId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete startup')
      }

      handleBackToList()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setSaving(false)
    }
  }

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // List View
  if (view === 'list') {
    return (
      <main className="min-h-screen bg-[#00002c] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Manage Startups</h1>
              <p className="text-gray-400">Add new startups or edit existing ones</p>
            </div>
            <button
              onClick={handleAddNew}
              className="px-6 py-3 bg-[#d0006f] hover:bg-[#d0006f]/90 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Startup
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search startups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
            />
          </div>

          {loading && (
            <div className="text-center py-12">
              <p className="text-xl text-white">Loading startups...</p>
            </div>
          )}

          {/* Startups Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  onClick={() => handleEditStartup(company.id.toString())}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d0006f]/50 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-center bg-white p-6 h-32">
                    <img
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{company.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">{company.summary}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="text-[#d0006f] group-hover:text-[#d0006f]/80 font-medium">
                        Edit →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No startups found</p>
            </div>
          )}
        </div>
      </main>
    )
  }

  // Form View (Add/Edit)
  return (
    <main className="min-h-screen bg-[#00002c] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {mode === 'add' ? 'Add New Startup' : 'Edit Startup'}
            </h1>
            <p className="text-sm text-gray-400">
              {mode === 'add' ? 'Submit a new startup to the database' : 'Update startup information'}
            </p>
          </div>
          <button
            onClick={handleBackToList}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to List
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-xl text-white">Loading...</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/40 rounded-lg">
            <p className="text-green-400 font-medium">
              ✓ Startup {mode === 'add' ? 'added' : 'updated'} successfully!
              {mode === 'edit' && ' Redirecting...'}
            </p>
          </div>
        )}

        {!loading && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Company Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="startupName" className="block text-sm font-medium text-gray-300 mb-2">
                    Startup Name *
                  </label>
                  <input
                    type="text"
                    id="startupName"
                    name="startupName"
                    required
                    value={formData.startupName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                    placeholder="Enter startup name"
                  />
                </div>

                <div>
                  <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Website
                  </label>
                  <input
                    type="text"
                    id="companyWebsite"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                    placeholder="example.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Logo {mode === 'edit' && formData.companyLogo && '(Current logo will be replaced if new file uploaded)'}
                  </label>
                  <input
                    type="file"
                    id="companyLogo"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'companyLogo')}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#d0006f] file:text-white hover:file:bg-[#d0006f]/90 file:cursor-pointer"
                  />
                  <p className="text-xs text-gray-400 mt-1">Max size: 5MB. Logo should NOT be white (displayed on white background)</p>

                  {logoWarning && (
                    <div className="mt-3 p-3 bg-yellow-500/20 border border-yellow-500/40 rounded-lg">
                      <p className="text-yellow-300 text-sm">{logoWarning}</p>
                    </div>
                  )}

                  {(companyLogoPreview || (mode === 'edit' && formData.companyLogo)) && (
                    <div className="mt-3 p-4 bg-white rounded-lg">
                      <img
                        src={companyLogoPreview || formData.companyLogo}
                        alt="Logo preview"
                        className="max-h-32 max-w-full object-contain mx-auto"
                      />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-300 mb-2">
                    Short Description *
                  </label>
                  <textarea
                    id="shortDescription"
                    name="shortDescription"
                    required
                    rows={2}
                    value={formData.shortDescription}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                    placeholder="Brief summary (1-2 sentences)"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="descriptionLong" className="block text-sm font-medium text-gray-300 mb-2">
                    Long Description *
                  </label>
                  <textarea
                    id="descriptionLong"
                    name="descriptionLong"
                    required
                    rows={4}
                    value={formData.descriptionLong}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                    placeholder="Detailed description"
                  />
                </div>

                <div>
                  <label htmlFor="foundingYear" className="block text-sm font-medium text-gray-300 mb-2">
                    Founding Year *
                  </label>
                  <input
                    type="number"
                    id="foundingYear"
                    name="foundingYear"
                    required
                    min="2000"
                    max={new Date().getFullYear()}
                    value={formData.foundingYear}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                  />
                </div>

                <div>
                  <label htmlFor="chategory" className="block text-sm font-medium text-gray-300 mb-2">
                    Categories (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="chategory"
                    name="chategory"
                    value={formData.chategory}
                    onChange={handleChange}
                    list="categories-list"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                    placeholder="e.g., SaaS, FinTech, AI"
                  />
                  <datalist id="categories-list">
                    {existingCategories.map((cat, idx) => (
                      <option key={idx} value={cat} />
                    ))}
                  </datalist>
                  {existingCategories.length > 0 && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-300">Show already existing categories ({existingCategories.length})</summary>
                      <div className="mt-2 p-2 bg-white/5 rounded border border-white/10 max-h-32 overflow-y-auto">
                        <div className="flex flex-wrap gap-1">
                          {existingCategories.map((cat, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                const current = formData.chategory
                                const newValue = current ? `${current}, ${cat}` : cat
                                setFormData(prev => ({ ...prev, chategory: newValue }))
                              }}
                              className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 text-gray-300 rounded transition-colors"
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                    </details>
                  )}
                </div>

                <div>
                  <label htmlFor="companyLinkedin" className="block text-sm font-medium text-gray-300 mb-2">
                    Company LinkedIn
                  </label>
                  <input
                    type="url"
                    id="companyLinkedin"
                    name="companyLinkedin"
                    value={formData.companyLinkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
              </div>
            </div>

            {/* Founder Information */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Founder Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startMunichMember" className="block text-sm font-medium text-gray-300 mb-2">
                    START Munich Member Name *
                  </label>
                  <input
                    type="text"
                    id="startMunichMember"
                    name="startMunichMember"
                    required
                    value={formData.startMunichMember}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label htmlFor="companyRole" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Role (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="companyRole"
                    name="companyRole"
                    value={formData.companyRole}
                    onChange={handleChange}
                    list="roles-list"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                    placeholder="e.g., CEO, CTO, Founder"
                  />
                  <datalist id="roles-list">
                    {existingCompanyRoles.map((role, idx) => (
                      <option key={idx} value={role} />
                    ))}
                  </datalist>
                  {existingCompanyRoles.length > 0 && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-300">Show existing roles ({existingCompanyRoles.length})</summary>
                      <div className="mt-2 p-2 bg-white/5 rounded border border-white/10 max-h-32 overflow-y-auto">
                        <div className="flex flex-wrap gap-1">
                          {existingCompanyRoles.map((role, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, companyRole: role }))
                              }}
                              className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 text-gray-300 rounded transition-colors"
                            >
                              {role}
                            </button>
                          ))}
                        </div>
                      </div>
                    </details>
                  )}
                </div>

                <div>
                  <label htmlFor="batch" className="block text-sm font-medium text-gray-300 mb-2">
                    Batch (Semester as prefix)
                  </label>
                  <input
                    type="text"
                    id="batch"
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                    placeholder="e.g., WS23 or SS24"
                  />
                  {batchWarning && (
                    <p className="text-yellow-400 text-xs mt-2">⚠️ {batchWarning}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="memberLinkedin" className="block text-sm font-medium text-gray-300 mb-2">
                    Member LinkedIn
                  </label>
                  <input
                    type="url"
                    id="memberLinkedin"
                    name="memberLinkedin"
                    value={formData.memberLinkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="memberPicture" className="block text-sm font-medium text-gray-300 mb-2">
                    Member Picture {mode === 'edit' && formData.memberPicture && '(Current picture will be replaced if new file uploaded)'}
                  </label>
                  <input
                    type="file"
                    id="memberPicture"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'memberPicture')}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#d0006f] file:text-white hover:file:bg-[#d0006f]/90 file:cursor-pointer"
                  />
                  <p className="text-xs text-gray-400 mt-1">Max size: 5MB</p>
                  {(memberPicturePreview || (mode === 'edit' && formData.memberPicture)) && (
                    <div className="mt-3 p-4 bg-white rounded-lg inline-block">
                      <img
                        src={memberPicturePreview || formData.memberPicture}
                        alt="Member preview"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Funding & Metrics */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Funding & Metrics</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="investmentSize" className="block text-sm font-medium text-gray-300 mb-2">
                    Investment Size
                  </label>
                  <input
                    type="text"
                    id="investmentSize"
                    name="investmentSize"
                    value={formData.investmentSize}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                    placeholder="€500,000"
                  />
                </div>

                <div>
                  <label htmlFor="lastInvestmentRound" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Investment Round
                  </label>
                  <input
                    type="text"
                    id="lastInvestmentRound"
                    name="lastInvestmentRound"
                    value={formData.lastInvestmentRound}
                    onChange={handleChange}
                    list="rounds-list"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                    placeholder="e.g., Seed, Series A"
                  />
                  <datalist id="rounds-list">
                    {existingInvestmentRounds.map((round, idx) => (
                      <option key={idx} value={round} />
                    ))}
                  </datalist>
                  {existingInvestmentRounds.length > 0 && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-300">Show existing rounds ({existingInvestmentRounds.length})</summary>
                      <div className="mt-2 p-2 bg-white/5 rounded border border-white/10 max-h-32 overflow-y-auto">
                        <div className="flex flex-wrap gap-1">
                          {existingInvestmentRounds.map((round, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, lastInvestmentRound: round }))
                              }}
                              className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 text-gray-300 rounded transition-colors"
                            >
                              {round}
                            </button>
                          ))}
                        </div>
                      </div>
                    </details>
                  )}
                </div>

                <div>
                  <label htmlFor="employees" className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    id="employees"
                    name="employees"
                    min="0"
                    value={formData.employees}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label htmlFor="supportingPrograms" className="block text-sm font-medium text-gray-300 mb-2">
                    Supporting Programs (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="supportingPrograms"
                    name="supportingPrograms"
                    value={formData.supportingPrograms}
                    onChange={handleChange}
                    list="programs-list"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                    placeholder="e.g., EXIST, Xplore, YC"
                  />
                  <datalist id="programs-list">
                    {existingSupportingPrograms.map((prog, idx) => (
                      <option key={idx} value={prog} />
                    ))}
                  </datalist>
                  {existingSupportingPrograms.length > 0 && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-300">Show existing programs ({existingSupportingPrograms.length})</summary>
                      <div className="mt-2 p-2 bg-white/5 rounded border border-white/10 max-h-32 overflow-y-auto">
                        <div className="flex flex-wrap gap-1">
                          {existingSupportingPrograms.map((prog, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                const current = formData.supportingPrograms
                                const newValue = current ? `${current}, ${prog}` : prog
                                setFormData(prev => ({ ...prev, supportingPrograms: newValue }))
                              }}
                              className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 text-gray-300 rounded transition-colors"
                            >
                              {prog}
                            </button>
                          ))}
                        </div>
                      </div>
                    </details>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="firstMilestones" className="block text-sm font-medium text-gray-300 mb-2">
                    First Milestones
                  </label>
                  <textarea
                    id="firstMilestones"
                    name="firstMilestones"
                    rows={3}
                    value={formData.firstMilestones}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                    placeholder="Key achievements"
                  />
                </div>
              </div>
            </div>

            {/* Special Flags */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Special Flags</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="featuredStartup" className="block text-sm font-medium text-gray-300 mb-2">
                    Featured Startup
                  </label>
                  <select
                    id="featuredStartup"
                    name="featuredStartup"
                    value={formData.featuredStartup}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="yCombinatorAlumni" className="block text-sm font-medium text-gray-300 mb-2">
                    Y Combinator Alumni
                  </label>
                  <select
                    id="yCombinatorAlumni"
                    name="yCombinatorAlumni"
                    value={formData.yCombinatorAlumni}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mtz" className="block text-sm font-medium text-gray-300 mb-2">
                    MTZ
                  </label>
                  <select
                    id="mtz"
                    name="mtz"
                    value={formData.mtz}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="ewor" className="block text-sm font-medium text-gray-300 mb-2">
                    EWOR Alumni
                  </label>
                  <select
                    id="ewor"
                    name="ewor"
                    value={formData.ewor}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Startup Card Preview */}
            {(companyLogoPreview || formData.startupName || formData.companyLogo) && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-3">Preview</h2>
                <p className="text-sm text-gray-400 mb-4">How your startup card will look</p>

                <div className="max-w-sm mx-auto">
                  <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-center bg-white p-8 h-48">
                      {(companyLogoPreview || formData.companyLogo) ? (
                        <img
                          src={companyLogoPreview || formData.companyLogo}
                          alt="Logo"
                          className="max-w-full max-h-full w-auto h-auto object-contain"
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm">No logo</p>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {formData.startupName || 'Startup Name'}
                      </h3>
                      {formData.chategory && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.chategory.split(',').slice(0, 2).map((cat, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-1 text-xs font-medium bg-white/10 text-gray-300 rounded">
                              {cat.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      {formData.shortDescription && (
                        <p className="text-sm text-gray-400 mb-4 line-clamp-3">{formData.shortDescription}</p>
                      )}
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-4">
                        <span>Founded {formData.foundingYear}</span>
                        {formData.investmentSize && (
                          <>
                            <span>•</span>
                            <span>{formData.investmentSize}</span>
                          </>
                        )}
                      </div>
                      {formData.startMunichMember && (
                        <div className="pt-4 border-t border-white/10">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Founder</p>
                          <div className="flex items-center gap-2">
                            {(memberPicturePreview || formData.memberPicture) ? (
                              <img
                                src={memberPicturePreview || formData.memberPicture}
                                alt={formData.startMunichMember}
                                className="w-10 h-10 rounded-full object-cover border border-white/20"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-medium border border-white/20">
                                {formData.startMunichMember.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-white">{formData.startMunichMember}</p>
                              <p className="text-xs text-gray-500">{formData.companyRole}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-lg">
                <p className="text-red-400 font-medium">✗ {error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 bg-[#d0006f] hover:bg-[#d0006f]/90 disabled:bg-[#d0006f]/50 text-white font-semibold rounded-lg transition-all disabled:cursor-not-allowed"
              >
                {saving
                  ? (selectedStartupId ? 'Updating...' : 'Adding...')
                  : (selectedStartupId ? 'Save Changes' : 'Add Startup')
                }
              </button>

              {mode === 'edit' && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={saving}
                  className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Delete
                </button>
              )}

              <button
                type="button"
                onClick={handleBackToList}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all"
              >
                Cancel
              </button>

            </div>

          </form>
        )}
      </div>
    </main>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#00002c] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xl text-white">Loading...</p>
        </div>
      </main>
    }>
      <AdminPageContent />
    </Suspense>
  )
}
