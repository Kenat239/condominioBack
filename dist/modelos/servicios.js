"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.serviciosSchema = new mongoose_1.Schema({
    nombre_serv: { type: String, required: false },
    costo: { type: Number, required: false },
    dia_pago: { type: Number, required: false },
}, { collection: 'servicios' });
exports.Servicios = mongoose_1.model("Servicios", exports.serviciosSchema);
