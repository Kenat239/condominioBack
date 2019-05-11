"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cuotas_1 = require("../modelos/cuotas");
var globales_1 = require("../funciones/globales");
var authentication_1 = __importDefault(require("../middlewares/authentication"));
var cuotasRoutes = express_1.Router();
//=======================================
//Crear Cuotas
//=======================================
cuotasRoutes.post('/', authentication_1.default, function (req, res) {
    var body = req.body;
    var admin = req.body.usuario;
    if (admin.rol !== 'ADMIN_ROL') {
        return res.status(400).json({
            ok: false,
            mensaje: 'No eres administrador para crear cuotas'
        });
    }
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
    var fechaUnix = parseInt((new Date(globales_1.fechaActual()).getTime() / 1000).toFixed(0));
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
        fecha_lim_pag: fechaUnix
    });
    console.log('fecha_lim_pag', fechaUnix);
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
//=======================================
//Modificar Cuotas
//=======================================
cuotasRoutes.put('/:id', authentication_1.default, function (req, res) {
    var id = req.params.id;
    var body = req.body;
    var admin = req.body.usuario;
    if (admin.rol !== 'ADMIN_ROL') {
        return res.status(400).json({
            ok: false,
            mensaje: 'No eres administrador para modificar cuotas'
        });
    }
    cuotas_1.Cuotas.findById(id, function (err, cuotaActualizada) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err: err
            });
        }
        if (!cuotaActualizada) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Cuota no existe',
                err: err,
                cuota: cuotaActualizada
            });
        }
        cuotaActualizada.mantenimiento = body.mantenimiento;
        cuotaActualizada.extraordinaria = body.extraordinaria;
        cuotaActualizada.area_comun = body.area_comun;
        cuotaActualizada.descuento = body.descuento;
        cuotaActualizada.servicio_gas = body.servicio_gas;
        cuotaActualizada.servicio_agua = body.servicio_agua;
        cuotaActualizada.otros_servicios = body.otros_servicios;
        cuotaActualizada.otros_cargos = body.otros_cargos;
        cuotaActualizada.int_moratorios = body.int_moratorios;
        cuotaActualizada.multas = body.multas;
        cuotaActualizada.fecha_lim_pag = body.fecha_lim_pag;
        cuotaActualizada.save(function (err, cuotaGuardada) {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar',
                    err: err
                });
            }
            res.status(200).json({
                ok: true,
                mensaje: 'Cuota actualizada',
                cuota: cuotaGuardada
            });
        });
    });
});
//=======================================
//Eliminar Cuota
//=======================================
cuotasRoutes.delete('/:id', authentication_1.default, function (req, res) {
    var id = req.params.id;
    var admin = req.body.usuario;
    if (admin.rol !== 'ADMIN_ROL') {
        return res.status(400).json({
            ok: false,
            mensaje: 'No eres administrador para eliminar cuotas'
        });
    }
    cuotas_1.Cuotas.findByIdAndDelete(id, function (err, cuotaDel) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se puede eliminar la cuota',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Cuota eliminada',
            cuotaDel: cuotaDel
        });
    });
});
exports.default = cuotasRoutes;
