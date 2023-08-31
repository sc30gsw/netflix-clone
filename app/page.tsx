import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import Billboard from '@/components/Billboard'
import MovieList from '@/components/MovieList'
import Navbar from '@/components/Navbar'
import options from '@/lib/options'

const Home = async () => {
  const session = await getServerSession(options)

  if (!session) return redirect('/auth')

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" />
      </div>
    </>
  )
}

export default Home
