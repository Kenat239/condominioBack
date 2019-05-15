"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var residentes_1 = require("../modelos/residentes");
var bcrypt_1 = __importDefault(require("bcrypt"));
var authentication_1 = __importDefault(require("../middlewares/authentication"));
var residentRoutes = express_1.Router();
//========================================================================
// actualizacion del residente como residente
//========================================================================
residentRoutes.put('/:id', authentication_1.default, function (req, res) {
    var id = req.params.id;
    var body = req.body;
    var resUp = req.body.usuario;
    console.log(resUp);
    if (id !== resUp._id) {
        return res.status(400).json({
            ok: false,
            mensaje: 'estos no son tus datos'
        });
    }
    residentes_1.Residente.findById(id, function (err, resActualizado) {
        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: 'error en la base de datos',
                err: err
            });
        }
        if (!resActualizado) {
            return res.status(404).json({
                ok: false,
                mensaje: 'residente no existe'
            });
        }
        resActualizado.nombre = body.nombre;
        resActualizado.apellidoP = body.apellidoP;
        resActualizado.apellidoM = body.apellidoM;
        resActualizado.telefono = body.telefono;
        resActualizado.celular = body.celular;
        resActualizado.password = bcrypt_1.default.hashSync(body.password, 10);
        resActualizado.save(function (err, resGuardado) {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'error al guardar',
                    err: err
                });
            }
            resGuardado.password = bcrypt_1.default.hashSync(body.password, 10);
            res.status(200).json({
                ok: true,
                mensaje: 'tu informacion se ha actualizado',
                residente: resGuardado
            });
        });
    });
});
//========================================================================
// que el residente pueda leer solo sus datos
//========================================================================
residentRoutes.get('/:id', authentication_1.default, function (req, res) {
    var REsid = req.body.usuario;
    var id = req.params.id;
    console.log(REsid);
    if (id !== REsid._id) {
        return res.status(401).json({
            ok: false,
            mensaje: 'no eres tú'
        });
    }
    residentes_1.Residente.findById(id, function (err, residenteDB) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            reidente: residenteDB
        });
    });
});
exports.default = residentRoutes;
