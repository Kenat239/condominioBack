"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var residentes_1 = require("../modelos/residentes");
var environment_1 = require("../global/environment");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var loginRoutes = express_1.Router();
//===================================================================
// login de usuario
//===================================================================
loginRoutes.post('/', function (req, res) {
    var body = req.body;
    residentes_1.Residente.findOne({ email: body.email }, function (err, residenteDB) {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error en la base de datos',
                err: err
            });
        }
        if (!residenteDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'el usuario no existe'
            });
        }
        if (!bcrypt_1.default.compareSync(body.password, residenteDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas',
            });
        }
        var token = jsonwebtoken_1.default.sign({ usuario: residenteDB }, environment_1.SEED, { expiresIn: 14400 });
        res.status(200).json({
            ok: true,
            token: token,
            usuario: residenteDB
        });
    });
});
exports.default = loginRoutes;
