import { Document, Schema, Model, model } from 'mongoose';
import uniquevalidator from 'mongoose-unique-validator';
import { SErvicios } from '../interfaces/servicios';

export interface SErviciosModel extends SErvicios, Document{
    fullName: string;
}

const pagosValidos= { 
    values: ['PAGADO', 'NO_PAGADO'],
    messagge: '{VALUE} no es un pago permitido'
}

export var serviciosSchema: Schema = new Schema({

    nombre_serv: { type: String, required: false },
    costo: { type: Number, required: false },
    dia_pago: { type: Number, required: false },
    creadoX: { type: Schema.Types.ObjectId, ref: 'Servicios' },
    status: { type: String, required: false },
    poago: { type: String, enum: pagosValidos, default: 'NO_PAGADO'}

}, {collection: 'servicios' });


export const Servicios: Model<SErviciosModel> = model <SErviciosModel> ( "Servicios", serviciosSchema);