import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Card from "../Components/UserCard";
import { redirect } from "next/navigation";
import { NextResponse, NextRequest } from 'next/server'
import Link from "next/link"
import ClientForm from "../Components/ClientForm";
import Footer from "../Components/footer";

export default async function ServerPage(){
    const handleSignOut = () => {
        NextResponse.redirect('/hello-nextjs') 
      }  

    const session = await getServerSession(options);

    if(!session){
        redirect('https://konyapa-com.vercel.app/api/auth/signin?callbackUrl=/Server')
    }

    return(
        <section className="flex flex-col gap-6 bg-gray-900 text-white p-6">
            <div className="flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out"><Link href="/api/auth/signout">Salir</Link></button>
            </div>
            <Card className="bg-gray-800 p-6 rounded-lg shadow-lg" user={session?.user} pagetype={"Server"} />
            <div className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg p-6 text-2xl text-center">
                <Link href='https://konyapa-com.vercel.app/Update'> gestionar mis negocios </Link>
            </div>
           <h1> aqui podras: </h1>
           <h2> ver tus tiendas virtuales</h2>
           <h2> cambiar el nombre de tu tienda virtual</h2>
           <h2> eliminar si ya no la usas </h2>
           <Footer/>
        </section>
       
    )
}