import { without } from 'lodash'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

// 映画マイリスト登録API
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'POST')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { currentUser } = await serverAuth()

    const { movieId } = await req.json()

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    })

    if (!existingMovie)
      return NextResponse.json({ message: 'Invalid movieId' }, { status: 404 })

    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    })

    return NextResponse.json(user, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

// 映画マイリスト削除API
export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== 'DELETE')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { currentUser } = await serverAuth()
    const { movieId } = await req.json()

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    })

    if (!existingMovie)
      return NextResponse.json({ message: 'Invalid movieId' }, { status: 404 })

    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId)

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    })

    return NextResponse.json(updatedUser, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
