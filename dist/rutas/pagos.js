"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var servicios_1 = require("../modelos/servicios");
var PagosRoutes = express_1.Router();
PagosRoutes.put('/:id', /*verificaToken,*/ function (req, res) {
    var id = req.params.id;
    var body = req.body;
    // const admin = req.body.usuario;
    console.log('id', id);
    /*
        if (admin.rol !== 'ADMIN_ROL') {
            return res.status(400).json({
                ok: false,
                mensaje: ' se requiere ser administrador para registrar nuevos usuarios',
            })
        } */
    servicios_1.Servicios.findById(id, function (err, SerA) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error en la base de datos',
                err: err
            });
        }
        if (!SerA) {
            return res.status(500).json({
                ok: false,
                mensaje: 'el servicio no existe'
            });
        }
        SerA.status = body.status;
        SerA.pago = body.pago;
        SerA.save(function (err, SerG) {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'error al actualizar'
                });
            }
            res.status(200).json({
                ok: true,
                mensaje: 'servicio actualizado exitosamente',
                servicio: SerG
            });
        });
    });
});
exports.default = PagosRoutes;
