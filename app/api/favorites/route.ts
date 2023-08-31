import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

// 映画マイリスト取得API
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'POST')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { currentUser } = await req.json()

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    })

    return NextResponse.json(favoriteMovies, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
