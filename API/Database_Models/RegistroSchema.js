// Register Database Schema
import mongoose from 'mongoose';

const RegistroSchema = mongoose.Schema(
    {
        Nombre:{required:true,type:String},
        Correo:{required:true,type:String},
        Cedula:{required:true,type:Number},
        Empresa:{required:true,type:String}

    }
)
module.exports = mongoose.model("Registro",RegistroSchema);