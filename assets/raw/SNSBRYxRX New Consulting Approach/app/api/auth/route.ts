import { NextResponse } from 'next/server'

const SITE_PASSWORD = 'PVE123'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password === SITE_PASSWORD) {
    return NextResponse.json({ success: true, token: 'authenticated' })
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
}
