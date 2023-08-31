import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'

// 映画詳細の取得
export const GET = async (
  req: NextRequest,
  { params }: { params: { movieId: string } },
  res: NextResponse,
) => {
  try {
    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const movieId = params.movieId

    if (typeof movieId !== 'string')
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    if (!movieId)
      return NextResponse.json({ message: 'Invalid ID' }, { status: 404 })

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    })

    if (!movie)
      return NextResponse.json({ message: 'Invalid ID' }, { status: 404 })

    return NextResponse.json(movie, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
