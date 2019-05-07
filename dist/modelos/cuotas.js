"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.cuotasSchema = new mongoose_1.Schema({
    mantenimiento: { type: String, required: false },
    extraordinaria: { type: String, required: false },
    area_comun: { type: String, required: false },
    descuento: { type: String, required: false },
    servicio_gas: { type: String, required: false },
    servicio_agua: { type: String, required: false },
    otros_servicios: { type: String, required: false },
    int_moratorios: { types: String, required: false },
    multas: { types: String, required: false },
    otros_cargos: { types: String, required: false }
});
exports.Cuotas = mongoose_1.model("Cuotas", exports.cuotasSchema);
