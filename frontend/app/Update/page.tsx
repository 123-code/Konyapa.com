"use client"

import { useState, useEffect } from 'react'
import UpdateForm from '../Components/UpdateForm'
import Link from 'next/link' 

interface Profile {
  ID: number;
  name: string;
  email: string;
}

export default function Profiles() {

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [formValues, setFormValues] = useState({
    nombre: "",
    email:""
  });



  useEffect(() => {
    const fetchProfiles = async () => {
      const res = await fetch('http://localhost:8080/getalldata');
      console.log(profiles)
      const data = await res.json();
      console.log(data)
      setProfiles(data.profiles);
    };
    
    fetchProfiles();
  }, []);



  const handleDelete = async (profileID: number) => {
    const res = await fetch(`http://localhost:8080/deleteprofile/${profileID}`, {
      method: 'DELETE'
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

    const handleUpdate = async (profileID: number) => {
         const res = await fetch(`http://localhost:8080/updateprofile/${profileID}`, {
            method: 'UPDATE',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: formValues.nombre,
            productos: formValues.email,
            profileId: profileID,
          }),
        })
      };

  return (
    <div>
      <h1>Profiles</h1>

      {profiles.length === 0 ? (
        <p>Loading...</p>  
      ) : (
        profiles.map(profile => (
          <div key={profile.ID}> 
            <p>{profile.name}</p>
            <p>{profile.email}</p>
            
            <button onClick={() => handleDelete(profile.ID)}>
              Delete
            </button>

            <Link href={`http://localhost:8080/ID${profile.ID}`}>
       Update
            </Link>
           
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
          </div>
        ))
      )}
    </div>
  );
}