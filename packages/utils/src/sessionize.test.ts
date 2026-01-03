import { describe, it, expect } from 'vitest'
import { sessionizePlays } from './sessionize'

describe('sessionizePlays', () => {
  it('groups sequential plays into sessions', () => {
    const plays = [
      { id: 'p1', playedAt: '2024-01-01T10:00:00.000Z' },
      { id: 'p2', playedAt: '2024-01-01T10:05:00.000Z' },
      { id: 'p3', playedAt: '2024-01-01T10:30:00.000Z' }
    ]

    const sessions = sessionizePlays(plays, 15)
    expect(sessions.length).toBe(2)
    expect(sessions[0].playIds).toEqual(['p1', 'p2'])
    expect(sessions[1].playIds).toEqual(['p3'])
  })
})
