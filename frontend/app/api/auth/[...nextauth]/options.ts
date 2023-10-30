import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers:[
        GitHubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                username:{
                    label:"Username:",
                    type:"text",
                    placeholder:"un nombre de usuario"
                },
password:{
    label:"Password",
    type:"password",
    placeholder:"tu password :)"
}
            },

            async authorize(credentials){
                // retreive credentials here
                const user = {id:"23",name:"Jose",password:"password"}

                if(credentials ?.username==user.name && credentials?.password === user.password){
                    return user;
                }
                else{
                    return null;
                }
            }
        })
    ],
    
}