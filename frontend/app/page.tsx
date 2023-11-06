import Image from 'next/image'
import { options } from './api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { redirect } from "next/navigation";
import Card from './Components/UserCard'


export default async function Home() {
  const session = await getServerSession(options)

  return (
 <>
 {session ? (
  <Card user={session?.user} pagetype={"Home"}/>
 ):(<h1 className='text-5xl'> no has ingresado a tu cuenta aun!</h1>)
}
<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={redirect('https://konyapa-com.vercel.app/Update')}> Registros </button>
<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={redirect('https://konyapa-com.vercel.app/Server')}> ver perfil </button>
</>
 )
}
