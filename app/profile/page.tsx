import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import React from 'react'

import options from '@/lib/options'

const ProfilePage = async () => {
  const session = await getServerSession(options)

  if (!session) return redirect('/auth')

  return <p className="text-white text-4xl">Profiles</p>
}

export default ProfilePage
