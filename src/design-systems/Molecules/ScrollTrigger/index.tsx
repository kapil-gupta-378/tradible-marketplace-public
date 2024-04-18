import React, { useEffect, useRef } from 'react'

import Typography from 'design-systems/Atoms/Typography'
import Spinner from 'design-systems/Atoms/Spinner'
import useShallowState from 'hooks/useShallowState'
import { debounce } from 'utils/debounce'

interface ScrollTriggerProps {
  text?: string
  isLoading?: boolean
  onTrigger?: () => void
  className?: string
}

const PAGE_SCROLL_TRIGGER_DELAY = 300 // Adjust this value as needed

export const ScrollTrigger: React.FC<ScrollTriggerProps> = ({
  text = '',
  isLoading,
  className = '',
  onTrigger: onTrigger_,
}) => {
  const element = useRef<HTMLDivElement>(null)

  const [scroll, setScroll, , refState] = useShallowState({
    prevRatio: 0,
    isScrollingUpDirection: false,
    isIntersecting: false,
  })

  useEffect(() => {
    const targetElement = element.current
    if (!targetElement || !onTrigger_) return
    if (isLoading) return

    const onTrigger = debounce(onTrigger_, PAGE_SCROLL_TRIGGER_DELAY)

    function handleIntersection([{ intersectionRatio, isIntersecting }]: IntersectionObserverEntry[]) {
      const prevRatio = refState.current.prevRatio
      const isScrollingUpDirection = intersectionRatio < prevRatio

      setScroll({
        prevRatio: intersectionRatio,
        isIntersecting,
        isScrollingUpDirection,
      })

      if (intersectionRatio === 1) onTrigger()
      if (prevRatio === 1 && isScrollingUpDirection) onTrigger.cancel()
    }

    const observer = new IntersectionObserver(handleIntersection, { threshold: [0, 0.1, 0.9, 1] })

    // Attach the Intersection Observer to the target element
    observer.observe(targetElement!)

    // Attach a scroll event listener to the window for onscroll trigger
    function handleScroll() {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      if (scrolledToBottom && !isLoading) {
        onTrigger()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.unobserve(targetElement!)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [refState, setScroll, isLoading, onTrigger_])

  return (
    <div className={`invert-fg flex scroll-mb-0 justify-center ${className}`} id="ScrollTrigger" ref={element}>
      <Typography className="large opacity-60">
        {isLoading ? <Spinner className="m-auto h-10 w-10 stroke-neutral-100 dark:stroke-neutral-800" /> : text}
      </Typography>
    </div>
  )
}
