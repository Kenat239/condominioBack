"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.cuotasSchema = new mongoose_1.Schema({
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
}, { collection: 'cuotas' });
exports.Cuotas = mongoose_1.model("Cuotas", exports.cuotasSchema);
