"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var residentes_1 = require("../modelos/residentes");
var bcrypt_1 = __importDefault(require("bcrypt"));
var authentication_1 = __importDefault(require("../middlewares/authentication"));
var adminRoutes = express_1.Router();
//========================================================================
// nuevo residente
//========================================================================
adminRoutes.post('/', authentication_1.default, function (req, res) {
    var body = req.body;
    var admin = req.body.usuario;
    if (admin.rol !== 'ADMIN_ROL') {
        return res.status(400).json({
            ok: false,
            mensaje: ' se requiere ser administrador para registrar nuevos usuarios',
        });
    }
    var residente = new residentes_1.Residente({
        nombre: body.nombre,
        apellidoP: body.apellidoP,
        apellidoM: body.apellidoM,
        casaNE: body.casaNE,
        casaNI: body.casaNI,
        telefono: body.telefono,
        celular: body.celular,
        email: body.email,
        password: bcrypt_1.default.hashSync(body.password, 10),
        rol: body.rol,
        status: body.status,
    });
    residente.save(function (err, residenteGuard) {
        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: 'error al guardar',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'residente registrado exitosamente',
            residente: residenteGuard
        });
    });
});
//========================================================================
// actualizacion del residente como administrador
//========================================================================
adminRoutes.put('/:id', authentication_1.default, function (req, res) {
    var id = req.params.id;
    var body = req.body;
    var admin = req.body.usuario;
    console.log(admin);
    if (admin.rol !== 'ADMIN_ROL') {
        return res.status(400).json({
            ok: false,
            mensaje: 'se necesita permiso de administrador',
        });
    }
    residentes_1.Residente.findById(id, function (err, REsA) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error en la base de datos',
                err: err
            });
        }
        if (!REsA) {
            return res.status(500).json({
                ok: false,
                mensaje: 'el usuario no existe'
            });
        }
        REsA.nombre = body.nombre;
        REsA.apellidoP = body.apellidoP;
        REsA.apellidoM = body.apellidoM;
        REsA.telefono = body.telefono;
        REsA.celular = body.celular;
        REsA.email = body.email;
        REsA.rol = body.rol;
        REsA.status = body.status;
        REsA.save(function (err, REsG) {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'error al actualizar'
                });
            }
            res.status(200).json({
                ok: true,
                mensaje: 'residente actualizado exitosamente',
                residente: REsG
            });
        });
    });
});
//========================================================================
// obtener todos los residentes como admin
//========================================================================
adminRoutes.get('/', authentication_1.default, function (req, res) {
    var admin = req.body.usuario;
    if (admin.rol !== 'ADMIN_ROL') {
        return res.status(400).json({
            ok: false,
            mensaje: 'se necesita permiso de administrador',
        });
    }
    residentes_1.Residente.find(function (err, usuariosDB) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en la base de datos',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            usuariot: usuariosDB.length,
            usuarios: usuariosDB
        });
    });
});
//========================================================================
// Borrar usuario
//========================================================================
adminRoutes.delete('/:id', authentication_1.default, function (req, res) {
    var id = req.params.id;
    var admin = req.body.usuario;
    if (admin.rol !== 'ADMIN_ROL') {
        return res.status(400).json({
            ok: false,
            mensaje: 'se necesita permiso de administrador',
        });
    }
    residentes_1.Residente.findByIdAndDelete(id, function (err, usuarioDel) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'no se pudo borrar el usuario',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'usuario eliminado exitosamente',
            usuarios: usuarioDel
        });
    });
});
exports.default = adminRoutes;
