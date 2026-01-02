'use client'

import { useScrollAnimation, useStaggerAnimation } from '@/lib/useScrollAnimation'

/**
 * Professional scroll animation component
 * Animations trigger every time element enters viewport and reset when it leaves
 * 
 * @param {string} variant - Animation type: 'fade', 'fade-up', 'fade-down', 'fade-left', 'fade-right', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'zoom-in'
 * @param {number} threshold - Visibility threshold (0-1), default 0.3 (30%)
 * @param {number} delay - Animation delay in ms
 * @param {boolean} stagger - Enable staggered child animations
 * @param {number} staggerDelay - Delay between stagger children in ms
 */
export function ScrollReveal({
    children,
    className = "",
    variant = "fade-up",
    threshold = 0.3,
    delay = 0,
    stagger = false,
    staggerDelay = 100
}) {
    const { ref: normalRef, isVisible: normalVisible } = useScrollAnimation(threshold)
    const { ref: staggerRef, isVisible: staggerVisible, getChildDelay } = useStaggerAnimation(threshold, staggerDelay)

    const ref = stagger ? staggerRef : normalRef
    const isVisible = stagger ? staggerVisible : normalVisible

    // Build CSS classes
    const animationClass = `scroll-animate scroll-animate-${variant}`
    const visibleClass = isVisible ? 'is-visible' : ''
    const combinedClassName = `${animationClass} ${visibleClass} ${className}`.trim()

    // Apply inline delay if specified
    const style = delay ? { transitionDelay: `${delay}ms` } : undefined

    // For stagger, we need to clone children and add delays
    if (stagger && Array.isArray(children)) {
        return (
            <div ref={ref} className={className}>
                {children.map((child, index) => (
                    <div
                        key={index}
                        className={`${animationClass} ${visibleClass} scroll-stagger-child`}
                        style={{ '--stagger-delay': `${getChildDelay(index)}ms` }}
                    >
                        {child}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div ref={ref} className={combinedClassName} style={style}>
            {children}
        </div>
    )
}

// Legacy support - export framer-motion variants for backward compatibility
export const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
}

export const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
}
