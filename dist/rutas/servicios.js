"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var servicios_1 = require("../modelos/servicios");
var authentication_1 = __importDefault(require("../middlewares/authentication"));
var serviciosRoutes = express_1.Router();
//=======================================
//Crear Servicio
//=======================================
serviciosRoutes.post('/:id', authentication_1.default, function (req, res) {
    var body = req.body;
    var admin = req.body.usuario;
    var residente = req.body.usuario;
    if (admin.rol !== 'ADMIN_ROL') {
        return res.status(400).json({
            ok: false,
            mensaje: 'No eres administrador para crear servicios'
        });
    }
    var fechaUnix = parseInt((new Date(body.dia_pago).getTime() / 1000).toFixed(0));
    var servicio = new servicios_1.Servicios({
        nombre_serv: body.nombre_serv,
        costo: body.costo,
        dia_pago: fechaUnix,
    });
    servicio.save(function (err, servicioGuardado) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Servicio guardado',
            servicio: servicioGuardado
        });
    });
});
//=======================================
//Enlistar Servicio
//=======================================
serviciosRoutes.get('/', function (req, res) {
    servicios_1.Servicios.find(function (err, servicioDB) {
        var monto_total = req.body.monto_total;
        var costo = req.body.costo;
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            servicio: servicioDB
        });
    });
});
//=======================================
//Enlistar Servicio por Id
//=======================================
serviciosRoutes.get('/:id', authentication_1.default, function (req, res) {
    servicios_1.Servicios.find(function (err, servicioDB) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            servicio: servicioDB
        });
    });
});
//=======================================
//Modificar Servicio
//=======================================
serviciosRoutes.put('/:id', authentication_1.default, function (req, res) {
    var id = req.params.id;
    var body = req.body;
    var admin = req.body.usuario;
    if (admin.rol !== 'ADMIN_ROL') {
        return res.status(400).json({
            ok: false,
            mensaje: 'No eres administrador para modificar cuotas'
        });
    }
    servicios_1.Servicios.findById(id, function (err, servicioActualizado) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err: err
            });
        }
        if (!servicioActualizado) {
            return res.status(404).json({
                ok: false,
                mensaje: 'El servicio no existe',
                err: err,
                servicio: servicioActualizado
            });
        }
        servicioActualizado.nombre_serv = body.nombre_serv;
        servicioActualizado.costo = body.costo;
        servicioActualizado.dia_pago = body.dia_pago;
        servicioActualizado.save(function (err, servicioGuardado) {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar',
                    err: err
                });
            }
            res.status(200).json({
                ok: true,
                mensaje: 'Servicio actualizado',
                servicio: servicioGuardado
            });
        });
    });
});
//=======================================
//Eliminar Servicio
//=======================================
serviciosRoutes.delete('/:id', authentication_1.default, function (req, res) {
    var id = req.params.id;
    var admin = req.body.usuario;
    if (admin.rol !== 'ADMIN_ROL') {
        return res.status(400).json({
            ok: false,
            mensaje: 'No eres administrador para eliminar cuotas'
        });
    }
    servicios_1.Servicios.findByIdAndDelete(id, function (err, servicioDel) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se puede eliminar el servicio',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Servicio eliminado',
            servicio: servicioDel
        });
    });
});
exports.default = serviciosRoutes;
