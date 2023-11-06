"use client"

import { useState, useEffect } from 'react'
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

            <button onClick={() => setSelectedProfileID(profile.ID)}>
              Update
            </button>

            {selectedProfileID === profile.ID && (
              <div>
                <input
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
                <input
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleInputChange}
                />
                <button onClick={handleUpdate}>Save</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
