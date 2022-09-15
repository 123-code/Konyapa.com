
import { graphqlHTTP } from "express-graphql";
import { buildSchema, GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt, GraphQLBoolean } from "graphql";
import _ from "lodash";



let products = [
    {}
]

const ProductType = new GraphQLObjectType({
    name:'product',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        seller:{type:GraphQLString},
        price:{type:GraphQLInt},
        sold:{type:GraphQLBoolean},


    })

    


})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        product:{
            type:ProductType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(products);
            }
        }

        
    }
})