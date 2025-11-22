"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddStartupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

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
    companyLinkedin: "",
    lastInvestmentRound: "",
    firstMilestones: "",
    supportingPrograms: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/startups/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add startup')
      }

      setSuccess(true)
      // Reset form
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
        companyLinkedin: "",
        lastInvestmentRound: "",
        firstMilestones: "",
        supportingPrograms: "",
      })

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#00002c] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Add New Startup</h1>
          <p className="text-gray-400">Submit a new startup to the START Munich database</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/40 rounded-lg">
            <p className="text-green-400 font-medium">✓ Startup added successfully!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-lg">
            <p className="text-red-400 font-medium">✗ {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Company Information</h2>
            
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
                  type="url"
                  id="companyWebsite"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-300 mb-2">
                  Company Logo URL
                </label>
                <input
                  type="url"
                  id="companyLogo"
                  name="companyLogo"
                  value={formData.companyLogo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                  placeholder="https://example.com/logo.png"
                />
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
                  Long Description
                </label>
                <textarea
                  id="descriptionLong"
                  name="descriptionLong"
                  rows={4}
                  value={formData.descriptionLong}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                  placeholder="Detailed description of the startup"
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
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                  placeholder="e.g., SaaS, FinTech, AI"
                />
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
            <h2 className="text-2xl font-bold text-white mb-6">Founder Information</h2>
            
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
                  Company Role
                </label>
                <input
                  type="text"
                  id="companyRole"
                  name="companyRole"
                  value={formData.companyRole}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                  placeholder="e.g., CEO, CTO, Founder"
                />
              </div>

              <div>
                <label htmlFor="batch" className="block text-sm font-medium text-gray-300 mb-2">
                  Batch (comma-separated)
                </label>
                <input
                  type="text"
                  id="batch"
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                  placeholder="e.g., W23, S24"
                />
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
                  Member Picture URL
                </label>
                <input
                  type="url"
                  id="memberPicture"
                  name="memberPicture"
                  value={formData.memberPicture}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>
          </div>

          {/* Funding & Metrics */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Funding & Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="investmentSize" className="block text-sm font-medium text-gray-300 mb-2">
                  Investment Size (e.g., €500,000)
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
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                  placeholder="e.g., Seed, Series A"
                />
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
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f]"
                  placeholder="e.g., EXIST, FLÜGGE"
                />
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
                  placeholder="Key achievements and milestones"
                />
              </div>
            </div>
          </div>

          {/* Special Flags */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Special Flags</h2>
            
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
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-[#d0006f] hover:bg-[#d0006f]/90 disabled:bg-[#d0006f]/50 text-white font-semibold rounded-lg transition-all disabled:cursor-not-allowed"
            >
              {loading ? 'Adding Startup...' : 'Add Startup'}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/startups')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
