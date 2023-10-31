
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'


type User = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
} | undefined

type Props = {
    user: User,
   
}
/*{ user }: Props*/
export default async function AddNegocio({headers,data}:any) {
   
 
        const session = await getServerSession()

        if(!session || !session.user) {
    
            return <p>Not logged in</p> 
          }
    
          const userId = session.user
        data.preventDefault()
        
        const res = await fetch('localhost:8080/createstore', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            nombre: data.target.nombre.value,
            productos: data.target.productos.value,
            direccion: data.target.direccion.value,
            web: data.target.web.value,
            profileId: userId
          }) 
        })
        
        //redirect('/') 
      
    
 
}