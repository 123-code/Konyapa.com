import { Profile } from "../entity/Profile";
import { Resolver, Mutation, Arg} from "type-graphql";

@Resolver()

export class ProfileResolver {
    @Mutation(()=>Boolean)

    async createProfile(
    
        @Arg("name")name:string,
        @Arg('negocio')negocio:string,
        @Arg('descripcion')descripcion:string,
        @Arg('telefono')telefono:string,
        @Arg('email')email:string,
        //@Arg('amount',()=>Int)amount:number ,
       // @Arg("request")request:string)
    )
        {
       await  Profile.insert({name,negocio,descripcion,telefono,email})
        return true;
    }
}