import Image from "next/image"
import { useEffect } from "react"

type User = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
} | undefined

type Props = {
    user: User,
    pagetype: string,
}

export default async function Card({ user, pagetype }: Props) {

    //console.log(user)
    const userData = {
        name: user?.name,
        email: user?.email, 
        image: user?.image
      }

   
const res = await fetch('http://localhost:8080/createprofile', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userData)
})

if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }


   

    const greeting = user?.name ? (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
            Hello {user?.name}!
        </div>
    ) : null

    // const emailDisplay = user?.email ? (
    //     <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
    //         {user?.email}
    //     </div>
    // ) : null

    const userImage = user?.image ? (
        <Image
            className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
            src={user?.image}
            width={200}
            height={200}
            alt={user?.name ?? "Profile Pic"}
            priority={true}
        />
    ) : null

    return (
        <section className="flex flex-col gap-4">
            {greeting}
            {/* {emailDisplay} */}
            {userImage}
            <p className="text-2xl text-center">{pagetype} Page!</p>
        </section>
    )
}