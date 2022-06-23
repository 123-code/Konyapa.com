import express from 'express';
import mongoose from 'mongoose';
import Registro from './Database_Models/RegistroSchema';
 
const app = express();
const MONGO_URI = 'mongodb://127.0.0.1:27017/vendedores';
// require(process.env.MONGO_DATABASE_URI);
let port = 8000;

const DatabaseConnect = async()=>{
    try{
        const client = await mongoose.connect(MONGO_URI)
        const db = client
        console.info("Connected");
    }catch(err){
        console.error(err);
    }

}
DatabaseConnect();


app.get("/",(req,res)=>{
    res.send("Server Working");
});

app.post("/api/Nombre",async(req,res)=>{

})
 
app.listen(port,()=>{
console.info(`Listening on port ${port}!`);
})