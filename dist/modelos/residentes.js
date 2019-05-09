"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var rolesValidos = {
    values: ['ADMIN_ROL', 'RES_ROL'],
    message: '{VALUE} no es un rol permitido'
};
exports.residenteSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    apellidoP: { type: String, required: [true, 'El apellido es necesario'] },
    apellidoM: { type: String, required: [true, 'El apellido materno es necesario'] },
    casaNE: { type: Number, required: [true, 'El numero exterior es necesario'] },
    casaNI: { type: String, required: [true, 'el numero interior es necesario'] },
    telefono: { type: Number, required: false },
    celular: { type: Number, required: [true, ' El numero de celular es necesaio'] },
    email: { type: String, unique: true, required: [true, ' EL correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    rol: { type: String, enum: rolesValidos, default: 'RES_ROL' },
    status: { type: String, default: 'activo', required: true },
}, { collection: 'residente' });
exports.residenteSchema.plugin(mongoose_unique_validator_1.default, { message: '{ PATH } debe ser unico ' });
exports.Residente = mongoose_1.model("residente", exports.residenteSchema);
