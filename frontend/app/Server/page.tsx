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
//'https://konyapa-com.vercel.app/api/auth/signin?callbackUrl=/Server'
   

    return(
        <section className="flex flex-col gap-6 bg-gray-900 text-white p-6">
            <div className="flex justify-end">
               
            </div>
            <Card  user={session?.user} pagetype={"Server"} />
            <div className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg p-6 text-2xl text-center">
                <Link href='http://localhost:3000/Update'> gestionar mis negocios </Link>
            </div>
            <div className="text-2xl text-center">
            <h1> aqui podras: </h1>
           <h2> ver tus tiendas virtuales</h2>
           <h2> cambiar el nombre de tu tienda virtual</h2>
           <h2> eliminar si ya no la usas </h2>
           <Footer/>
            </div>
         
        </section>
       
    )
}