"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Profile {
  ID: number;
  name: string;
  email: string;
}

export default function Profiles() {
  const [showMenuFor, setShowMenuFor] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [formValues, setFormValues] = useState({
    nombre: '',
    email: '',
  });


  const [AddformValues, setAddFormValues] = useState({
    UserName: formValues.nombre, // Change from 'nombre' to 'UserName'
      Email: formValues.email,    // Change from 'email' to 'Email'
      NegocioName: '',  
  });

  const [selectedProfileID, setSelectedProfileID] = useState<number | null>(null); // To track the selected profile for update

  useEffect(() => {
    const fetchProfiles = async () => {
      const res = await fetch('https://konyapacom-production.up.railway.app/getalldata');
      const data = await res.json();
      setProfiles(data.profiles);
    };

    fetchProfiles();
  }, []);
//'https://konyapacom-production.up.railway.app/createprofile'
  const handleinput = async()=>{
    const res = await fetch('http://localhost:8080/createprofile', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        UserName:AddformValues.UserName,
        Email:AddformValues.Email,
      }),
    })
    console.log(res)
    if (res.ok){
      console.log("ok")
    }else{
      console.log("error")
    }
  }

  const handleDelete = async (profileID: number) => {
    const res = await fetch(`https://konyapacom-production.up.railway.app/deleteprofile/${profileID}`, {
      method: 'DELETE',
    });
    console.log(res)
    if (res.ok) {
      // Profile deleted successfully, update the state
      const res = await fetch('https://konyapacom-production.up.railway.app/getalldata');
      const data = await res.json();
      setProfiles(data.profiles);
      console.log(res)
    }
    else{
      console.log("error",res)
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddFormValues({ ...AddformValues, [name]: value });
  };

  const handleUpdate = async () => {
    if (selectedProfileID === null) {
      // Handle error or show a message that no profile is selected
      return;
    }
  
    // Display a loading indicator
    setIsLoading(true);
  
    const res = await fetch(`https://konyapacom-production.up.railway.app/updateprofile/${selectedProfileID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: formValues.nombre,
        email: formValues.email,
        profileId: selectedProfileID,
      }),
    });
    console.log(res)
    if (res.ok) {
      // Profile updated successfully, update the state
      const res = await fetch('https://konyapacom-production.up.railway.app/getalldata');
      const data = await res.json();
      setProfiles(data.profiles);
      console.log(profiles)
      const updatedProfiles = profiles.map((profile) =>
        profile.ID === selectedProfileID
          ? { ...profile, nombre: formValues.nombre, email: formValues.email }
          : profile
      );
  
      setProfiles(updatedProfiles);
    }
  
    // Reset the loading indicator
    setIsLoading(false);
  };
  

  return (
    <div className="bg-gray-900 p-8 rounded-lg">
      <h1>Perfiles</h1>

      {profiles.length === 0 ? (
        <p>Loading...</p>
      ) : (
        profiles.map((profile) => (
          <div className="bg-teal-500 hover:none rounded-lg p-4 mb-2 justify-center items-center w-100" key={profile.ID}>
            <p className="text-xl font-bold text-white">{profile.name}</p>
            <p className="text-xl font-bold text-white">{profile.email}</p>
            <button
              className="relative bg-transparent hover:bg-teal-700 text-teal-200 font-semibold hover:text-white py-2 px-4 rounded-full transition"
              onClick={() => setShowMenuFor(profile.ID)}
            >
              <span>&#8801;</span>

              {showMenuFor === profile.ID && (
                <div className="absolute right-0 translate-x-full w-48 mt-2 py-2 bg-white rounded-lg shadow-xl">
                  <button
                    className="w-full block text-left px-4 py-2 text-sm text-gray-800 hover:bg-red-500 hover:text-white"
                    onClick={() => handleDelete(profile.ID)}
                  >
                    Eliminar registro
                  </button>

                  <button
                    className="w-full block text-left px-4 py-2 text-sm text-gray-800 hover:bg-yellow-500 hover:text-white"
                    onClick={() => setSelectedProfileID(profile.ID)}
                  >
                    Cambiar datos
                  </button>
                  <button className="w-full block text-left px-4 py-2 text-sm text-gray-800 hover:bg-green-500 hover:text-white" onClick={() => setIsAdding(true)}>Agregar nuevo</button>

{isAdding && (
  <>

<input
 className="w-full bg-gray-800 rounded-full px-4 py-2 outline-none text-gray-100"
 name="nombre"
 value={AddformValues.UserName}
 onChange={handleAddInputChange}
/>
   <input
 className="w-full bg-gray-800 rounded-full px-4 py-2 outline-none text-gray-100"
 name="email"
 value={AddformValues.Email}
 onChange={handleAddInputChange}
/>
<input
 className="w-full bg-gray-800 rounded-full px-4 py-2 outline-none text-gray-100"
 name="email"
 value={AddformValues.NegocioName}
 onChange={handleAddInputChange}
/>
<button
 className="mt-4 bg-gray-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600"
 onClick={handleinput}
></button>
  </>

)}
                </div>
              )}
            </button>

            {selectedProfileID === profile.ID && (
              <div className="mt-4">
                <input
                  className="w-full bg-gray-800 rounded-full px-4 py-2 outline-none text-gray-100"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
                <button
                  className="mt-4 bg-gray-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
