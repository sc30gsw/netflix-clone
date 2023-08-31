import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import serverAuth from '@/lib/serverAuth'

import PlayButton from './PlayButton'

const fetchRandomMovies = async () => {
  try {
    await serverAuth()

    const res = await fetch(`${process.env.API_BASE_URL}/api/random`)

    const randomMovies = await res.json()

    return randomMovies
  } catch (err) {
    console.log(err)
  }
}

const Billboard = async () => {
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
          <button className="h-10 bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg flex flex-row items-center hover:bg-opacity-20 transition">
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default Billboard
