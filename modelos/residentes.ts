import { Schema, model, Model, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IResidente } from '../interfaces/residentes';


export interface IResidenteModel extends IResidente, Document {
    condominios:String
}
const rolesValidos = {
    values: ['ADMIN_ROL', 'RES_ROL'], 
    message: '{VALUE} no es un rol permitido'
}


export const residenteSchema: Schema = new Schema({
    
    nombre: { type: String, required:[ true, 'El nombre es necesario']},
    apellidoP: { type: String, required:[ true, 'El apellido es necesario']},
    apellidoM: { type: String, required:[ true, 'El apellido materno es necesario']},
    casaNE: { type: Number, required: [ true, 'El numero exterior es necesario']},
    casaNI: {type:String, required : [ true, 'el numero interior es necesario']},
    telefono: { type: Number, required:  false },
    celular: { type: Number, required: [ true, ' El numero de celular es necesaio']},
    email: { type: String, unique: true, required: [ true, ' EL correo es necesario']},
    password: { type: String, required: [ true, 'La contraseña es necesaria']},
    rol: { type: String, enum: rolesValidos, default: 'RES_ROL'},
    status: { type: String, default: 'activo', required: true }
  
},

{ collection: 'residente' }

);

residenteSchema.plugin(uniqueValidator, { message: '{ PATH } debe ser unico ' });

export const Residente: Model <IResidenteModel> = model<IResidenteModel>("residente", residenteSchema);