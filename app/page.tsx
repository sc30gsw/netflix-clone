import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import Billboard from '@/components/Billboard'
import Navbar from '@/components/Navbar'
import options from '@/lib/options'

const Home = async () => {
  const session = await getServerSession(options)

  if (!session) return redirect('/auth')

  return (
    <>
      <Navbar />
      <Billboard />
    </>
  )
}

export default Home
