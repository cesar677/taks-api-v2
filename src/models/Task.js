import mongoose from "mongoose";
import  mongoosePaginate from "mongoose-paginate-v2";
const { Schema, model } = mongoose;


const Task = new Schema(
  {
    
    
    apellido:{ type:String,unique:true, required:true },
    nombre: {
      type: String,
      required: true,

      index: {
        unique: true,
      },

      lowercase : true,
      trim: true,
    },
    telefono: { type: Number, default: 0 },
    direccion: {
      type: String,
      lowercase: true,
      trim: true,
    },
    informacion: {
      type: String,
      required: true,
     },
    asignado: String,
    valor: { type: Number, default: 0 },
    estado: String,
    motivo: String,
    available: {
      type: Boolean,
      default: true,
    },
    email: { type: String,  unique : true },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
   
  }
);


Task.plugin(mongoosePaginate);
module.exports = mongoose.model("Task", Task);
