import Image from 'next/image'
import { options } from './api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import Card from './Components/UserCard'


export default async function Home() {
  const session = await getServerSession(options)

  return (
 <>
 {session ? (
  <Card user={session?.user} pagetype={"Home"}/>
 ):(<h1 className='text-5xl'> you shall not pass!</h1>)
}
</>
 )
}
