import { Document, Schema, Model, model } from 'mongoose';
import uniquevalidator from 'mongoose-unique-validator';
import { CUotas } from '../interfaces/cuotas';

export interface CUotasModel extends CUotas, Document{
    fullName: string;
}

export var cuotasSchema: Schema = new Schema({
    mantenimiento: { type: String, required: false },
    extraordinaria: { type: String, required: false },
    area_comun: { type: String, required: false },
    descuento: { type: String, required: false },
    servicio_gas: { type: String, required: false },
    servicio_agua: {type: String, required: false },
    otros_servicios: { type: String, required: false },
    int_moratorios: { types: String, required: false },
    multas: { types: String, required: false },
    otros_cargos: { types: String, required: false }

});


export const Cuotas: Model<CUotasModel> = model <CUotasModel> ( "Cuotas", cuotasSchema);