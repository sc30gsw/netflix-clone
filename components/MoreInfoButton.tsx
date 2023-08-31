'use client'

import React, { useCallback } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import useInfoModal from '@/hooks/useInfoModal'

type MoreInfoButtonProps = {
  movieId: string
}

const MoreInfoButton: React.FC<MoreInfoButtonProps> = ({ movieId }) => {
  const { openModal } = useInfoModal()

  const handleOpenModal = useCallback(
    () => openModal(movieId),
    [movieId, openModal],
  )
  return (
    <button
      onClick={handleOpenModal}
      className="h-10 bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-base lg:text-lg flex flex-row items-center hover:bg-opacity-20 transition font-bold"
    >
      <AiOutlineInfoCircle className="mr-1" />
      More Info
    </button>
  )
}

export default MoreInfoButton
