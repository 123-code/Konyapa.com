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
  const [addFormValues, setAddFormValues] = useState({
    UserName: '',
    Email: '',
    NegocioName: '',  
  });

  const [updateFormValues, setUpdateFormValues] = useState({
    nombre: '',
    email: '',
  });

  const [selectedProfileID, setSelectedProfileID] = useState<number | null>(null);
/*
  const session = await getServerSession(options);
  //'https://konyapa-com.vercel.app/api/auth/signin?callbackUrl=/Server'
      if(!session){
          redirect('https://konyapa-com.vercel.app/api/auth/signin?callbackUrl=/Server')
      }
  
*/

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (showMenuFor && !event.target.closest('.dropdown')) {
        setShowMenuFor(0 as number);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenuFor, setShowMenuFor]);




  useEffect(() => {
    const fetchProfiles = async () => {
      const res = await fetch('https://konyapacom-production.up.railway.app/getalldata');
      const data = await res.json();
      setProfiles(data.profiles);
    };

    fetchProfiles();
  }, []);


  

  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddFormValues({
      ...addFormValues,
      [name]: value,
    });
  };

  const handleUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateFormValues({
      ...updateFormValues,
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
      // Fetch updated data if necessary
      const res = await fetch('https://konyapacom-production.up.railway.app/getalldata');
      const data = await res.json();
      setProfiles(data.profiles);
    } else  {
      console.log('error');
      
    }
  };

  const handleDelete = async (profileID: number) => {
    const res = await fetch(`https://konyapacom-production.up.railway.app/deleteprofile/${profileID}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      console.log('Profile deleted successfully');
      // Fetch updated data if necessary
      const res = await fetch('https://konyapacom-production.up.railway.app/getalldata');
      const data = await res.json();
      setProfiles(data.profiles);
    } else {
      console.log('Error deleting profile');
    }
  };

  const handleUpdateProfile = async () => {
    if (selectedProfileID === null) {
      return;
    }

    setIsLoading(true);

    const res = await fetch(`https://konyapacom-production.up.railway.app/updateprofile/${selectedProfileID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateFormValues),
    });

    if (res.ok) {
      console.log('Profile updated successfully');
      // Fetch updated data if necessary
      const res = await fetch('https://konyapacom-production.up.railway.app/getalldata');
      const data = await res.json();
      setProfiles(data.profiles);
    } else {
      console.log('Error updating profile');
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen  justify-center items-center">
      <h1 className="text-xl font-bold text-white justify-center items-center">Negocios</h1>

      {profiles.length === 0 ? (
        <p>Cargando perfiles...</p>
      ) : (
        profiles.map((profile) => (
          <div className="bg-teal-500 hover:none rounded-lg p-4 mb-2 justify-center items-center w-100" key={profile.ID}>
            <p className="text-xl font-bold text-white text-center">{profile.name}</p>
            <p className="text-xl font-bold text-white text center">{profile.email}</p>
            
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
                    className="w-full block text-left px-4 py-2 text-sm text-gray-800 hover-bg-yellow-500 hover:text-white"
                    onClick={() => {
                      setSelectedProfileID(profile.ID);
                      // Populate update form with the existing values
                      setUpdateFormValues({
                        nombre: profile.name,
                        email: profile.email,
                      });
                    }}
                  >
                    Cambiar datos
                  </button>

                  <div className="w-full block text-left px-4 py-2 text-sm text-gray-800 hover:bg-green-500 hover:text-white" >
                    <Link href="https://konyapa-com.vercel.app/AddInfo">
                    Agregar nuevo
                    </Link>
                    
                  
                  </div>
                </div>
              )}
            </button>

            {selectedProfileID === profile.ID && (
              <div className="mt-4">
                <input
                  className="w-full bg-gray-800 rounded-full px-4 py-2 outline-none text-gray-100"
                  name="nombre"
                  placeholder="Nombre"
                  value={updateFormValues.nombre}
                  onChange={handleUpdateInputChange}
                />
                <input
                  className="w-full bg-gray-800 rounded-full px-4 py-2 outline-none text-gray-100"
                  name="email"
                  placeholder="Email"
                  value={updateFormValues.email}
                  onChange={handleUpdateInputChange}
                />
                <button
                  className="mt-4 bg-gray-500 text-white font-bold py-2 px-4 rounded-full hover-bg-blue-600"
                  onClick={handleUpdateProfile}
                >
                  Guardar
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
