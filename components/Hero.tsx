import Image from "next/image"
import { cn } from "@/lib/utils"

interface HeroProps {
    backgroundImage: string
    title: React.ReactNode
    description: React.ReactNode
    children?: React.ReactNode
    className?: string
    overlayOpacity?: string
    hideChildrenOnMobile?: boolean
    imagePosition?: string
    titleClassName?: string
    descriptionClassName?: string
    childrenWrapperClassName?: string
}

export default function Hero({
    backgroundImage,
    title,
    description,
    children,
    className = "min-h-[70vh]",
    overlayOpacity = "bg-brand-dark-blue/70",
    hideChildrenOnMobile = false,
    imagePosition = "center 45%",
    titleClassName,
    descriptionClassName,
    childrenWrapperClassName
}: HeroProps) {
    return (
        <>
            <div className={cn("relative w-full overflow-hidden flex flex-col", className)}>
                {/* Background Image + Overlay */}
                <div className="absolute inset-0">
                    <Image
                        src={backgroundImage}
                        alt="Hero Background"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                        style={{ objectPosition: imagePosition }}
                    />
                    <div className={cn("absolute inset-0", overlayOpacity)}></div>
                    {/* Bottom fade to blue */}
                    <div className="absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-b from-transparent to-brand-dark-blue"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex items-center">
                    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 lg:gap-12 w-full">
                        {/* Left Side - Text */}
                        <div className="flex-1 max-w-full lg:max-w-3xl text-left">
                            <h1 className={cn("text-6xl sm:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 animate-[flyInFromTop_0.6s_ease-out]", titleClassName)}>
                                {title}
                            </h1>
                            <div className={cn("text-lg sm:text-xl text-gray-300 leading-relaxed", descriptionClassName)}>
                                {description}
                            </div>
                        </div>

                        {/* Right Side - Desktop only */}
                        {children && (
                            <div className={cn("hidden lg:flex flex-col gap-6 min-w-[280px] mt-6 lg:mt-11 ml-auto", childrenWrapperClassName)}>
                                {children}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile - Cards below hero */}
            {children && !hideChildrenOnMobile && (
                <div className="lg:hidden -mt-1">
                    <div className="max-w-7xl mx-auto px-4 pt-2 pb-6">
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}
