import { useCallback, useEffect, useRef, useState } from 'react'
import type { ActivePosition, ColumnConfig } from './types'

function clampPosition(
  columns: ColumnConfig[],
  pos: { col: number; row: number; fragment?: number },
): ActivePosition {
  const totalCols = columns.length
  if (totalCols === 0) return { col: 0, row: 0, fragment: 0 }
  const col = Math.max(0, Math.min(pos.col, totalCols - 1))
  const rowCount = columns[col]?.slides.length ?? 1
  const row = Math.max(0, Math.min(pos.row, rowCount - 1))
  const maxFragment = columns[col]?.slides[row]?.fragments ?? 0
  const fragment = Math.max(0, Math.min(pos.fragment ?? 0, maxFragment))
  return { col, row, fragment }
}

function parseHash(columns: ColumnConfig[]): ActivePosition | null {
  const raw = window.location.hash.replace(/^#\/?/, '')
  if (!raw) return null
  const parts = raw.split('/').map((p) => parseInt(p, 10))
  if (parts.length === 0 || Number.isNaN(parts[0])) return null
  const col = parts[0] - 1
  const row = parts.length > 1 && !Number.isNaN(parts[1]) ? parts[1] - 1 : 0
  const fragment =
    parts.length > 2 && !Number.isNaN(parts[2]) ? parts[2] : 0
  return clampPosition(columns, { col, row, fragment })
}

function writeHash(pos: ActivePosition) {
  const base = `#/${pos.col + 1}/${pos.row + 1}`
  const next = pos.fragment > 0 ? `${base}/${pos.fragment}` : base
  if (window.location.hash !== next) {
    history.replaceState(null, '', next)
  }
}

export function useActivePosition(columns: ColumnConfig[]) {
  const [active, setActive] = useState<ActivePosition>(() => {
    if (typeof window === 'undefined') return { col: 0, row: 0, fragment: 0 }
    return parseHash(columns) ?? { col: 0, row: 0, fragment: 0 }
  })

  const columnsRef = useRef(columns)
  useEffect(() => {
    columnsRef.current = columns
  }, [columns])

  const scrollTo = useCallback(
    (pos: { col: number; row: number; fragment?: number }) => {
      setActive((prev) => {
        const clamped = clampPosition(columnsRef.current, pos)
        if (
          clamped.col === prev.col &&
          clamped.row === prev.row &&
          clamped.fragment === prev.fragment
        )
          return prev
        return clamped
      })
    },
    [],
  )

  const setFragment = useCallback((n: number) => {
    setActive((prev) => {
      const maxFragment =
        columnsRef.current[prev.col]?.slides[prev.row]?.fragments ?? 0
      const fragment = Math.max(0, Math.min(n, maxFragment))
      if (fragment === prev.fragment) return prev
      return { ...prev, fragment }
    })
  }, [])

  useEffect(() => {
    writeHash(active)
  }, [active])

  useEffect(() => {
    const onHashChange = () => {
      const next = parseHash(columnsRef.current)
      if (next) setActive(next)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return { active, scrollTo, setFragment }
}
