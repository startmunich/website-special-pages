import { useRouter } from 'next/navigation'

interface Founder {
  name: string
  imageUrl: string
  linkedinUrl?: string
}

interface StartupCardProps {
  id: string | number
  name: string
  logoUrl: string
  summary: string
  category?: string[]
  foundingYear?: string | number
  founders?: Founder[]
  isMTZ?: boolean
  badge?: {
    text: string
    color: string
    bgColor: string
  }
  accentColor?: string
  showDetails?: boolean
}

export default function StartupCard({
  id,
  name,
  logoUrl,
  summary,
  category,
  foundingYear,
  founders = [],
  isMTZ,
  badge,
  accentColor,
  showDetails = false
}: StartupCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    sessionStorage.setItem('startups-scroll', String(window.scrollY))
    router.push(`/startup-details/${id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center bg-white p-8 h-48">
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className={`${showDetails ? 'p-6' : 'px-5 py-4'} flex flex-col flex-grow`}>
        <div className={`${showDetails ? 'mb-4' : 'mb-2'}`}>
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`${showDetails ? 'text-2xl' : 'text-lg'} text-white leading-tight`}>
              {name}
            </h3>
            {isMTZ === true && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-[#d0006f] text-white rounded">
                MTZ
              </span>
            )}
            {badge && (
              <span className={`text-xs font-bold px-2 py-1 rounded ${badge.color} ${badge.bgColor} ml-auto`}>
                {badge.text}
              </span>
            )}
          </div>

          {/* Category Tags + Founded */}
          {showDetails && (category && category.length > 0 || foundingYear) && (
            <div className="flex flex-wrap gap-2 mb-3">
              {category && category.slice(0, 2).map((cat, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium bg-white/10 text-gray-300 rounded"
                >
                  {cat}
                </span>
              ))}
              {foundingYear && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-white/10 text-gray-300 rounded">
                  Founded {foundingYear}
                </span>
              )}
            </div>
          )}
        </div>

        <div className={`${showDetails ? 'mb-4' : 'mb-2'}`}>
          <p className={`text-sm text-gray-400 leading-relaxed ${showDetails ? 'line-clamp-3' : ''}`}>
            {summary}
          </p>
        </div>

        {/* Founders Section */}
        {founders.length > 0 && showDetails && (
          <div className="pt-4 border-t border-white/10 mt-auto">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              {founders.length > 1 ? 'Founders' : 'Founder'}
            </p>
            <div className="flex flex-wrap gap-3">
              {founders.map((founder, founderIdx) => (
                <div key={founderIdx} className="flex items-center gap-2">
                  {founder.linkedinUrl ? (
                    <a
                      href={founder.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={founder.imageUrl}
                        alt={founder.name}
                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(founder.name)}&background=d0006f&color=fff`
                        }}
                      />
                      <span className="text-sm text-gray-300 hover:text-white transition-colors">{founder.name}</span>
                    </a>
                  ) : (
                    <>
                      <img
                        src={founder.imageUrl}
                        alt={founder.name}
                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(founder.name)}&background=d0006f&color=fff`
                        }}
                      />
                      <span className="text-sm text-gray-300">{founder.name}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom accent bar */}
      {accentColor && (
        <div className={`absolute bottom-0 left-0 w-full h-1 ${accentColor}`}></div>
      )}
    </div>
  )
}
