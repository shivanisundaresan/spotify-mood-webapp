import express from 'express'
import { sessionizePlays } from '@spotify-mood/utils'

const app = express()
app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.get('/spotify/connect', (_req, res) => {
  res.json({ url: 'https://accounts.spotify.com/authorize?dummy' })
})

app.get('/spotify/callback', (_req, res) => {
  res.json({ status: 'callback-received' })
})

app.post('/spotify/sync', (_req, res) => {
  res.json({ status: 'sync-started' })
})

// Demo endpoint to regenerate sessions from plays (uses local utility)
app.get('/sessions/regenerate-demo', (_req, res) => {
  const plays = [
    { id: 'p1', playedAt: '2024-01-01T10:00:00.000Z' },
    { id: 'p2', playedAt: '2024-01-01T10:05:00.000Z' },
    { id: 'p3', playedAt: '2024-01-01T10:30:00.000Z' }
  ]

  const sessions = sessionizePlays(plays, 15)
  res.json({ sessions })
})

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log('Backend listening on http://localhost:4000')
})
