"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddStartupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [memberPictureFile, setMemberPictureFile] = useState<File | null>(null)
  const [companyLogoFile, setCompanyLogoFile] = useState<File | null>(null)
  const [memberPicturePreview, setMemberPicturePreview] = useState<string | null>(null)
  const [companyLogoPreview, setCompanyLogoPreview] = useState<string | null>(null)

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'memberPicture' | 'companyLogo') => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    if (fieldName === 'memberPicture') {
      setMemberPictureFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setMemberPicturePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setCompanyLogoFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setCompanyLogoPreview(reader.result as string)
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
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Prepare form data with uploaded images
      const submitData = { ...formData }
      
      // Convert uploaded files to base64 if present
      if (memberPictureFile) {
        submitData.memberPicture = await convertFileToBase64(memberPictureFile)
      }
      if (companyLogoFile) {
        submitData.companyLogo = await convertFileToBase64(companyLogoFile)
      }

      const response = await fetch('/api/startups/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add startup')
      }

      const result = await response.json()
      console.log('Startup added successfully:', result)
      
      setSuccess(true)
      
      // Show record details
      if (result.recordId) {
        console.log(`✅ Record ID ${result.recordId} created in NocoDB`)
        console.log(`View in NocoDB: https://ndb.startmunich.de/nc/mf0gbvfzl1wkaha`)
      }
      
      // Reset form and files
      setMemberPictureFile(null)
      setCompanyLogoFile(null)
      setMemberPicturePreview(null)
      setCompanyLogoPreview(null)
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
            <p className="text-green-300 text-sm mt-2">
              The startup has been saved to the database. Check your NocoDB table to see it.
            </p>
            <a 
              href="https://ndb.startmunich.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 text-sm underline mt-2 inline-block"
            >
              Open NocoDB →
            </a>
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

              <div className="md:col-span-2">
                <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-300 mb-2">
                  Company Logo
                </label>
                <input
                  type="file"
                  id="companyLogo"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'companyLogo')}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#d0006f] file:text-white hover:file:bg-[#d0006f]/90 file:cursor-pointer"
                />
                <p className="text-xs text-gray-400 mt-1">Max size: 5MB. Accepted formats: JPG, PNG, GIF, SVG</p>
                {companyLogoPreview && (
                  <div className="mt-3 p-4 bg-white rounded-lg">
                    <img src={companyLogoPreview} alt="Logo preview" className="max-h-32 max-w-full object-contain mx-auto" />
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
                  Member Picture
                </label>
                <input
                  type="file"
                  id="memberPicture"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'memberPicture')}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d0006f] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#d0006f] file:text-white hover:file:bg-[#d0006f]/90 file:cursor-pointer"
                />
                <p className="text-xs text-gray-400 mt-1">Max size: 5MB. Accepted formats: JPG, PNG, GIF</p>
                {memberPicturePreview && (
                  <div className="mt-3 p-4 bg-white rounded-lg inline-block">
                    <img src={memberPicturePreview} alt="Member preview" className="w-24 h-24 rounded-full object-cover" />
                  </div>
                )}
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
