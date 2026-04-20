import { motion, useReducedMotion } from 'motion/react'
import type { SlideProps } from '@/engine/types'

import oleksandrPhoto from '@/assets/team/Oleksandr.jpg'
import irynaPhoto from '@/assets/team/Iryna.png'
import maxPhoto from '@/assets/team/Max.jpg'
import andriiPhoto from '@/assets/team/Andrii.jpg'

interface Member {
  name: string
  role: string
  photo?: string
  monogram?: string
}

const FOUNDER: Member = {
  name: 'Олександр',
  role: 'Засновник · Tech Lead · Fullstack',
  photo: oleksandrPhoto,
}

const CREW: Member[] = [
  { name: 'Ірина', role: 'CRM-розробник', photo: irynaPhoto },
  { name: 'Максим', role: 'Frontend-розробник', photo: maxPhoto },
  { name: 'Андрій', role: 'Дизайнер', photo: andriiPhoto },
  { name: 'Анастасія', role: 'Контент · соцмережі', monogram: 'А' },
]

interface PortraitProps {
  photo?: string
  monogram?: string
  size: number
  name: string
}

function PortraitCircle({ photo, monogram, size, name }: PortraitProps) {
  return (
    <div
      className="relative overflow-hidden rounded-full ring-2 ring-cyan-400/40"
      style={{
        width: size,
        height: size,
        boxShadow:
          '0 0 32px rgba(0,211,242,0.22), inset 0 0 24px rgba(0,211,242,0.08)',
      }}
    >
      {photo ? (
        <>
          <img
            src={photo}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: 'grayscale(1) contrast(1.08) brightness(0.98)' }}
          />
          {/* Hue clamp — forces every pixel into the cyan family, preserves luminance */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundColor: '#00b8db',
              mixBlendMode: 'color',
              opacity: 0.5,
            }}
          />
          {/* Top-left highlight wash */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 32% 28%, rgba(162,244,253,0.22), transparent 65%)',
              mixBlendMode: 'screen',
            }}
          />
        </>
      ) : (
        <div
          aria-hidden
          className="flex h-full w-full items-center justify-center"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, #104e64 0%, #053345 72%)',
          }}
        >
          <span
            style={{
              fontFamily: "'Unbounded', 'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: size * 0.46,
              color: '#a2f4fd',
              textShadow: '0 0 24px rgba(0,211,242,0.45)',
              lineHeight: 1,
            }}
          >
            {monogram}
          </span>
        </div>
      )}
    </div>
  )
}

export function TeamSlide({ isActive }: SlideProps) {
  const reduce = useReducedMotion() ?? false
  const visible = isActive || reduce

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      {/* Title bar */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-16 top-14 z-20 flex flex-col gap-2"
      >
        <span
          className="text-sm uppercase tracking-[0.36em] text-cyan-300/70"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          · 22 / Команда ·
        </span>
        <h2
          className="max-w-[22ch] text-[#F0F4F8]"
          style={{
            fontFamily: "'Unbounded', 'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(2.5rem, 3vw, 3.25rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Команда — ті, хто будує з вами
        </h2>
      </motion.div>

      {/* Main area */}
      <div className="flex flex-1 items-center justify-center px-16 pt-32 pb-24">
        <div className="flex items-center gap-20 lg:gap-28">
          {/* Founder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={
              visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }
            }
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <PortraitCircle
              photo={FOUNDER.photo}
              size={360}
              name={FOUNDER.name}
            />
            <div className="text-center">
              <div
                className="text-[#F0F4F8]"
                style={{
                  fontFamily: "'Unbounded', 'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '2rem',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                }}
              >
                {FOUNDER.name}
              </div>
              <div
                className="mt-2"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: '1.1rem',
                  lineHeight: 1.4,
                }}
              >
                <span className="text-cyan-400">Засновник</span>
                <span className="text-cyan-200/70">
                  {' · Tech Lead · Fullstack'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Crew */}
          <div className="grid grid-cols-2 gap-x-14 gap-y-10">
            {CREW.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                animate={
                  visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
                }
                transition={{
                  delay: 0.6 + i * 0.15,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-center gap-4"
              >
                <PortraitCircle
                  photo={member.photo}
                  monogram={member.monogram}
                  size={180}
                  name={member.name}
                />
                <div className="text-center">
                  <div
                    className="text-[#F0F4F8]"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1.3rem',
                      lineHeight: 1.15,
                    }}
                  >
                    {member.name}
                  </div>
                  <div
                    className="mt-1 text-cyan-300/85"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '0.95rem',
                      lineHeight: 1.35,
                    }}
                  >
                    {member.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer caption */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 left-0 right-0 z-20 text-center text-cyan-200/60"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 400,
          fontSize: '1.1rem',
          letterSpacing: '0.02em',
        }}
      >
        Пʼятеро людей. Один стандарт. Один партнер.
      </motion.p>
    </div>
  )
}

export default TeamSlide
