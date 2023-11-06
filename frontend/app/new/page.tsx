"use client";
import * as React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";
export default function ClientForm({session}:any){

    const onSubmit = async (e:any) => {
        const session = await getServerSession()

        if(!session || !session.user) {
    
            return <p>Not logged in</p> 
          }
          console.log(session.user)
    
          const userId = session.user

        e.preventDefault()
        
        const res = await fetch('https://konyapacom-production.up.railway.app/createstore', {
          method: 'POST',
          headers:{ 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: e.target.nombre,
            productos: e.target.productos.value,
            direccion:e.target.direccion.value,
            web: e.target.web.value,
            profileId: userId
          }) 
        })
     
   if (res.ok){
    return <h1> Negocio creado</h1>
   } else{
        return <h1> Error al crear el negocio</h1>
   }

       
      }
      

    return(
        <>

        <input name="nombre" /> 
        <input name="productos" /> 
        <input name="direccion" /> 
        <input name="web" /> 
        <button onClick={onSubmit}>Submit.</button>
   
        </>
      )
}