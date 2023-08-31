import bcrypt from 'bcrypt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

// ランダムな映画を1件取得するAPI
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    await serverAuth()

    const movieCount = await prismadb.movie.count()

    if (movieCount === 0)
      return NextResponse.json(
        { message: 'No movies available' },
        { status: 404 },
      )

    const randomIndex = Math.floor(Math.random() * movieCount)

    // ランダムな映画を1件取得
    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    })

    return NextResponse.json({ randomMovies }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
