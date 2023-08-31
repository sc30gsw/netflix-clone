'use client'

import React from 'react'
import { BiChevronDown } from 'react-icons/bi'

import useInfoModal from '../hooks/useInfoModal'

type DownButtonProps = {
  movieId: string
}

const DownButton: React.FC<DownButtonProps> = ({ movieId }) => {
  const { openModal } = useInfoModal()
  return (
    <div
      onClick={() => openModal(movieId)}
      className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <BiChevronDown
        className="text-white group-hover/item:text-neutral-300"
        size={30}
      />
    </div>
  )
}

export default DownButton
