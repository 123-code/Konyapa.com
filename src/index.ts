import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema, GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt, GraphQLBoolean } from "graphql";
import { Sequelize, Model, DataTypes } from 'sequelize';

const ProductSchema = buildSchema(
    `type Query{
        name:String,
        price:Float,
        seller:String
    }`
);



 
const app = express();
const port = 5001;
const sequelize = new Sequelize('sqlite::memory:');

const main = async()=>{
    app.get("/",(req,res)=>{
        res.send("Main Route");
    })
    
    
    app.listen(port,()=>{
    console.log(`Listening on port ${port}!`);
    });
}

main().catch((err)=>{
    console.error(err);
})



 

