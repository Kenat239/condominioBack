import { Document, Schema, Model, model } from 'mongoose';
import uniquevalidator from 'mongoose-unique-validator';
import { CUotas } from '../interfaces/cuotas';

export interface CUotasModel extends CUotas, Document{
    fullName: string;
}

export var cuotasSchema: Schema = new Schema({
    mantenimiento: { type: Number, required: false },
    extraordinaria: { type: Number, required: false },
    area_comun: { type: Number, required: false },
    descuento: { type: Number, required: false },
    servicio_gas: { type: Number, required: false },
    servicio_agua: { type: Number, required: false },
    otros_servicios: { type: Number, required: false },
    multas: { type: Number, required: false },
    otros_cargos: { type: Number, required: false },
    int_moratorios: { type: Number, required: false },
    monto_total: { type: Number, required: false },
    fch_lim_pag: { type: Date, required: false }

}, {collection: 'cuotas' });


export const Cuotas: Model<CUotasModel> = model <CUotasModel> ( "Cuotas", cuotasSchema);