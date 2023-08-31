import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import React from 'react'

import ProfileLayout from '@/components/ProfileLayout'
import options from '@/lib/options'

const ProfilePage = async () => {
  const session = await getServerSession(options)

  if (!session) return redirect('/auth')

  return <ProfileLayout />
}

export default ProfilePage
