'use client'
import React, { useCallback, useMemo } from 'react'
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai'

import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'

type FavoriteButtonProps = {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites()
  const { data: currentUser, mutate } = useCurrentUser()

  const isFavorite = useMemo(() => {
    const list: string[] = currentUser?.favoriteIds || []

    if (list.length > 0) {
      return list.includes(movieId)
    } else {
      return false
    }
  }, [currentUser, movieId])

  const toggleFavorites = useCallback(async () => {
    let response
    if (isFavorite) {
      response = await fetch('/api/favorite', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId }),
      })
    } else {
      response = await fetch('/api/favorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId }),
      })
    }

    const updatedFavoriteIds = await response.json()

    // ログインユーザーのデータを取得しfavoriteIdsを更新
    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    })

    // マイリスト映画一覧を再取得（マイリストの最新化）
    mutateFavorites()
  }, [isFavorite, mutate, currentUser, mutateFavorites, movieId])

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={30} />
    </div>
  )
}

export default FavoriteButton
