import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import serverAuth from '@/lib/serverAuth'

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { currentUser } = await serverAuth()

    return NextResponse.json(currentUser, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
