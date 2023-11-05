
import Card from "./UserCard";
import * as React from "react";
import { redirect } from "next/dist/server/api-utils";
export default function UpdateForm({profileid}:any){

    const [formValues, setFormValues] = React.useState({
        nombre: "",
        email:""
      });
    

    const onSubmit = async (e:any) => {
        
/*
        if(!session || !session.user) {
    
            console.log(session.user)
          }
          
    
          const userId = session.user
*/

        e.preventDefault()
        
        const res = await fetch(`http://localhost:8080/updateprofile/${profileid}`, {
            method: 'UPDATE',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: formValues.nombre,
            productos: formValues.email,
            profileId: profileid,
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
        <Card user={profileid} pagetype={"Update"}/>
        <input
          name="email"
          value={formValues.nombre}
          onChange={handleInputChange}
        />
        <input
          name="nombre"
          value={formValues.email}
          onChange={handleInputChange}
        />
   

        <button onClick={()=>{onSubmit}}>Submit</button>
      </>
      )
}