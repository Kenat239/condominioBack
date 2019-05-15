import { Document, Schema, Model, model } from 'mongoose';
import uniquevalidator from 'mongoose-unique-validator';
import { SErvicios } from '../interfaces/servicios';

export interface SErviciosModel extends SErvicios, Document{
    fullName: string;
}

export var serviciosSchema: Schema = new Schema({

    nombre_serv: { type: String, required: false },
    costo: { type: Number, required: false },
    dia_pago: { type: Number, required: false },

}, {collection: 'servicios' });


export const Servicios: Model<SErviciosModel> = model <SErviciosModel> ( "Servicios", serviciosSchema);