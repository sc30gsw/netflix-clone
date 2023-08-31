import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'

import Billboard from '@/components/Billboard'
import MovieList from '@/components/MovieList'
import Navbar from '@/components/Navbar'
import Spinner from '@/components/Spinner'
import options from '@/lib/options'
import serverAuth from '@/lib/serverAuth'

import ClientHome from '../components/ClientHome'

const fetchMovies = async () => {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/movies`)

    const movies = await res.json()

    return movies
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { currentUser } = await serverAuth()
    const res = await fetch(`${process.env.API_BASE_URL}/api/favorites`, {
      cache: 'no-store',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentUser }),
    })

    const favorites = await res.json()

    return favorites
  } catch (err) {
    console.log(err)
  }
}

const Home = async () => {
  const session = await getServerSession(options)

  if (!session) return redirect('/auth')

  const movies = await fetchMovies()
  const favorites = await fetchFavorites()

  return (
    <>
      <ClientHome />
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <Billboard />
      </Suspense>
      <div className="pb-40">
        <MovieList title="Trending Now" movies={movies} />
        <MovieList title="My List" movies={favorites} />
      </div>
    </>
  )
}

export default Home
