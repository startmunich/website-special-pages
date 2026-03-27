import { cn } from "@/lib/utils"

interface HeroProps {
    backgroundImage: string
    title: React.ReactNode
    description: string
    children?: React.ReactNode
    className?: string
    overlayOpacity?: string
    hideChildrenOnMobile?: boolean
}

export default function Hero({
    backgroundImage,
    title,
    description,
    children,
    className = "h-[650px]", // Before it was "h-[600px]"
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

                {/* Content Overlay */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 h-full flex items-center">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
                        {/* Left Side - Text */}
                        <div className="flex-1 max-w-2xl text-left">
                            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-white mb-4 sm:mb-6 animate-[flyInFromTop_0.6s_ease-out]">
                                {title}
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                                {description}
                            </p>
                        </div>

                        {/* Right Side - Desktop only */}
                        {children && (
                            <div className="hidden lg:flex flex-col gap-6 min-w-[280px] mt-6 lg:mt-11 ml-auto">
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
