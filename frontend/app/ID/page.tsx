// pages/[id].tsx
import { NextApiRequest, NextApiResponse } from 'next';
import UpdateForm from "../Components/UpdateForm";

export default async function UpdateProfile({ params }:any, req: NextApiRequest) {

    const id = params.id;
  
    // Fetch profile data
    const res = await fetch(`http://localhost:8080/getProfile/${id}`);
    const profile = await res.json();
  
    // Handle update
    if(req.method === 'POST') {
      const updatedProfile = req.body;
      
      const updateRes = await fetch(`http://localhost:8080/updateProfile/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProfile)
      });
      
    
    }
  
    // Render form
    return <UpdateForm profile={profile} />;
  
  }