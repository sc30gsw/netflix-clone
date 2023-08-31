'use client'

import React from 'react'

import useInfoModal from '@/hooks/useInfoModal'

import InfoModal from './InfoModal'

const ClientHome = () => {
  const { isOpen, closeModal } = useInfoModal()

  return <InfoModal visible={isOpen} onClose={closeModal} />
}

export default ClientHome
