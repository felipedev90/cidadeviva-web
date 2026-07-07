import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { name, email, password } = await request.json()

  const response = await fetch(`${process.env.API_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    return NextResponse.json({ error: error.message }, { status: response.status })
  }

  const data = await response.json()

  const cookieStore = await cookies()
  cookieStore.set('auth-token', data.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  })

  return NextResponse.json({ success: true, message: 'Registration successful' })
}
