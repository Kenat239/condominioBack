"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cuotas_1 = require("../modelos/cuotas");
var moment_1 = __importDefault(require("moment"));
var cuotasRoutes = express_1.Router();
//=======================================
//Crear Cuotas
//=======================================
cuotasRoutes.post('/', function (req, res) {
    var body = req.body;
    var suma_cuot = Number(body.mantenimiento) +
        Number(body.extraordinaria) +
        Number(body.area_comun) +
        Number(body.servicio_gas) +
        Number(body.servicio_agua) +
        Number(body.otros_servicios) +
        Number(body.otros_cargos) +
        Number(body.multas) +
        Number(body.int_moratorios);
    var menos_desc = Number(suma_cuot) -
        Number(body.descuento);
    var format_fecha = moment_1.default().format("DD-MMM-YYYY");
    console.log('Fecha con moment ' + format_fecha);
    var cuota = new cuotas_1.Cuotas({
        mantenimiento: body.mantenimiento,
        extraordinaria: body.extraordinaria,
        area_comun: body.area_comun,
        descuento: body.descuento,
        servicio_gas: body.servicio_gas,
        servicio_agua: body.servicio_agua,
        otros_servicios: body.otros_servicios,
        otros_cargos: body.otros_cargos,
        int_moratorios: body.int_moratorios,
        multas: body.multas,
        monto_total: suma_cuot,
        monto_con_desc: menos_desc,
        fecha_lim_pag: body.fecha_lim_pag
    });
    console.log('Fecha limite de pago ', body.fecha_lim_pag);
    cuota.save(function (err, cuotaGuardada) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Cuota guardada',
            cuota: cuotaGuardada
        });
    });
});
//=======================================
//Enlistar Cuotas
//=======================================
cuotasRoutes.get('/', function (req, res) {
    cuotas_1.Cuotas.find(function (err, cuotaDB) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            cuota: cuotaDB,
        });
    });
});
exports.default = cuotasRoutes;
