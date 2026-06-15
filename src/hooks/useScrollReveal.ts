import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [hasRevealed, setHasRevealed] = useState(false)

  useEffect(() => {
    if (isInView && !hasRevealed) {
      setHasRevealed(true)
    }
  }, [isInView, hasRevealed])

  return { ref, isInView: hasRevealed }
}
