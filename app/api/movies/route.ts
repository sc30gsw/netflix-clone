import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

// 映画一覧取得API
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    await serverAuth()

    const movies = await prismadb.movie.findMany()

    return NextResponse.json(movies, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
