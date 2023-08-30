'use client'

import { signOut } from 'next-auth/react'

import useCurrentUser from '@/hooks/useCurrentUser'

const Home = () => {
  const { data: user } = useCurrentUser()

  return (
    <>
      <h1 className="text-4xl text-green-500">Netflix Clone</h1>
      <p className="text-white">Logged in as: {user?.currentUser?.email}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Logout!
      </button>
    </>
  )
}

export default Home
