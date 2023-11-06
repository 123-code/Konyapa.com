"use client"

import { useState, useEffect } from 'react'

import Link from 'next/link'

interface Profile {
  ID: number;
  name: string;
  email: string;
}

export default function Profiles() {
  const [showMenuFor, setShowMenuFor] = useState(0);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [formValues, setFormValues] = useState({
    nombre: "",
    email: ""
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

  const handleDelete = async (profileID: number) => {
    const res = await fetch(`https://konyapacom-production.up.railway.app/deleteprofile/${profileID}`, {
      method: 'DELETE'
    });
    await fetch('https://konyapacom-production.up.railway.app/getalldata')
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUpdate = async () => {
    if (selectedProfileID === null) {
      // Handle error or show a message that no profile is selected
      return;
    }

    const res = await fetch(`https://konyapacom-production.up.railway.app/updateprofile/${selectedProfileID}`, {
      method: 'PUT', // Use PUT for update
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: formValues.nombre,
        email: formValues.email,
        profileId: selectedProfileID, // Update the selected profile only
      }),
    });

    if (res.ok) {
      // Profile updated successfully, you can handle success here
    } else {
      // Handle update failure
    }
    await fetch('https://konyapacom-production.up.railway.app/getalldata')
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg">
      <h1>Profiles</h1>

      {profiles.length === 0 ? (
        <p>Loading...</p>
      ) : (
        profiles.map(profile => (
          <div className="bg-teal-500 hover:none rounded-lg p-4 mb-4" key={profile.ID}>
            <p className="text-xl font-bold text-white">{profile.name}</p>
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
                <input
                className="w-full bg-gray-800 rounded-full px-4 py-2 outline-none mt-4 text-gray-100"  
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleInputChange}
                />
                <button className="mt-4 bg-gray-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600" onClick={handleUpdate}>Save</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
