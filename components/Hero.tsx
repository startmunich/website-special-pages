import { cn } from "@/lib/utils"

interface HeroProps {
    backgroundImage: string
    title: React.ReactNode
    description: string
    topBadge?: React.ReactNode
    backgroundAccents?: React.ReactNode
    leftSlot?: React.ReactNode
    centerOverlay?: React.ReactNode
    children?: React.ReactNode
    className?: string
    contentClassName?: string
    titleClassName?: string
    descriptionClassName?: string
    leftColumnClassName?: string
    rightColumnClassName?: string
    overlayOpacity?: string
    hideChildrenOnMobile?: boolean
}

export default function Hero({
    backgroundImage,
    title,
    description,
    topBadge,
    backgroundAccents,
    leftSlot,
    centerOverlay,
    children,
    className = "h-[650px]", // Before it was "h-[600px]"
    contentClassName,
    titleClassName,
    descriptionClassName,
    leftColumnClassName,
    rightColumnClassName,
    overlayOpacity = "bg-brand-dark-blue/70",
    hideChildrenOnMobile = false
}: HeroProps) {
    return (
        <>
            <div className={cn("relative w-full overflow-hidden", className)}>
                {/* Background Image + Overlay */}
                <div className="absolute inset-0 h-full">
                    <img
                        src={backgroundImage}
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                    <div className={cn("absolute inset-0 h-full", overlayOpacity)}></div>
                </div>

                {backgroundAccents ? <div className="absolute inset-0 h-full pointer-events-none">{backgroundAccents}</div> : null}

                {/* Content Overlay */}
                <div className={cn("relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 h-full flex items-center", contentClassName)}>
                    {centerOverlay ? (
                        <div className="hidden lg:block absolute left-[55%] top-[44%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                            {centerOverlay}
                        </div>
                    ) : null}

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
                        {/* Left Side - Text */}
                        <div className={cn("flex-1 max-w-2xl text-left", leftColumnClassName)}>
                            {topBadge ? <div className="mb-8">{topBadge}</div> : null}

                            <h1 className={cn("text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 animate-[flyInFromTop_0.6s_ease-out]", titleClassName)}>
                                {title}
                            </h1>
                            <p className={cn("text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed", descriptionClassName)}>
                                {description}
                            </p>
                            {leftSlot ? <div className="mt-6">{leftSlot}</div> : null}
                        </div>

                        {/* Right Side - Custom Content */}
                        {children && (
                            <div className={cn("hidden lg:flex flex-col gap-6 min-w-[280px] mt-6 lg:mt-11 ml-auto", rightColumnClassName)}>
                                {children}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile - Cards below hero */}
            {children && !hideChildrenOnMobile && (
                <div className="lg:hidden mt-5">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}
