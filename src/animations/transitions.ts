export const springGentle = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 14,
}

export const springBouncy = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
}

export const springStiff = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
}

export const durationFast = { duration: 0.2 }
export const durationNormal = { duration: 0.4 }
export const durationSlow = { duration: 0.7 }
export const durationVerySlow = { duration: 1.2 }

export const easeSmooth = [0.22, 1, 0.36, 1] as const
export const easeSnappy = [0.16, 1, 0.3, 1] as const
