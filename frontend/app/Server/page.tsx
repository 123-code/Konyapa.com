import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Card from "../Components/UserCard";
import { redirect } from "next/navigation";
import { NextResponse, NextRequest } from 'next/server'
import Link from "next/link"
import ClientForm from "../Components/ClientForm";


export default async function ServerPage(){
    const handleSignOut = () => {
        NextResponse.redirect('/hello-nextjs') 
      } 

    const session = await getServerSession(options);

    if(!session){
        redirect('https://konyapa-com.vercel.app/api/auth/signin?callbackUrl=/Server')
    }

    return(
        <section className="flex flex-col gap-6">
        
        <li className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out"><Link href="/api/auth/signout">Salir</Link></li>
            <Card user={session?.user} pagetype={"Server"}/>
       

        </section>
    )
}