import type { Movie } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import serverAuth from '@/lib/serverAuth'

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.API_BASE_URL}/api/movies`)
  const movies = await res.json()

  return movies.map((movie: Movie) => ({
    movieId: movie.id,
  }))
}

const fetchMovie = async (movieId: string) => {
  try {
    await serverAuth()
    const res = await fetch(`${process.env.API_BASE_URL}/api/movies/${movieId}`)
    const movie = await res.json()

    return movie
  } catch (err) {
    console.log(err)
  }
}

type MoviePageProps = {
  params: {
    movieId: string
  }
}

const MoviePage: React.FC<MoviePageProps> = async ({ params }) => {
  const movie = await fetchMovie(params.movieId)

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <Link href="/">
          <AiOutlineArrowLeft className="text-white" size={40} />
        </Link>
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span>
          {movie.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="h-full w-full"
        src={movie.videoUrl}
      ></video>
    </div>
  )
}

export default MoviePage
