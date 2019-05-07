"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cuotas_1 = require("../modelos/cuotas");
var cuotasRoutes = express_1.Router();
//=======================================
//Crear Cuotas
//=======================================
cuotasRoutes.post('/', function (req, res) {
    var body = req.body;
    var cuota = new cuotas_1.Cuotas({
        mantenimiento: body.mantenimiento,
        extraordinaria: body.extraordinaria,
        area_comun: body.area_comun,
        descuento: body.descuento,
        servicio_gas: body.servicio_gas,
        servicio_agua: body.servicio_agua,
        otros_servicios: body.otros_servicios,
        multas: body.multas,
        otros_cargos: body.otros_cargos,
        int_moratorios: body.int_moratorios,
        monto_total: body.monto_total,
        fch_lim_pag: body.fch_lim_pag
    });
    console.log(cuota);
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
                mensaje: 'Error en la base d edatos',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            cuota: cuotaDB
        });
    });
});
exports.default = cuotasRoutes;
