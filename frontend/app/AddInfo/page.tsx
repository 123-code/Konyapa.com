"use client"
import * as React from "react"
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Profile {
    ID: number;
    name: string;
    email: string;
  }

export default function AddInfo(){
    const [addFormValues, setAddFormValues] = useState({
        UserName: '',
        Email: '',
        NegocioName: '',  
      });
      const [profiles, setProfiles] = useState<Profile[]>([]);

      const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddFormValues({
          ...addFormValues,
          [name]: value,
        });
      };

      const handleAddProfile = async () => {
        const res = await fetch('https://konyapacom-production.up.railway.app/createprofile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(addFormValues),
        });
    console.log(res)
        if (res.ok) {
          console.log('ok');
          window.alert("insercion realizada con exito")
          // Fetch updated data if necessary
          const res = await fetch('https://konyapacom-production.up.railway.app/getalldata');
          const data = await res.json();
          setProfiles(data.profiles);
         
        } else  {
          console.log('error');
          window.alert(res)
          
        }
      };
    return(
        <>
   <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
  <div className="bg-gray-900 text-white p-6 rounded-lg">
    <div className="mb-4">

      <input
        className="w-full bg-gray-800 rounded-full px-4 py-2 outline-none text-gray-100 mb-2"
        name="UserName"
        placeholder="Nombre"
        value={addFormValues.UserName}
        onChange={handleAddInputChange}
      />
      <input
        className="w-full bg-gray-800 rounded-full px-4 py-2 outline-none text-gray-100 mb-2"
        name="Email"
        placeholder="Email"
        value={addFormValues.Email}
        onChange={handleAddInputChange}
      />
      <input
        className="w-full bg-gray-800 rounded-full px-4 py-2 outline-none text-gray-100 mb-2"
        name="NegocioName"
        placeholder="Negocio"
        value={addFormValues.NegocioName}
        onChange={handleAddInputChange}
      />
    </div>
    <button
      className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600"
      onClick={handleAddProfile}
    >
          <Link href="http://localhost:3000/Update">
          Agregar
        </Link>
    </button>
  </div>
</div>
        </>
    )

  }