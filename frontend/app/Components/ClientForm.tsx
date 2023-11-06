"use client";
import * as React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";
export default function ClientForm({session}:any){

    const [formValues, setFormValues] = React.useState({
        nombre: "",
        productos: "",
        direccion: "",
        web: "",
      });
    

    const onSubmit = async (e:any) => {
        

        if(!session || !session.user) {
    
            console.log(session.user)
          }
          
    
          const userId = session.user

        e.preventDefault()
        
        const res = await fetch('https://konyapacom-production.up.railway.app/createstore', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: formValues.nombre,
            productos: formValues.productos,
            direccion: formValues.direccion,
            web: formValues.web,
            profileId: userId,
          }),
        })
     
   if (res.ok){
    return <h1> Negocio creado</h1>
   } else{
        return <h1> Error al crear el negocio</h1>
   }

       
      }
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };
    

    return(
        <>
        <input
          name="nombre"
          value={formValues.nombre}
          onChange={handleInputChange}
        />
        <input
          name="productos"
          value={formValues.productos}
          onChange={handleInputChange}
        />
        <input
          name="direccion"
          value={formValues.direccion}
          onChange={handleInputChange}
        />
        <input name="web" value={formValues.web} onChange={handleInputChange} />
        <button onClick={onSubmit}>Submit</button>
      </>
      )
}