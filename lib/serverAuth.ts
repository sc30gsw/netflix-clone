import { getServerSession } from 'next-auth'

import options from './options'
import prismadb from './prismadb'

const serverAuth = async () => {
  const session = await getServerSession(options)

  if (!session?.user?.email) throw new Error('Not signed in')

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!currentUser) throw new Error('Not signed in')

  return { currentUser }
}

export default serverAuth
