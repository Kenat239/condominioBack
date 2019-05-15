"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var pagosValidos = {
    values: ['PAGADO', 'NO_PAGADO'],
    messagge: '{VALUE} no es un pago permitido'
};
exports.serviciosSchema = new mongoose_1.Schema({
    nombre_serv: { type: String, required: false },
    costo: { type: Number, required: false },
    dia_pago: { type: Number, required: false },
    creadoX: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Servicios' },
    status: { type: String, required: false },
    poago: { type: String, enum: pagosValidos, default: 'NO_PAGADO' }
}, { collection: 'servicios' });
exports.Servicios = mongoose_1.model("Servicios", exports.serviciosSchema);
