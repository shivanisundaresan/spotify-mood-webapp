export type Play = {
  id: string
  playedAt: string // ISO
}

export type Session = {
  id: string
  startTime: string
  endTime: string
  playIds: string[]
}

export function sessionizePlays(plays: Play[], maxGapMinutes = 15): Session[] {
  if (!plays || plays.length === 0) return []

  // sort by playedAt ascending
  const sorted = [...plays].sort((a, b) => new Date(a.playedAt).getTime() - new Date(b.playedAt).getTime())

  const sessions: Session[] = []
  let current: { startTime: string; endTime: string; playIds: string[] } | null = null

  for (const p of sorted) {
    if (!current) {
      current = { startTime: p.playedAt, endTime: p.playedAt, playIds: [p.id] }
      continue
    }

    const diffMinutes = (new Date(p.playedAt).getTime() - new Date(current.endTime).getTime()) / 60000

    if (diffMinutes <= maxGapMinutes) {
      current.endTime = p.playedAt
      current.playIds.push(p.id)
    } else {
      sessions.push({ id: `${current.startTime}_${current.endTime}`, startTime: current.startTime, endTime: current.endTime, playIds: current.playIds })
      current = { startTime: p.playedAt, endTime: p.playedAt, playIds: [p.id] }
    }
  }

  if (current) {
    sessions.push({ id: `${current.startTime}_${current.endTime}`, startTime: current.startTime, endTime: current.endTime, playIds: current.playIds })
  }

  return sessions
}
