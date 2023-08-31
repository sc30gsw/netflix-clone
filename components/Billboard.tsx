import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import React from 'react'

import options from '../lib/options'
import MoreInfoButton from './MoreInfoButton'
import PlayButton from './PlayButton'

const fetchRandomMovies = async () => {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/random`)

    const randomMovies = await res.json()

    return randomMovies
  } catch (err) {
    console.log(err)
  }
}

const Billboard = async () => {
  const session = await getServerSession(options)

  if (!session) return redirect('/auth')

  const randomMovies = await fetchRandomMovies()

  return (
    <div className="relative h-[56.25vw]">
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={randomMovies[0]?.thumbnailUrl}
        src={randomMovies[0]?.videoUrl}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {randomMovies[0]?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {randomMovies[0]?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={randomMovies[0]?.id} />
          <MoreInfoButton movieId={randomMovies[0]?.id} />
        </div>
      </div>
    </div>
  )
}

export default Billboard
